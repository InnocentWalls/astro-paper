import satori, { type SatoriOptions } from "satori";
import fs from "fs/promises";
import { Resvg } from "@resvg/resvg-js";
import { type CollectionEntry } from "astro:content";
import postOgImage from "./og-templates/post";
import siteOgImage from "./og-templates/site";

const [ fontRegular, fontBold ] = await Promise.all([
  fs.readFile("./public/fonts/BIZUDPGothic-Regular.ttf"),
  fs.readFile("./public/fonts/BIZUDPGothic-Bold.ttf"),
]);

const options: SatoriOptions = {
  width: 1200,
  height: 630,
  embedFont: true,
  fonts: [
    {
      name: "Biz UDPGothic",
      data: fontRegular,
      weight: 400,
      style: "normal",
    },
    {
      name: "BIZ UDPGothic",
      data: fontBold,
      weight: 600,
      style: "normal",
    },
  ],
};

function svgBufferToPngBuffer(svg: string) {
  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  return pngData.asPng();
}

export async function generateOgImageForPost(post: CollectionEntry<"blog">) {
  const svg = await satori(postOgImage(post), options);
  return svgBufferToPngBuffer(svg);
}

export async function generateOgImageForSite() {
  const svg = await satori(siteOgImage(), options);
  return svgBufferToPngBuffer(svg);
}
