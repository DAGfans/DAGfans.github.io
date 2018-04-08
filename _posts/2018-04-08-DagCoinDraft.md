---
layout: posts
categories:
  - Paper
image: https://user-images.githubusercontent.com/22833166/35630516-97a52aee-06dc-11e8-8362-d109d7c0f32e.png
title: "DagCoin Draft"
tags:
  - DagCoin
---

> **Source：** [https://bitslog.files.wordpress.com/2015/09/dagcoin-v41.pdf](https://bitslog.files.wordpress.com/2015/09/dagcoin-v41.pdf)  
> **TranStudy：** [https://github.com/DAGfans/TranStudy/blob/master/Papers/DagCoin%20Draft.md](https://github.com/DAGfans/TranStudy/blob/master/Papers/DagCoin%20Draft.md)

# DagCoin Draft

## Abstract
## 摘要
> DagCoin is a cryptocurrency design that attempts to be highly decentralized by merging the concepts of transactions and blocks and making each user that transact a miner. Each transaction carries a proof-or-work and references one or more previous transactions. The resulting authenticated data structure is a Direct Acyclic Graph (DAG) of transactions where each transaction “confirms” one or more previous transactions. The confirmation security of a transaction is measured in accumulated amount of proof-of-work referencing the transaction. In this paper we present the DagCoin design, solve the double-spend problem and show several optimizations to aid for an efficient implementation.    

> DagCoin 是一个高度去中心化的加密货币的设计，其整合了交易和区块的概念并能让每一个用户成为矿工。每笔交易都携带一个工作量证明并引用一个或者多个之前的交易。生成的已认证的数据结构是由交易组成有向无环图（DAG），其中每笔交易 “确认” 一笔或者多笔之前的交易。交易的确认安全性是以引用该交易的累计工作量证明来衡量的。在本论文中，我们将介绍 DagCoin 的设计，解决双花问题，并展示几个优化让实现更有效率。


DagCoin is a cryptocurrency design that merges the concepts of transactions and blocks and making each user a miner. Each transaction carries a proof-or-work and references one or more previous transactions. The resulting authenticated data structure is a Direct Acyclic Graph (DAG) of transactions where each transaction “confirms” one or more previous transactions. The confirmation security of a transaction is measured in accumulated amount of proof-of-work referencing the transaction. This structure is better suited for a cryptocurrency without subsidy (such as a side-chain), since the cost of reversal of a transaction can be easily measured, where in merged-mining the reversal cost depends on the good will of the non-merged hashing power.  
DagCoin 是一个高度去中心化的加密货币的设计，其整合了交易和区块的概念并能让每一个用户成为矿工。每笔交易都携带一个工作量证明并引用一个或者多个之前的交易。生成的已认证的数据结构是由交易组成有向无环图（DAG），其中每笔交易 “确认” 一笔或者多笔之前的交易。交易的确认安全性是以引用该交易的累计工作量证明来衡量的。这个结构更适合没有补贴的加密货币（例如侧链），因为逆转交易的成本能很简单地测量，即逆转恶意的已联合的挖矿取决于善意的未联合的算力。
*译注：这里的补贴其实指的是挖矿奖励或者手续费，参见 https://blockstream.com/sidechains.pdf subsidy 的有关章节*

One of the problems with the DAG approach is how to limit the maximum cut of the generated DAG
or, in other words, how to prevent all new transactions from referencing the same set of parent transactions, and degenerating the DAG into a star graph. The DAG must not increase in “width”, and it must “look” more like a yarn under microscope. I will call this structure a DAG-chain.   
DAG 方法的其中一个问题怎样限制生成的 DAG 的最大份额或者换句话说怎样阻止所有新交易引用同样的一组父交易，导致把 DAG 降级为一张星图。DAG 一定不能增加 “宽度”，并且必须“看上去” 更像一个在显微镜下的纱线（yarn）。我将称这个结构为 DAG - 链。

![dagcoin-1](https://user-images.githubusercontent.com/22833166/35629520-cb1f9c86-06d9-11e8-9914-f8918476265f.jpg)

A DAG-chain can be informally defined as DAG that:    
一个 DAG - 链可以被非正式地定义为 DAG 需要满足：

- After taking all border (non-parent) nodes k times, it becomes a chain
- 在被所有的边缘（非父）节点引用 k 次后，它成为一条链
- The resulting chain length is proportional to the original node count by a factor close to 2k.
- 生成的链的长度会和原始节点的数量保持因子为大约两千的比例
- If the DAG has more than 2k nodes, you can cut it in two separate DAGs, and the same     properties hold for each half (each half having a factor k which is close to the original k factor).
- 如果 DAG 有超过两千节点，你可以将其拆分成两个独立的 DAG，并且每一半保持同样的属性（每一半的因子 k 是和原始 k 因子接近的）

To be able to create a DAG-chain the protocol must prevent users from choosing old transactions to extend the DAG. Merging branches should be incentivized, but not too much such that users merge the same branches over and over. The problem of spam is of less importance, as no transaction can get a “free ride” in a block. We show that the election of an adequate data structure allows the DAG-chain to be formed, but it requires us to change how we think about double-spends.  
要能创建 DAG - 链，协议必须阻止用户选择旧的交易去拓展 DAG。合并分支应该被激励，但不能太多以至于用户会反复地合并同一个分支。垃圾交易的问题不是那么重要，因为没有交易能在区块中 “搭顺风车”（ _译注：指交易是有成本的_ ）。我们发现，选择一个合适的数据结构可以形成 DAG 链，但这需要我们改变我们对于双重花费的看法。


The premises used to design the DagCoin cryptocurrency are the following:  
设计 DagCoin 加密货币的前提有：

PREMISE: _The cryptocurrency network benefits from creating a DAG-chain growing as “thin” (low k) as possible._  
前提： _加密货币网络受益于创建一个尽可能越来越 “瘦”（低 k）的 DAG - 链。_

In other words, having the average maximal cut as low as possible. Referencing many previous
transactions (high out degree) can make the DAG thinner only if the following transactions reference the transaction with high out degree, but are themselves of low out degree. The DAG requires high out degree some times, but low out degree another times.  
换句话说，让平均最大划分单元尽可能的小。某笔交易若引用了多笔交易 (高出度), 只有在子交易的出度小的情况下才能使 DAG 变瘦. DAG 有时需要高出度, 有时又需要低出度.

DagCoin tries to fulfill that premise, using an incentive structure such that:  
DagCoin 尝试使用如下激励来实现这个前提:

- There is a benefit for users to reference as many previous transactions as possible
-  尽可能多地引用之前的交易对用户来说是有利的
- Referencing many previous transactions is incentivized only when there are many previous transactions unreferenced.
- 只有存在许多未被引用的交易时, 引用许多之前的交易才是被激励的
- There is no competition between users to reference a previous transaction.
- 用户之间没有引用之前交易的竞争

**Safely accepting Double-spends in the DAG-chain**  
**安全地接受 DAG 链中的双花**

In Bitcoin, a transaction in a valid block-chain can never be a double-spend, as double-spending violates a protocol rule. DagCoin allows two conflicting transactions to be included in the DAG-chain as long as the second does not references the first (over one or more hops). We assign each transaction a confirmation score. If two conflicting transactions appear, as more transactions are added to the DAG-chain, the number of confirmations of one of the two will increase, but the other will not. Each transaction adds one unit of confirmation. The score of a node without children is zero. The score of a referenced transaction is the sum of all transactions that recursively reference it (including double-spends). Whenever a transaction is added, it modifies the scores of all transactions recursively referenced by it. Whenever a transaction references a list of previous transactions, if there are two conflicting transactions, then the one with highest score prevails. If both have the same score, then the order of referencing establishes preferences over the conflicting transactions, such that the first transaction gets its score increased but any following double-spend will not.  
在比特币中，有效区块链中的交易永远不会是双花的，因为双花违反协议规则。 DagCoin 允许两个冲突交易包含在 DAG 链中，只要第二个交易不引用第一个（直接或者间接）。我们为每笔交易分配一个确认分数。如果出现两个相冲突的交易，随着更多的交易被添加到 DAG 链中，两个中的一个的确认数量将增加，而另一个不会。每笔交易增加一个确认单位。没有孩子的节点的分数是零。引用交易的分数是递归引用的所有交易的总和（包括双花）。无论何时添加交易，都会修改由其递归引用的所有交易的分数。每当一笔交易引用一笔以前的交易时，如果有两笔冲突的交易，则以最高分为准。如果两者都具有相同的分数，则用引用的顺序来建立冲突交易的优先级, 使得第一笔交易分数增加但是任何后续的双花则不会.

![Figure 1](https://user-images.githubusercontent.com/22833166/35629720-4ff83404-06da-11e8-91bb-7fe5f72164db.png)

Figure 1  
图 1

Figure 1 shows the DAG before a join transaction arrives and afterward. Transactions 2 and 3 (in orange) are conflicting. The confirmation score is in brackets. We can see that even both transaction 2 and transaction 3 have a non-zero confirmation score, only one of them will increase over time.Honest nodes will never extend a transaction which is already referenced, so an attacker that wants to replace transaction 2 by transaction 10 must invest in proof-of-work at least the difference between the confirmation scores. This establishes a very precise bound on the double-spend security.  
图 1 显示了新加入的交易到达之前和之后的 DAG。 交易 2 和 3（橙色）有冲突。 确认分数在括号内。 我们可以看到，即使交易 2 和交易 3 都有一个非零的确认分数，但其中只有一个会随着时间的推移而增加。诚实的节点永远不会扩展已经被引用的交易，所以攻击者想要用交易 10 替换交易 2, 则必须至少要投入确认分数差这么多工作证明。 这为双花的安全建立了非常精确的界限。

Preventing too many transactions merging too many transactions  
防止太多的交易合并太多的交易

The core idea proposed is that each transaction commits to an authenticated forest of previous unreferenced transactions. To do so, it includes the value C(N), where C(i)=Commit(C(i-1) || T(i)), where T(i) is the hash of a transaction parent and C(0) is the empty string. These are simple recursive commitments so that C(N) allows the payer to reveal any number of parent hashes between 1 to N. The important decision is how many parents the commitment should reveal. Using the transaction as a header, the payer tries to find a proof of work with certain base difficulty (more on this base difficulty later). If the obtained a proof-of-work whose difficulty is 2^k times harder than the base difficulty, it will reveal and reference the first (k+1) nodes of the list. Half of the times a transaction will have a single parent, so only the first node T(N) will be revealed, by providing the complementary hash chain head (C(N-1)). One fourth of the times, two transactions will be referenced, by providing the hashes T(N), T(N-1) and C(N-2).  
提出的核心思想是，每个交易都被提交到一个以前未被引用的已认证的交易集中。为此，它包括值 C(N)，其中 C(i)=Commit(C(i-1) || T(i))，其中 T(i)是父交易的散列，C(0)是空字符串。这些都是简单的递归提交，因此 C(N)允许付款人在 1 到 N 之间暴露任意数量的父散列。重要的决定是提交应暴露多少父散列。使用这个交易作为头部，付款人试图找到具有某些基本难度的工作证明（以后这个基本难度会更大）。如果获得了难度是基本难度 2^k 倍的工作证明，它将暴露和引用列表的第 (k+1) 个节点。通过提供互补的散列链头 (C(N-1))，交易在一半的机会下的将拥有单个父节点，所以只暴露第一个节点 T(N)。四分之一的机会里，通过提供哈希值 T(N)，T(N-1) 和 C(N-2), 两个交易会被引用。

This system provides a logarithm distribution in the amount of parents, with an average of 2. Also this method cannot be gamed, since referring more parents has a PoW cost.  
这个系统提供了呈一个对数分布的父交易的数量，平均为 2. 这种方法不能被操纵，因为引用更多的父交易需要 PoW 成本。

There should be an incentive to include as many references as possible in the authenticated branch.This can be achieved by several methods:  
应该有一个动机，让已认证的分支中包含尽可能多的参考。这可以通过几种方法来实现：

1. Invalidating a transaction that has less references than what the PoW requires.
2. Incrementing the score of a transaction that has more revealed references. For instance, a transaction having K revealed references could add a fractional score of (K-1)/K to the transaction score.     
>
1. 如果少于 PoW 要求的引用, 则交易是无效的。
2. 增加有更多已暴露引用的交易的分数。 例如，有 K 个已暴露引用的交易可以增加 (K-1)/K 倍分数到交易分数上。

Preventing Unbounded Cascade Updates to Confirmation Scores  
防止无限级联更新确认分数

Suppose that for each transaction we save an integer score that we update for each new  transaction that references it directly or recursively. It is evident that the proposed data structure requires updating almost all previous confirmation scores each time a transaction is added. To reduce the workload, we use pointers and checkpoints. At a certain frequency the software chooses a transaction that references a high number of parent nodes. Figure 2 show how a checkpoint is found.  
假设对于每个交易，我们保存一个整数分数，每当有新的交易直接或递归地引用它时, 我们需要更新它。 显然, 每当一笔交易加入的时候, 提交的数据结构需要更新几乎所有之前的确认分数。 为了减少工作量，我们使用指针和检查点。 在某个频率上，软件选择一笔引用大量父节点的交易。 图 2 显示了如何找到检查点。

![Figure 2](https://user-images.githubusercontent.com/22833166/35630410-4e1f29ec-06dc-11e8-91a3-98c4354204f3.png)

Of course, not every past transaction could be reachable, as users may decide to never reference certain published transaction. However, the parent selection, with average out-degree 2, and low network latency, can guarantee that there will be frequent checkpoints referencing almost all previous transactions.  
当然，并不是每一个过去的交易都是可以达到的，因为用户可能决定从不引用某个已发布的交易。 然而，在平均出度为 2 和低网络延迟的情况下, 父交易的选择可以保证将会有频繁的检查点引用几乎所有以前的交易。

After a checkpoint is found, the software updates all nodes reachable from the checkpoint with a
forward pointer to this checkpoint. A checkpoint has its own score counter, initially set to zero. When
the update algorithm reaches a checkpoint node, it increments the counter and stops propagating
backward. The score of a transaction is computed as the last stored score in the transaction plus the
score of the pointed checkpoint. Checkpoints are considered as nodes on the DAG, so the same check-
point finding algorithm can make checkpoints that refer to other forward checkpoints. After several
continuous checkpoints, a checkpoints of a higher level is created referencing previous checkpoints,
forming a skip-list. Using the skip-list it is possible to compute the score of a transaction in O(logN)
where N is the number of transactions after it. Also, after a certain score has been reached, the wallet
may decide not to update it anymore and consider it immutable, as in Bitcoin checkpoints.  
找到检查点之后，软件会从指向的这个检查点的检查点开始更新所有可到达的节点。每一个检查点有它自己的得分计数器，这个计数器初始化的时候被设置为 0。当我们的更新算法到达一个检查点节点时，它会增加这个计数器并停止向后传播。一笔交易的得分是由交易中最后存储的分数和被指向检查点的分数相加得到的。这些检查点在 DAG 中被当作节点，所以同样的检查点查找算法也可以找到和之前的检查点有联系的检查点。在一些连续的检查点之后，一个引用了之前所有检查点的更高等级的检查点就会被创建出来，这样就形成一个 skip-list。使用这个 skip-list 可以在 O(logN) 的复杂度下计算出一笔交易的得分，这里的 N 是这个检查点之后交易的数量。同时，在达到一个确切的得分之后，钱包会决定不再更新它并把它当做不可变的，就像比特币中的检查点一样。

## Periodic re-computing to reduce computation load
## 定期再计算以减小计算负载

Even using checkpoints, computation load can be high. When a wallet detects a transaction whose
destination address is owned, it will start tracking it to find out how deep it is confirmed. But com-
puting the confirmation score using every new transaction that arrives is expensive. To reduce the
load, the wallet can re-compute the score after a certain amount of accumulated proof-of-work has
been received, creating arbitrary “blocks” of transactions. Each block is then processed separately to
find all the parent transactions “inputs” of the block, and a score is added to each input. It’s important
not to confuse the block inputs with Bitcoin’s UTXOs, DagCoin block inputs are not related with
spending and represent block parent hashes (instead of a single patent hash). The number of inputs
will depend on the network latency, but will be generally low and independent of the block size. For
example, for a network with 10 tps, and 1 second of propagation latency, the block input set cardi-
nality should be around 10. Then the set of inputs is processed. Figure 3 show a block and how the
input set is constructed (not necessarily in the same way) by each wallet software. Every input has
an accumulated score which is propagated to previous nodes.  
虽然我们使用了检查点，但是计算负载依然很高。当一个钱包检测到一笔交易的目标地址已经是自己拥有的地址时，它会开始追踪并找出这笔交易的确认深度。但是计算每一笔新的交易的确认得分的成本是很高的。为了减小这个计算负载，钱包可以等确认书达到一个确切的累计工作量证明数量之后再进行计算得分，这样就创造了交易的任意『区块』。每一个区块都会被分开处理并找到区块『输入』的所有父交易，并且每一个输入都会被添加一个得分。将区块输入和比特币的 UTXO 的概念区分开来是很重要的，因为 DagCoin 的区块输入与花费和表示父区块的哈希（而不是一个单个的父哈希）并没有什么关系。输入的数量取决于网络延迟，但是通常来说都会很低并且独立于区块的大小。举个例子，对于一个 tps 为 10 以及传播延迟为 1 秒的网络来说，区块的输入集基数应该是 10 左右。然后输入集就会被处理。图表 3 展示了一个区块以及输入集是如何被每一个钱包软件构造出来的（没必要使用同样的方式）。每一个输入都有一个累计得分，这个累计得分会被传播到之前的节点上。

![Figure 3](https://user-images.githubusercontent.com/22833166/35630516-97a52aee-06dc-11e8-8362-d109d7c0f32e.png)

For instance, and to provide a comparison to Bitcoin, the wallet may consider 10K units of transaction
PoW as equivalent 1 “block confirmation” and so pack 10K transactions into a block and re-compute
the score every 10K transactions received. A better approach is to construct a block every N seconds,
independent on the number of transactions in it. Note that if there are no transactions being performed
after the monitored one, then the confirmation score does not change. This is a direct consequence of
the nonexistence of a subsidy and Bitcoin will face the same problem if the price does increase con-
stantly.  
例如，对于比特币来说，钱包或许会认为 10000 个单位的交易工作量证明等于一个『区块确认』，所以它会将 10000 个交易打包进一个区块并对接收到的每 10000 笔交易再次计算得分。一个更好的方法则是每 N 秒构造一个区块，这个 N 独立于区块中交易的数量。要注意的一点是，如果被监控的交易之后没有发生任何新的交易那么确认分数就不会改变。这就是没有经济激励最直接的结果，如果价格持续不断的增长的话，那么比特币也会面临同样的问题。


## Targeting a fixed transactions/rate vs no maximum rate
## 设定一个固定的比率 VS 没有最大比率

As there are no free-rides for transactions, the transaction/rate is limited by existent deployed com-
puting power and electricity cost. By time-stamping every transaction, one could dynamically adapt
the difficulty of the proof-of-work to achieve more fixed rate. But if the difficulty of a transactions
depends on the difficulty of the parent transactions, then there may be incentives to choose old parent
transactions instead of new ones to reduce the PoW required, if the current rate is over the fixed rate.
Just to be sure Moore's law does permit spamming in the future, one could embed a re-targeting rule
such that every 18 months the difficulty is doubled. It seems preferable that the last M transactions
(such as M=10K) of a certain transaction vote on an increase or decrease of the difficulty of the
following transactions (with small step changes). Then users could vote more freely on how the net-
work should work without having any immediate benefit to bias voting. This is a similar problem as
the current Bitcoin block-chain increase problem: only miners can vote, because user votes are prone
to Sybil attacks. In DagCoin, every user can vote, as long as it transact.  
交易没有顺风车，交易比率已经被现存计算资源和电力消耗牢牢的限制住了。通过每一笔交易的时间戳，区块会动态的调整工作量证明的难度来实现更加稳定的比率。但是如果一个交易的难度取决于它父交易难度的话，当当前的比率高于一个固定的比率时，那么系统就会激励这个交易选择老的父交易，而不是新的，因为这样就不需要工作量证明了。可以肯定的是，摩尔定律在未来是会允许垃圾技术的，这个定律可以嵌入一个目标规则，比如每 18 个月难度会翻倍。但是我们更愿意用一个确切交易最近的 M 笔交易（比如M=10K）来表决接下来的交易（只有很小的改变）的难度是增加还是减少。因为这样用户不会从任何带有偏见的投票中获得直接的收益，那么用户就可以更自由的投票以决定整个网络应该如何运行。当前比特币的区块链结构也面临同样的问题：只有矿工可以投票，因为用户投票容易被女巫攻击。在 DagCoin 中，每一个交易过的用户都可以投票。

## Conclusion
## 结论

We’ve presented a new cryptocurrency design based on a DAG structure where there are no fixed
blocks and where each transaction carries its own proof of work. Also we’ve presented two optimi-
zations that allow storing and dynamically updating the DAG-chain consuming low CPU resources.
It must be noted however that the proposed DAG-coin cannot verify new transactions using only a
subset of the block-chain, such as Bitcoin’s UTXO set. However, by storing the most recent transac-
tions in a fast cache, and by using checkpoints where such that older transactions cannot be references,
the system can be made as fast as Bitcoin, or faster.   
我们已经提出了一个基于 DAG 结构的新的加密货币的设计，这个货币没有固定的区块，并且它上面的每一笔交易都会为它自己做工作量证明。同时我们还提出了两个优化方案，这两个优化方案可以允许存储并且仅仅消耗很小的 CPU 资源就可以更新 DAG-chain。但是我们要注意的是，当仅仅使用区块链的一个子集时，这里的 DAG-coin 无法验证新的交易，就像比特币的 UTXO 一样。然而通过将大部分最近的交易存储在一个快速缓存中，并使用那些更老的不能被引用的交易的检查点，这样就可以让这个系统和比特币一样快了，甚至更快。
