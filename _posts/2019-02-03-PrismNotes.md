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

$$B$$: the number of transactions contained in a block, defined in section 3.1.

$$B$$：一个区块里包含的交易数量。定义在3.1节。

$$C$$: the communication capacity of the network, measured in transactions per second, defined in section 1.2.

$$C$$：网络的通信承载力，以每秒承载的交易数量为度量。定义在1.2节。

$$D$$: the speed-of-light propagation delay across the network, measured in seconds, defined in section 1.2.

$$D$$：信息传遍网络所需的光速延迟，以秒度量。定义在1.2节。

$$f$$: the block mining rate, defined in section 2.1.

$$f$$：挖矿速率。定义在2.1节。

$$\Delta$$: the time taken transmitting a block from one honest node to another honest node, measured in seconds; on the other hand, the adversary can transmit and receive blocks with arbitrary delay, up to delay $$\Delta$$; defined in section 3.1.
In the discrete-time round-by-round synchronous model, each round corresponds to $$\Delta$$ seconds.
$$\Delta = \frac{B}{C} + D$$ (formula (5) in section 3.2).

$$\Delta$$：将区块从一个诚实节点传送到另一个诚实节点所需的时间，以秒度量；另一方面，攻击者可以以任意时间的延迟来传送和接收区块，延迟上限是$$\Delta$$。定义在3.1节。
在离散时间回合制同步模型中，每回合对应$$\Delta$$秒。
$$\Delta = \frac{B}{C} + D$$（3.2节公式(5)）。

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

$$\overline{f}_{\text{BTC}}(\beta)$$: the unique solution of $$\overline{f}$$ to the equation $$1 - e^{-(1 - \beta)\overline{f}} = \beta \overline{f}$$ (formula (9)), defined in section 4.1.

$$\overline{f}_{\text{BTC}}(\beta)$$：等式$$1 - e^{-(1 - \beta)\overline{f}} = \beta \overline{f}$$（公式(9)）中$$\overline{f}$$的唯一解。定义在4.1节。

$$\varepsilon$$: In Bitcoin protocol, a current main chain block remains in the future main-chain with probability $$1 - \varepsilon$$ if on the order of $$\log 1/\varepsilon$$ successive blocks are mined over it.
Defined in section 5.1.

$$\varepsilon$$：在比特币协议中，当前主链上的一个区块在将来仍然保留在主链中的概率是$$1 - \varepsilon$$，如果后续大约$$\log 1/\varepsilon$$个区块是在它的基础上被挖出的话。定义在5.1节。

## Comments for Comprehension

## 有助于理解的笔记

论文在第4节先论述了Prism的简化版，即Prism 1.0。然后在第5节论述了Prism的完整版。

简化版解决的是吞吐量的问题，目的是将吞吐量提高到$$1 - \beta$$。
相比之下，当$$\beta$$接近0.5的时候，比特币和GHOST的吞吐量都接近0。
它的思路是将区块分为交易区块与核心区块。
核心区块形成一条主链。
主链的增长率和安全性与比特币相同。
交易区块被核心区块引用。
只要保证核心区块是正确的，就能保证交易区块也是正确的。
交易区块的出块率可以很快都没关系。
这样就将主链的安全性和出块率之间的关系斩断了。
出块率快一些也不会影响主链安全性。

在图6的注释中，作者说“The tradeoffs for the baseline protocols are upper bounds, while that for Prism 1.0 is exact”。
这里的意思是基线的协议需要在（吞吐量）上限上做出妥协，而Prism 1.0的上限则正好是$$1 - \beta$$。

4.3节推导出的Prism 1.0的吞吐量公式是$$\overline{\lambda} = 1 - e^{\beta - 1}$$，即下图的红色曲线。
但理想吞吐量公式是$$\overline{\lambda}^* = 1 - \beta$$，即下图的蓝色曲线。

![lambda_of_prism_1](https://user-images.githubusercontent.com/10098144/52527632-e7970a80-2d06-11e9-8d59-e06db2c8c580.jpeg)

It is written in section 5.1 that

> Recall physical limits impose two lower bounds on the latency: (1) the propagation delay $D$, and (2) $1/C \log 1/\varepsilon$

这里的$1/C \log 1/\varepsilon$源自1.2节里的公式(4)。

Prism完整版则解决了确认时间的问题。
它进一步将核心区块分为提议区块和投票区块。
1棵提议树和$m$棵投票树。
每棵投票树的出快率依然很低，但是$m$很大，因此确认速度就快？

## 问题

Q: In section 3.1, why the adversary can transmit and receive blocks with arbitrary delay, up to delay $$\Delta$$?

问：3.1节，为什么攻击者可以以任意时间的延迟来传送和接收区块，并且延迟上限是$$\Delta$$？

Q: In section 4.1, why the rate of growth of Bitcoin is a probability (formula (7)) and its maximum is 1?

问：4.1节，为什么比特币增长率是个概率（公式(7)）并且最大值是1？

答：这是因为比特币是单链结构。
在$$\Delta$$时间，也就是一个区块传遍整个网络的时间内，不管网络中挖出了多少个区块，最长链最多只会接受一个区块。
根据定义，一回合的时间正好是$$\Delta$$，因此一回合最多只会增长一个区块。
如果以每回合增长多少区块来定义增长率的话，增长率的最大值就是1。
又因为只要有一个诚实区块被挖出，最长链就会增长，所以增长率就是诚实区块被挖出的概率。
根据[Wikipedia](https://en.wikipedia.org/wiki/Poisson_distribution#Probability_of_events_for_a_Poisson_distribution)，$$\Delta$$区间内正好发生$$k$$个事件的概率是

$$
e^{-r\Delta}\frac{(r\Delta)^k}{k!}，
$$

其中$$r$$是$$1/\Delta$$时间内发生的事件数的平均值。在本文中，$$r=(1-\beta)f$$。
于是，诚实区块被挖出的概率即为1减去没有诚实区块被挖出的概率，即

$$
1 - e^{-r\Delta}\frac{(r\Delta)^0}{0!} = 1 - e^{-r\Delta} = 1 - e^{-(1-\beta)f\Delta}。
$$

Q: Why the adversary does not know which type of block it is mining until after the block has been mined?

问：为什么攻击者在挖出一个块之前并不知道他挖的是什么类型的块？

答：答案在5.2.2节。原因是一个块的类型是由它的nonce哈希决定的，而这个哈希是块的内容全部挖好后才能算出来的。

Q: What is common-prefix property mentioned in section 4.3?

Q: What is positive chain quality mentioned in section 4.3?
