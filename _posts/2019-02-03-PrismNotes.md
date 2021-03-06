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
交易区块被核心区块引用，并且一个核心区块引用的所有交易区块组织成DAG结构
（见论文5.2.3节：In each epoch the list of blocks is sorted topologically (according to the DAG)）。
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
提议区块只管排序，不管验证；双花的时候也只取它看到的最早的花费。
验证逻辑交给投票区块。
每棵投票树的出块率依然很低，但是$m$很大，$m$棵投票树并行投票的话，确认速度就会变快。

注意当多个提议区块相互竞争时，并不是简单看谁获得票数多谁就获胜。
比如一个提议区块获得499票，另一个提议区块获得501票，这时并不能立即判定501票的获胜。
这种情况下至少要多等一层才能确认。
Prism的快速确认是指对诚实无争议的交易能够以接近物理极限的时间来确认。
通常诚实交易会被包含在所有可选的账本中，这时可以说交易收获的票数是全票通过（尽管每个可选的账本获得的票数不一）。
对于双花交易的话，还是要多等一会儿。
但即便如此也还是会比比特币快，因为可能多等一层就能将可选的账本排除剩下一个。
见论文1.4节提到list decoding的部分，以及论文图5。

## 问题

Q: Why "one can simply increase the number of transaction blocks that a proposer block points to with- out compromising the security of the blockchain" (mentioned in section 4.1)?

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

问：4.1节，如何从公式(10)即$$\lambda_{\text{BTC}} \leq \beta \overline{f}(\beta) B / \Delta$$推出$$\lambda_{\text{BTC}} \leq \beta \overline{f}(\beta)$$？

Q: It is written in section 4.2 that "a node that hears of a block determines its validity by checking the hash",
so what does a node do specifically when it checks the hash to determine the validity of a received block?

问：4.2节写道，当一个节点接收到一个区块时，节点通过检查哈希来确定区块的有效性。
那么节点具体如何通过哈希来确定区块的有效性？

答：检查哈希和区块内容是否匹配。

Q: What is common-prefix property mentioned in section 4.3?

Q: What is positive chain quality mentioned in section 4.3?

问：为什么只要将提议区块的出块率保持在一个较低的数值，那么不管交易区块的出块率有多快，都能实现不低于比特币的安全性？
当一个提议区块引用了大量的交易区块时，它自身不用对交易区块做校验吗？
论文4.2节提到Prism 1.0模型里的区块不对交易正确性做校验，因为账本会在以后被清理（sanitized）。
那么什么时候对账本对清理呢？

答：4.3节开头提到了安全性和比特币相同。更具体的论证需要查看参考文献[10]。
这里面的论证提到了common-prefix property和positive chain quality。
可能本质上还要理解为什么比特币为了安全性需要降低出块率。
对账本的清理应该是由投票区块负责。Prism 1.0不考虑这部分逻辑。

问：一个投票区块根据什么规则来决定它要投票给哪个提议区块？

答：论文中唯一提到投票规则的话在5.2.1节：
The vote of the voter blocktree is decided by the vote cast by the earliest voter block along its main chain。

应该是根据接收到的时间，谁先到投谁。不过更具体地说，投票规则要分两种情况。

一种情况是投票区块挖好的时候，挖这个块的挖矿节点还没有收到任何提议区块。
这时投票块不进行任何投票，挖矿节点马上将这个投票块广播出去。
论文图10中第三层的投票块就是这种情况。

另外一种情况是投票区块挖好的时候，挖矿节点已经收到一些提议区块了。
这种情况下，挖矿节点将已经收到的提议区块按接收时间从早到晚排序并依次遍历。
对于正在遍历的提议区块，挖矿节点会检查该提议区块能否合法地被加入当前投票树所投的主链账本
——
注意这个账本是由当前的投票树决定的，
它不一定和全网保存的账本一样，这就是论文所说的投票树的投票由投票树主链上的最早的区块决定。
如果提议区块能合法加入，那就投票给它，并把它加入投票树所投的账本，否则就丢弃它；然后继续遍历下一个提议区块。

不过按照这个规则的话，一个投票区块必须先知道自己是投票区块，并且还知道自己属于哪个投票树，然后才能进行投票。
我不确定这是否符合论文所讲的一个区块直到挖好之前都不知道自己是什么区块的规则。
