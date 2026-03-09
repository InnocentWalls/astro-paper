#!/usr/bin/env node
/**
 * notion-sync.mjs
 * Notionから記事を取得してastro-paperのMarkdownファイルとして生成するスクリプト
 *
 * 必要な環境変数:
 *   NOTION_API_KEY        - Notion Integration Token
 *   NOTION_DATABASE_ID    - 記事を管理するNotionデータベースのID
 *   R2_ACCOUNT_ID         - Cloudflare Account ID
 *   R2_ACCESS_KEY_ID      - R2 Access Key ID
 *   R2_SECRET_ACCESS_KEY  - R2 Secret Access Key
 *   R2_BUCKET_NAME        - R2バケット名
 *   R2_PUBLIC_URL         - R2の公開URL (例: https://pub-xxxx.r2.dev)
 */

import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { S3Client, PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import https from "https";
import http from "http";

// ===== 設定 =====
const CONTENT_DIR = path.resolve("src/content/blog");
const PROCESSED_FILE = path.resolve(".notion-sync-processed.json");

// ===== クライアント初期化 =====
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const n2m = new NotionToMarkdown({ notionClient: notion });

const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

// ===== ユーティリティ =====

/** URLから画像をダウンロードしてBufferで返す */
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    const req = client.get(url, { timeout: 30000 }, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${res.statusCode} ${url}`));
        return;
      }
      const chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => resolve(Buffer.concat(chunks)));
      res.on("error", reject);
    });
    req.on("error", reject);
    req.on("timeout", () => {
      req.destroy();
      reject(new Error(`Timeout downloading image: ${url}`));
    });
  });
}

/** URLのMD5ハッシュ（先頭12文字）でR2キーを生成 */
function getR2Key(url) {
  // クエリパラメータを除去してハッシュ化
  const cleanUrl = url.split("?")[0];
  const hash = crypto.createHash("md5").update(cleanUrl).digest("hex").slice(0, 12);
  const ext = path.extname(cleanUrl).split(".").pop() || "jpg";
  return `blog-images/${hash}.${ext}`;
}

/** R2に画像をアップロードしてパブリックURLを返す。既存ならスキップ */
async function uploadToR2(imageUrl) {
  const key = getR2Key(imageUrl);
  const publicUrl = `${process.env.R2_PUBLIC_URL}/${key}`;

  // 既にアップロード済みならスキップ
  try {
    await r2.send(new HeadObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
    }));
    console.log(`  [SKIP] Already in R2: ${key}`);
    return publicUrl;
  } catch {
    // 存在しない → アップロード
  }

  console.log(`  [UPLOAD] Downloading: ${imageUrl.slice(0, 80)}...`);
  const buffer = await downloadImage(imageUrl);

  const ext = path.extname(key).slice(1).toLowerCase();
  const contentTypeMap = {
    jpg: "image/jpeg", jpeg: "image/jpeg",
    png: "image/png", gif: "image/gif",
    webp: "image/webp", svg: "image/svg+xml",
  };
  const contentType = contentTypeMap[ext] || "image/jpeg";

  await r2.send(new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: contentType,
  }));

  console.log(`  [UPLOAD] Done: ${publicUrl}`);
  return publicUrl;
}

/** Markdownテキスト内のNotionの画像URLをR2 URLに置換 */
async function replaceImagesWithR2(markdown) {
  // ![alt](url) 形式を検出
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  const matches = [...markdown.matchAll(imageRegex)];

  let result = markdown;
  for (const match of matches) {
    const [full, alt, url] = match;
    // Notionの画像URLのみ処理（prod-files-secure.s3 または notion.so）
    if (url.includes("prod-files-secure.s3") || url.includes("notion.so/image")) {
      try {
        const r2Url = await uploadToR2(url);
        result = result.replace(full, `![${alt}](${r2Url})`);
      } catch (err) {
        console.warn(`  [WARN] Failed to upload image: ${err.message}`);
      }
    }
  }
  return result;
}

/** Notionのページプロパティからfrontmatterオブジェクトを生成 */
function extractFrontmatter(page) {
  const props = page.properties;

  const getText = (prop) => {
    if (!prop) return "";
    if (prop.type === "rich_text") return prop.rich_text?.[0]?.plain_text || "";
    if (prop.type === "title") return prop.title?.[0]?.plain_text || "";
    return "";
  };

  const getDate = (prop) => {
    if (!prop?.date?.start) return null;
    return prop.date.start; // "2024-12-25" or "2024-12-25T00:22:00.000Z"
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    // 日付のみの場合はT00:00:00Zを付加
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return `${dateStr}T00:00:00Z`;
    }
    return dateStr;
  };

  const title = getText(props.Title || props.title || props.名前);
  const slug = getText(props.Slug || props.slug);
  const author = getText(props.Author || props.author) || "InnocentWalls";
  const description = getText(props.Description || props.description);
  const pubDatetime = formatDate(getDate(props.PubDatetime || props.pubDatetime));
  const modDatetime = formatDate(getDate(props.ModDatetime || props.modDatetime));
  const featured = props.Featured?.checkbox || props.featured?.checkbox || false;
  const tags = (props.Tags || props.tags)?.multi_select?.map((t) => t.name) || [];

  return { title, slug, author, description, pubDatetime, modDatetime, featured, tags };
}

/** frontmatterオブジェクトをYAML文字列に変換 */
function buildFrontmatter(fm) {
  const lines = ["---"];
  lines.push(`author: ${fm.author}`);
  lines.push(`pubDatetime: ${fm.pubDatetime || new Date().toISOString()}`);
  if (fm.modDatetime) {
    lines.push(`modDatetime: ${fm.modDatetime}`);
  } else {
    lines.push(`modDatetime:`);
  }
  lines.push(`title: ${fm.title}`);
  lines.push(`slug: ${fm.slug}`);
  lines.push(`featured: ${fm.featured}`);
  lines.push(`draft: false`);
  if (fm.tags.length > 0) {
    lines.push(`tags:`);
    fm.tags.forEach((tag) => lines.push(`  - ${tag}`));
  } else {
    lines.push(`tags:`);
    lines.push(`  - other`);
  }
  lines.push(`description: ${fm.description}`);
  lines.push("---");
  return lines.join("\n");
}

/** 処理済みページIDと最終更新日時を読み込む */
async function loadProcessed() {
  try {
    const raw = await fs.readFile(PROCESSED_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

/** 処理済み情報を保存 */
async function saveProcessed(processed) {
  await fs.writeFile(PROCESSED_FILE, JSON.stringify(processed, null, 2));
}

// ===== メイン処理 =====
async function main() {
  console.log("=== Notion Sync Start ===");

  // 環境変数チェック
  const required = [
    "NOTION_API_KEY", "NOTION_DATABASE_ID",
    "R2_ACCOUNT_ID", "R2_ACCESS_KEY_ID", "R2_SECRET_ACCESS_KEY",
    "R2_BUCKET_NAME", "R2_PUBLIC_URL",
  ];
  for (const key of required) {
    if (!process.env[key]) {
      console.error(`Missing required env: ${key}`);
      process.exit(1);
    }
  }

  // 出力ディレクトリ作成
  await fs.mkdir(CONTENT_DIR, { recursive: true });

  // 処理済みデータを読み込む（差分更新用）
  const processed = await loadProcessed();

  // NotionデータベースからPublishedな記事を取得
  console.log("Fetching Published articles from Notion...");
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    filter: {
      property: "Status",
      select: { equals: "Published" },
    },
    sorts: [{ property: "PubDatetime", direction: "descending" }],
  });

  console.log(`Found ${response.results.length} published articles`);

  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const page of response.results) {
    const pageId = page.id;
    const lastEdited = page.last_edited_time;

    // 差分チェック：前回から更新がなければスキップ
    if (processed[pageId] === lastEdited) {
      skipped++;
      continue;
    }

    const fm = extractFrontmatter(page);

    if (!fm.slug) {
      console.warn(`[WARN] Skipping page ${pageId}: no slug`);
      continue;
    }
    if (!fm.title) {
      console.warn(`[WARN] Skipping page ${pageId}: no title`);
      continue;
    }

    console.log(`\nProcessing: "${fm.title}" (${fm.slug})`);

    // NotionページをMarkdownに変換
    const mdBlocks = await n2m.pageToMarkdown(pageId);
    let mdContent = n2m.toMarkdownString(mdBlocks).parent;

    // 画像をR2にアップロードしてURLを置換
    console.log("  Uploading images to R2...");
    mdContent = await replaceImagesWithR2(mdContent);

    // Frontmatter + 本文を組み立てる
    const frontmatter = buildFrontmatter(fm);
    const fileContent = `${frontmatter}\n\n${mdContent.trim()}\n`;

    // ファイルに書き込む
    const filePath = path.join(CONTENT_DIR, `${fm.slug}.md`);
    const isNew = !processed[pageId];
    await fs.writeFile(filePath, fileContent, "utf-8");

    if (isNew) {
      console.log(`  [CREATE] ${fm.slug}.md`);
      created++;
    } else {
      console.log(`  [UPDATE] ${fm.slug}.md`);
      updated++;
    }

    // 処理済みとして記録
    processed[pageId] = lastEdited;
  }

  // ArchivedになったページのMDファイルを削除
  console.log("\nChecking for Archived articles...");
  const archivedResponse = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    filter: {
      property: "Status",
      select: { equals: "Archived" },
    },
  });

  let deleted = 0;
  for (const page of archivedResponse.results) {
    const pageId = page.id;
    const fm = extractFrontmatter(page);
    if (fm.slug) {
      const filePath = path.join(CONTENT_DIR, `${fm.slug}.md`);
      try {
        await fs.unlink(filePath);
        console.log(`  [DELETE] ${fm.slug}.md`);
        deleted++;
      } catch {
        // ファイルが存在しない場合はスキップ
      }
    }
    // 処理済みから削除
    delete processed[pageId];
  }

  // 処理済みデータを保存
  await saveProcessed(processed);

  console.log(`\n=== Sync Complete ===`);
  console.log(`Created: ${created}, Updated: ${updated}, Skipped: ${skipped}, Deleted: ${deleted}`);
}

main().catch((err) => {
  console.error("Sync failed:", err);
  process.exit(1);
});
