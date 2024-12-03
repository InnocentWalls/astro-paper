---
author: InnocentWalls
pubDatetime: 2024-02-03T01:22:00Z
modDatetime: 
title: ブログ式年遷宮2024
slug: Blog-Style-Shikinen-Sengu-2024
featured: true
draft: false
tags:
  - docs
description:
  ブログを移行しました.
---

# ブログ式年遷宮2024

<img src="https://image.weight100kg.dev/blog2024/VRChat_2024-01-21_21-03-14.030_3840x2160_(Large).png">

ドレスヒナが出ませんでした

# はじめに

皆さんこんにちは

このブログを見ているということは、新しいブログで記事を見ているかと思います。

今までNotionの記事公開機能でなんちゃってブログをやっていましたが、としぁけてから何か始めるかとやりたいことを考えていた時に、Notionの記事公開機能だと画像読み込みがめっっっちゃ遅いことが気になっていたので、これを機に式年遷宮を決意しました。

## どこに行こう

早速移住先を探したわけですが、前々から[https://weight100kg.dev/](https://weight100kg.dev/)で水槽カメラを配信するためにCloudflareでドメイン取ってホストしていた関係で、Cloudflareの機能を見ていると、CloudflarePagesなんてのがあるのを見つけました。

[Cloudflare Pages](https://pages.cloudflare.com/)

いわゆるCloudflareがホスティングする静的ページ配信サービスですね。

はてなとかnote.とか完パケのブログサービスを使うのが一番楽だとは思うんですが、IT業界で飯を食っている端くれとして、この手の方法勉強しておかないとなーってのもあったので、CloudflarePagesでホスティングしてもらうことにしました。

# 何を使おう

ITのオタクたちには釈迦に説法なのですが、CloudflarePagesはただのホスティングサービスなので、フレームワークは自分で決めないといけません。

まーーーじで恥ずかしながら、この辺りの知識がさっぱりなので、インターネットのオタクのブログを暇なときに見て検証を進めた結果、軽さと扱いやすさからAstroにしました。

[Astro](https://astro.build/)

# 構築

構築言っても上記のサイトからドキュメント見ればいいだけなんですけど、今回はブログサイト作りたいんで、適当なテンプレートのリポジトリをforkして、CloudflarePagesからビルドすれば取り敢えずポン出しビルドできます。

あとはそのリポジトリにドキュメントあるだろうから好きなようにカスタムしてくださいって感じです。

あ、あと画像のホストは同じCloudflareのR2使ってます。

[Cloudflare R2 | エグレス料金ゼロのオブジェクトストレージ | Cloudflare](https://www.cloudflare.com/ja-jp/developer-platform/r2/)

今回使用したテーマはOGP画像を自動で生成してくれるの有り難いんだけど、日本語が豆腐になるので下記ブログを参考に手を加えました。
[Astro＋Cloudflare Pagesでブログ構築](https://weboo.dev/posts/blog-by-astro-cloudflare-pages/)

# 結果

出来ました～

[イット密入国者ブログ](https://blog.weight100kg.dev/)

今年もよろしくお願いします。
