---
author: InnocentWalls
pubDatetime: 2023-06-19T15:22:00Z
modDatetime: 
title: PimoroniでSCD41を買った
slug: I-bought-SCD41-at-Pimoroni
featured: true
draft: false
tags:
  - RaspberryPi
  - Grafana
  - InfluxDB
  - SCD41
description:
  PimoroniでSCD41を買ってエイヤした.
---

# PimoroniでSCD41を買った

<img src="https://image.weight100kg.dev/SCD41/Untitled.png">

以前より我が家では夏が近づくと、昨今の電力供給不足なんか知らねえよとばかりに、クーラーを毎日24時間点けっぱなしにする生活を続けております。

そして、そんな状況の中家でずっと引きこもって生活をしていると、気になってくるのがCO2濃度です。

CO2濃度が高くなってくると集中力の低下や頭痛や吐き気など、生産性の低下に繋がってきます。

[複合機で確認？ オフィスの「二酸化炭素（CO2）濃度」測定 | 大塚商会](https://www.otsuka-shokai.co.jp/products/mfp-copy-printer/tips/archive/co2-concentration.html)

我が家では以前から各種センサを利用して、[お部屋の住環境の色々を見える化](https://blog.weight100kg.dev/posts/I-bought-Enviro-Grow-at-Pimoroni/)に取り組んできましたが、今回はCO2を見える化していきましょう。

## 用意するもの

- Pimoroni SCD41

[SCD41 CO2 Sensor Breakout (Carbon Dioxide / Temperature / Humidity)](https://shop.pimoroni.com/products/scd41-co2-sensor-breakout?variant=39652270833747)

我が家ではPimoroniのEnviroをロギングに使用しており、そのセンサボードにはPimoroniのQw/ST端子が共通規格として搭載してありましたので、これを採用しました。

## コード

Pimoroni公式GithubにSCD41を追加するPRがあります

[https://github.com/pimoroni/enviro/pull/143](https://github.com/pimoroni/enviro/pull/143)

あとはThonnyとか利用してコードを書き込んであげればCO2の値が取得できます。

<img src="https://image.weight100kg.dev/SCD41/Untitled.png">

よかったですね

注意点としてはSCD41自体にキャリブレーション機能があるので、電源入れて7日間は新鮮な空気の下でキャリブレーションをしてあげる必要があります。

[SCD41 CO2センサーとRaspberry Piで二酸化炭素濃度を測定する](https://www.indoorcorgielec.com/resources/raspberry-pi/cgsensor-scd41/#:~:text=ーション(校正)-,自動キャリブレーション,-キャリ)

<img src="https://image.weight100kg.dev/SCD41/Untitled 2.png">

買った当初の数日、日中家を空けてたのですが、CO2濃度が最低242ppmとか言う都心部では考えにくい数値（都心部では周りに植物がない限り400ppmを平均とするらしい）を叩き出していましたが1週間後には校正が済み、家を空けていても400ppm周辺で推移するようになりました。

<img src="https://image.weight100kg.dev/SCD41/Untitled 1.png">