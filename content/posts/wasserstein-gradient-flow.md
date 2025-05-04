+++
title = 'Wasserstein Gradient Flow'
date = 2025-02-01T22:46:59+09:00
draft = true
+++

# はじめに
勾配ランジュバン動力学
$$
\frac{d}{dt}x(t) = -\nabla f(x(t)) + \sqrt{2\beta^{-1}}\xi(t)
$$
は確率分布$\pi(x) = \frac{1}{Z}e^{-f(x)}$のサンプリングに使うことができます．実は，この動力学はWasserstein距離という距離構造を備えた確率分布の空間におけるある汎函数に対する勾配流（最急降下法の連続極限のようなもの）になっていることが知られています．つまり，ある確率分布に関する最適化問題を解いているとみなすことができるのです．今回，このことを解説している論文を読んだので，その内容をまとめます．

この記事は全く数学的に厳密ではないし，わかりやすさのため，用語も乱用している部分があります．そのため，数学的に厳密な議論を求める方は元の論文を参照してください．
## 目標
この記事の目標は以下の2点です．
> Langevin DynamicsがWasserstein距離に関する勾配流になっていることを直感的に理解する．
> - そもそもWasserstein空間における勾配流とは何か？
> - なぜLangevin DynamicsがWasserstein距離に関する勾配流になっているのか？

上の疑問を解決するため，以下のステップで議論を進めます．
> 1. よく知っている$\mathbb{R}^d$における勾配流をiterativeなスキームで定義しなおす
> 2. wasserstein空間を定義する
> 3. Wasserstein空間における勾配流を定義する
> 4. Langevin DynamicsがWasserstein距離に関する勾配流になっていることを示す
# $\mathbb{R}^d$の場合
まずは，$\mathbb{R}^d$における勾配流を復習しましょう．$\mathbb{R}^dにおける購買流とは
$$
\frac{d}{dt}x(t) = -\nabla f(x(t))
$$
と定義される．これを勾配$\nabla f$が定義されていないような空間に拡張するため，$\nabla f$を用いずに定義する方法を考えましょう．まず，以下のような離散スキームを考えましょう．
$$
x_{n+1} = \arg\min_{x} \left\{ f(x) + \frac{1}{2\tau}\|x - x_n\|^2 \right\}
$$
この離散スキームの解を用いて以下のような区分的に線形な曲線を定義します．
$$
x_{n+1} = \arg\min_{x} \left\{ f(x) + \frac{1}{2\tau}\|x - x_n\|^2 \right\}
$$
ここでは証明はしませんが，この離散スキームは$\tau \to \infty$の極限で勾配流に収束することが期待されます．そこで逆に，この離散スキームの極限を勾配流として定義することにします．
# Wasserstein空間の場合
## Wasserstein空間
まずWasserstein距離を定義しましょう．確率測度$\mu, \nu$に対して，Wasserstein距離$W_p(\mu, \nu)$は以下のように定義されます．
$$
W_p(\mu, \nu) = \left( \inf_{\gamma \in \Pi(\mu, \nu)} \int \|x - y\|^p d\gamma(x, y) \right)^{1/p}
$$
ここで，$\Pi(\mu, \nu)$は$\mu, \nu$をマージンした確率測度の集合です．$W_p$を距離とする確率分布の空間をWasserstein空間と呼無ことにします．

## Wasserstein空間における勾配流
この空間においても同様の離散スキームを考えることができ，
この離散スキームの収束先としてWasserstein勾配流を定義することができます．
すると，最適条件から，
をえます．ここで，$\frac{\delta F}{\delta \rho}$は$F$の一次変分と呼ばれる量で，確率測度$\rho$に関する微分のようなものです．例えば$F(\rho) = \int \rho \log \rho \mathrm{d} x$（エントロピー）の場合，$\frac{\delta F}{\delta \rho} = \log \rho + 1$となります（$\frac{\mathrm{d} tlog t}{\mathrm{d}t} = log t + 1$と同じような感じです）．次に第二項を考えると，実はWasserstein距離の性質から
$$
$$
であることが知られています．ここで，$\phi$は$\rho$から$\rho$へのKanterovich potentialと呼ばれる関数です．