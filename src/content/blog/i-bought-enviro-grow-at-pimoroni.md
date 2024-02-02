---
author: InnocentWalls
pubDatetime: 2022-12-16T15:22:00Z
modDatetime: 2023-12-21T09:12:47.400Z
title: PimoroniでEnviro Growを買った
slug: I-bought-Enviro-Grow-at-Pimoroni
featured: true
draft: false
tags:
  - docs　pimoroni RaspberryPi grafana influxdb
description: Pimoroniで色々買ってInfluxDBとGrafanaでエイヤした
---

# PimoroniでEnviro Growを買った

<img src="https://image.weight100kg.dev/Untitled.png">

**smhn Advent Calendar 2022　16日目の記事です！**

[smhn Advent Calendar 2022 - Adventar](https://adventar.org/calendars/7936)

とある日のsmhnにて、Pimoroniというサイトのセール情報が流れてきました。
調べてみるとRaspberryPiやArduino等の機器を扱う会社らしい。

サイトを徘徊しているとEnviroシリーズに出会いました。

[Enviro Grow (Pico W Aboard)](https://shop.pimoroni.com/products/enviro-grow?variant=40055904305235)

書いて名の如くですが、RaspberryPi Pico Wをベースに、各種センサー（BME280など）を乗っけた、いわゆるPCBボードシリーズとの事。

今まで我が家では、SEIKOの謎置時計に搭載の温湿度計+Withingsの体重計に搭載の温度計Co2センサで部屋の環境を測定していましたが、前者はデータのクロールタイミングが不明、後者は毎回体重計に乗らないとクラウド上にデータが送信されないので、微妙な不満点がありました。

また、セール情報のタイミングがたまたま8月末という、絶好の台風シーズン真っ只中ということもあり、台風時の気圧変化もロギングしてみたくなったので、購入を決意。

## Enviroシリーズ

[https://shop.pimoroni.com/search?q=Enviro&product_type=Pico Addon](https://shop.pimoroni.com/search?q=Enviro&product_type=Pico%20Addon)

Enviroシリーズは用途別に色々有るが、部屋の環境測定であれば、「indoor」もしくは「Weather」が適当らしい。　

Urbanは大気中の微粒子も測定できる、Growは水分センサー付、今後発売予定のCameraは書いて字のごとく。

なぜか筆者は植物を育てている訳でもないのにGrowを購入（ガバポイント）。

## 発送～到着

発送方法は無料の国際標準でお願いしたが前述のセールの影響もあってか、注文から発送までに1週間掛かって焦らされつつ、発送後は約5日の通常ペースで都内の我が家に到着。

## 事前準備

実製品が届く前にやっておいた事が2点あり、

- 充電ケーブル等の準備
- 鯖用ラズパイの購入（後日購入）

以上を事前に準備しました。

本製品のベースはRaspberryPi PicoWになり、給電はMicroUSBポート、もしくはJST-PH コネクタ（最大電圧 5.5V）が必要になります。

今回の私の場合は自室内測定ということもありMicroUSBケーブルで運用

オタクハウスなのに手頃なMicroUSBケーブルが無かったため、急遽近所のじゃんぱらで調達。

詳細は後述となりますが、当初はSaaSツールを利用してデータ表示を行っていましたが、データ制限とかリフレッシュのタイミングが気になりだして、ラズパイを購入しオンプレ化を行いました。

昨今のラズパイ事情は、転売屋に狩り尽くされていたり個人向けの供給を絞っていたりと厳しい状態でしたが、なぜかRaspberryPi400が普通に売っていたので、これを利用することにしました。

## セットアップ

### ドキュメント

[enviro/getting-started.md at main · pimoroni/enviro](https://github.com/pimoroni/enviro/blob/main/documentation/getting-started.md)

事前にドキュメントを読み込んでいたので、そこまでコケるポイント無いやろ～＾＾と高をくくっていたら、ちょこちょこ躓きました。

Enviroボードの初期設定だと、データアップロードポイントは

- **[Adafruit IO](https://github.com/pimoroni/enviro/blob/main/documentation/destinations/adafruit-io.md)**
- **[MQTT](https://github.com/pimoroni/enviro/blob/main/documentation/destinations/mqtt.md)**
- **[InfluxDB](https://github.com/pimoroni/enviro/blob/main/documentation/destinations/influxdb.md)**:
- **[Custom HTTP endpoint](https://github.com/pimoroni/enviro/blob/main/documentation/destinations/custom-http-endpoint.md)**

の４つがあり、筆者はAdafruitIO→InfluxDBクラウド→InfluxDBオンプレと渡り歩きました。

基本的にはどの設定もGUIに沿ってアドレスとかUIDとか打ち込んでいけば問題なかったですが、

InfluxDBのオンプレ版の登録時はOrg.URLとかAPI Key入れなくて良い事に気が付かず、右往左往してました。(ガバポイント2）

データアップロード先で初心者におすすめなのはAdafruit IOですが、今回のsmhnアドカレから飛んできている時点で、ある程度の知識があると思いますので、サラッとデータ制限だけ紹介しますが、Adafruit IO の無料利用枠では、データを 30 日間保存でき**、1 分間に最大 30 個のデータ ポイント**を投稿できます。

※データポイントの計算→温度や湿度や大気圧それぞれ1個とカウント

それ以外のMQTTやInfluxDBやカスタムHTTPエンドポイントへのアップロードは、それぞれが

1つの記事かけるほど長くなりますので、今回は割愛します。

InfluxDBとGrafanaのラズパイ上でのセットアップはこちらを参考にさせていただきました。

[Enviro (Pico W Aboard) and InfluxDB](https://learn.pimoroni.com/article/enviro-and-influxdb)

あれやこれやしてGrafanaに表示することが出来ました　良かったですね　

※2022/11/23のダッシュボード

<img src="https://image.weight100kg.dev/Untitled.png">

先代ダッシュボードの画面にはなりますが、そもそもの購入目的の一つである台風通過時の大気圧変化も見事取得できました。

気圧ってここまで下がるんですね

<img src="https://image.weight100kg.dev/830658928cdb118a.png">


現在はEnviroGrow1個のみで部屋内の環境だけ拾っていますが、来年はUrbanを買って、お外の

ロギングもやって行きたいですね。

## おまけ

これは東京の中野駅前にある「2代目 えん寺」で食えるベジポタつけ麺

<img src="https://image.weight100kg.dev/7b8fe367e349e847.jpeg">

デブにも優しい最大2.5玉まで盛ってくれて、どろり濃厚な浸け汁と胚芽麺のゴワゴワ食感がマジで美味い。

## おまけ２

これは2022@toshi_aワクワクセット

<img src="https://image.weight100kg.dev/toshiawaliwali.png">

# おわりに

いつも楽しくsmhnを利用させていただいております

鯖缶の@toshi_a氏および@ahiru氏に感謝

来年もよろしくお願いいたします

**この無線設備は、電波法に定める技術基準への適合が確認されておらず、法に定める特別な条件の下でのみ使用が認められています。この条件に違反して無線設備を使用することは、法に定める罰則その他の措置の対象となります。**

[技適未取得機器を用いた実験等の特例制度](https://exp-sp.denpa.soumu.go.jp/public/index.html)

※2022/11時点
