---
author: InnocentWalls
pubDatetime: 2023-04-21T15:22:00Z
modDatetime: 
title: 秋月の謎ケースのパーツで電力値取得
slug: Acquiring-power-values-with-parts-from-Akihabara-Mystery-Case
featured: true
draft: false
tags:
  - RaspberryPi
  - Grafana
  - InfluxDB
  - Wi-SUN
description:
  秋月の謎パーツから電力値をエイヤする
  theme.
---

# 秋月の謎ケースのパーツで電力値取得

<img src="https://image.weight100kg.dev/Wisun/Untitled.png">

もくじ

# 序

2023年の3月中旬、オタク大好き秋月電子にとある新商品~~ジャンク~~の入荷告知がされました

[https://twitter.com/aki_soku/status/1636532913947959297](https://twitter.com/aki_soku/status/1636532913947959297)

しばらくは知る人ぞ知る的扱いで、恥ずかしながら私は特に興味を示してなかったのですが、

オタクたちがゾロゾロとWi-SUN基板乗ってると話をするようになってきました。

以前よりWi-SUN通信を利用してのBルートを取得して、おうちの消費電力を可視化したいと思っていたのと、謎ケース単体で1000円という安さに魅了され、買ってみることにしました。

（実際は基板をUSB端子にシリアル変換する基板も一緒に購入したので+3000円ほど）

# 破

そして到着

<img src="https://image.weight100kg.dev/Wisun/20230323_090740.jpg">
<img src="https://image.weight100kg.dev/Wisun/20230323_090756.jpg">
<img src="https://image.weight100kg.dev/Wisun/20230323_094138.jpg">

もちろんこのままだとただの基板なので、適切なプログラムを書く必要が有るのですが、

𝙄𝙉𝙏𝙀𝙍𝙉𝙀𝙏 𝙆𝙄𝘿を行った結果、以下のブログを見つけました。

[Wi-SUNで使用電力を可視化 - いんくらyochさんの日記](https://inqra-yoch.hatenablog.jp/entry/20210423/1619107578)

Python3でデータを取得してInfluxDBに格納する、正に私の家の利用スタイルとドンピシャのコードです。

という訳でありがたく拝借し、Macに繋げて実行すると・・・

```jsx
SKVER
EVER 1.2.8
OK
SKSETPWD C XXXX
OK
SKSETRBID XXXX
OK
SKSCAN 2 FFFFFFFF 4
```

ここで止まってしまいます

なんでやー！！

# 急

という事で他所のプログラムを参考にしたり、Winのスタンドアロンなアプリを試したりしました。

[Smamon - スマートメーターBルート通信Windowsソフトウェア](https://smamon.wanderingsoft.com/)

（ちなみにこちらだと無限にタイムアウトしてました）

そもそもエラー自体吐いてくれないので途方に暮れて数日寝かしていた所、Twitterで以下の投稿が

[https://twitter.com/yuna_digick/status/1640607967270797312](https://twitter.com/yuna_digick/status/1640607967270797312)

ネットでよく転がっているのはrl7023 stick-d/ipsの情報で、今回の秋月謎ケースはMB-RL7023-11/DSSなので、その辺りの方言なのでしょう（多分）

この修正を施すことにより無事弊宅のスマートメーターと疎通ができました。

<img src=https://image.weight100kg.dev/Wisun/Untitled 1.png>

[百貫 (@InnocentWalls@social.mikutter.hachune.net)](https://social.mikutter.hachune.net/@InnocentWalls/110100901413060440)

そして色々こちょこちょこ実験をして、良い感じに消費電力量が変化するのも確認できました

<img src="https://image.weight100kg.dev/Wisun/Untitled.png">

よかったですね

リファレンスマニュアルはちゃんと読もう

# おまけ

から好しの大判唐揚げや唐揚げがめちゃくちゃ美味い

<img src="https://image.weight100kg.dev/Wisun/20230216_173801.jpg">

皮がパリッパリで、普通の唐揚げは文字通り肉汁が滴る旨さで最高っす
