---
layout: posts
categories:
  - Blog
title: "Prism笔记"
---

# Prism阅读笔记

# Prism Notes

[Prism论文地址](https://dtr.org/wp-content/uploads/2019/01/2018-11-8-Deconstructing-Blockchain-Approach-Physical-Limits.pdf)

[The address of the Prism paper](https://dtr.org/wp-content/uploads/2019/01/2018-11-8-Deconstructing-Blockchain-Approach-Physical-Limits.pdf)

## Mathematical Notations

## 数学符号

$$\beta$$: the fraction of hashing power the adversary can control without compromising system security, defined in section 1.1.

$$\beta$$：在系统安全性不受危害的情况下攻击者能控制的哈希算力的部分。定义在1.1节。

$$\lambda$$: the throughput, number of transactions confirmed per second, defined in section 1.1.

$$\lambda$$：吞吐量，即每秒钟确认的交易数量。定义在1.1节。

$$C$$: the communication capacity of the network, measured in transactions per second, defined in section 1.2.

$$C$$：网络的通信承载力，以每秒承载的交易数量为度量。定义在1.2节。

$$D$$: the speed-of-light propagation delay across the network, measured in seconds, defined in section 1.2.

$$D$$：信息传遍网络所需的光速延迟，以秒度量。定义在1.2节。

$$f$$: the block mining rate, defined in section 2.1.

$$f$$：挖矿速率。定义在2.1节。

$$\Delta$$: the time taken transmitting a block from one honest node to another honest node, measured in seconds; on the other hand, the adversary can transmit and receive blocks with arbitrary delay, up to delay $$\Delta$$; defined in section 3.1.
In the discrete-time round-by-round synchronous model, each round corresponds to $$\Delta$$ seconds.

$$\Delta$$：将区块从一个诚实节点传送到另一个诚实节点所需的时间，以秒度量；另一方面，攻击者可以以任意时间的延迟来传送和接收区块，延迟上限是$$\Delta$$。定义在3.1节。
在离散时间回合制同步模型中，每回合对应$$\Delta$$秒。

$$N$$: the set of participating nodes in the network, defined in section 3.1.

$$N$$：网络中所有节点的集合。定义在3.1节。

$$H \subset N$$: the honest nodes, who strictly follow the protocol, defined in section 3.1.

$$H \subset N$$：严格遵循协议的诚实节点的集合。定义在3.1节。

$$p_n$$: the fraction of total hashing power controlled by node $$n$$, defined in section 3.1.

$$p_n$$：节点$$n$$所控制的哈希算力占所有哈希算力的比例。定义在3.1节。

$$H[r]$$: the number of blocks mined by the honest nodes in the $$r$$th round, defined in section 3.1.
This variable is Poisson distributed with means $$(1 − \beta)f\Delta$$.

$$H[r]$$：第$$r$$回合中诚实节点挖到的区块数量。定义在3.1节。该变量服从均值为$$(1 − \beta)f\Delta$$的泊松分布。

$$Z[r]$$: the number of blocks mined by the adversarial nodes in the $$r$$th round, defined in section 3.1.
This variable is Poisson distributed with means $$\beta f\Delta$$.

$$Z[r]$$：第$$r$$回合中攻击节点挖到的区块数量。定义在3.1节。该变量服从均值为$$\beta f\Delta$$的泊松分布。

$$\overline{\lambda} := \lambda / C$$: the throughput as a fraction of the network capacity and is a measure of the efficiency of a protocol, defined in the beginning of section 4.

$$\overline{\lambda} := \lambda / C$$：网络承载力的一部分，是对协议效率的一种度量。定义在第4节的开头。

$$B$$: the number of transactions contained in a block, defined in section 3.1.

$$B$$：一个区块里包含的交易数量。定义在3.1节。

$$\overline{f}_{\text{BTC}}(\beta)$$: the unique solution of $$\overline{f}$$ to the equation $$1 - e^{-(1 - \beta)\overline{f}} = \beta \overline{f}$$ (formula (9)), defined in section 4.1.

$$\overline{f}_{\text{BTC}}(\beta)$$：等式$$1 - e^{-(1 - \beta)\overline{f}} = \beta \overline{f}$$（公式(9)）中$$\overline{f}$$的唯一解。定义在4.1节。

## Comments for Comprehension

## 有助于理解的笔记

在图6的注释中，作者说“The tradeoffs for the baseline protocols are upper bounds, while that for Prism 1.0 is exact”。
这里的意思是基线的协议需要在（吞吐量）上限上做出妥协，而Prism 1.0的上限则正好是$$1 - \beta$$。

Prism 1.0将区块分为交易区块与核心区块。Prism完整版进一步将核心区块分为提议区块和投票区块。

Prism 1.0主要是解决定序，并且将吞吐量提高到$$1 - \beta$$。

## 问题

问：3.1节，为什么攻击者可以以任意时间的延迟来传送和接收区块，并且延迟上限是$$\Delta$$？

Q: in section 4.1, why the rate of growth is a probability (formula (7)) and its maximum is 1?

问：4.1节，为什么增长率是个概率（公式(7)）并且最大值是1？

答：也许是因为一个回合的时间取的就是一个区块传遍整个网络的时间。所以一个回合顶多只能出一个块？
