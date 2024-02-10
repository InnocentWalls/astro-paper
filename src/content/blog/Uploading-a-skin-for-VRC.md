---
author: InnocentWalls
pubDatetime: 2024-02-10T05:22:00Z
modDatetime: 
title: VRCの皮をアップロードする
slug: Uploading-a-skin-for-VRC
featured: true
draft: false
tags:
  - VRC
  - Unity
description:
  VRCの皮を上げるための雑ガイド
---

<img src="https://image.weight100kg.dev/VRCkawa%2FVRChat_2024-01-21_09-55-51.423_1920x1080.png">

# VRCの皮をアップロードする

普段Mastodonのsmhn鯖に生息している私ですが、主に末代の人等がVRCでｷｬｯｷｬしている画像が流れてくる事があり、「はえ～でけぇおっぺぇのアバターだなぁ」の気持ちで眺めていたのですが、2024年のとしぁけにふとBOOTHを眺めていた所、””癖”””にドンピシャのアバターが目に入りました。

[【3Dモデル】『ゾメちゃん ver.1.3』Avzomend](https://booth.pm/ja/items/4118550)

んじゃVRC始めるかぁ～とVRCを始めたので、皮をアップロードするまでの流れを順に追ってみました。

# VRCのユーザ作成

私の場合は当初Steamから始めたので、SteamのVRCアプリをインストールしました。

[VRChat](https://store.steampowered.com/app/438100/VRChat/?l=japanese&curator_clanid=4134354)

VRCの仕様としてトラストレベルというのが存在し、NewUserにならないとVRCに皮をアップロードすることができません。

※初期ユーザーはVisitorその1個上がNewUser

なのでまずは適当にワールドを徘徊して内部経験値を重ねていくことから始めます。

内部経験値なので、どんな行動を行うとプラスに働くのかは明示されていないのですが、

ある程度のワールドを徘徊して10時間くらい経過すればNewUserにランクアップすると言われています。

多分知り合いのある程度経験豊富なVRCユーザーにフレンド登録してもらうのがいっちゃん手っ取り早いと思います。

# VRC公式のアカウント作成とユーザー紐付け

[VRChat](https://hello.vrchat.com/)

皮をアップロードするにはVRC公式のユーザー登録を済ませ、AccountLinkから自分のアカウントとリンクする必要があります。

# Unityで皮のアップロード

トラストレベルがNewUserになったらVRC公式アカウントと紐づけたメール宛にアバターアップロード出来るようになったで（ﾆｶｯのメールが来るので、早速VRCに皮をアップロードする作業を始めるのですが、一般的なのはUnityを入れて、VRC公式からCreatorCompanionを入れて、Unity内のVRCSDKでアップロードする方式みたいです。　

# 1.Unityのインストール

という訳でUnityをインストールするわけですが、前述のCreatorCompanionでUnityのバージョンが指定されていますので、それに沿ったVerを入れてください。

[Download Archive](https://unity.com/ja/releases/editor/archive)

新しいものが一番ええんや！で最新Ver入れたらCreatorCompanionにVer違うぞボケって言われました（1敗）

<img src="https://image.weight100kg.dev/VRCkawa%2FUntitled.png">

# 2.CreatorCompanionのインストール

VRC公式サイトのDownloadからダウンロードできます

<img src="https://image.weight100kg.dev/VRCkawa%2FUntitled%201.png">

# 3.CreatorCompanionでプロジェクト作成

CreatorCompanionを開くと”CreateNewProject”があるので選択し、アバターの形式を選んでプロジェクト名を付けてプロジェクト作成をするわけですが、皮の対応Verが2019なのか2022なのかを確認しといてください。　最近のアバターなら2022で行けるとは思いますが。

あとプロジェクト名は名前被りが許されないので、適当に初回だからTeatで作ったれｗで作ってプロジェクト削除してもTestは新たに作れないです（1敗）

プロジェクトの作成が完了したらパッケージの選択画面になりますが、買ったアバターの説明をよく読んで、必要パッケージを入れてください。

多分完パケアバターの場合はいらない・・・？　他の有識者のガイドを参考にしたほうがいい部分です。

最後にOpenProjectを押せばUnityが立ち上がります。

# 4.皮の読み込みとアップロード

ここから先が本当にアバターによってまちまちらしいのですが、今回購入したぞめちゃんの場合は、Unityのアセットの読み込みからアバター付属UnityPackageを選んで、依存関係をインスコすればOKでした。

あとは別ウィンドウで開いてるVRCコンパネからアバターの名前入れて、サムネ決めればアップロード可能になります。

正直この部分は本当に、こんなカスガイドじゃなくて、アバター付属のマニュアルだったり、他所様のちゃんとした説明見たほうがいいです。
私の場合、皮付属のマニュアルを読まず、適当なサイトを記述どおりに謎UnityPackage入れてVRMファイルを読み込んだところ、無事表情が壊れるし揺れ物が壊れる羽目になりました。（1敗）

# 5.VRCで確認

ちゃんとアップロードできれば、VRC公式のマイページ内AvatarsのMyAvatarから確認することができますし、VRCのメニューからも選べるようになっていると思います。

# さいごに

何回も言ってますが、こんなカスガイドより、アバター付属マニュアルだったり、VRCの公式ドキュメントだったり、その辺りのちゃんとした導入ガイド見たほうがいいです。

<img src="https://image.weight100kg.dev/VRCkawa%2FVRChat_2024-02-04_19-12-20.764_3840x2160.jpg">