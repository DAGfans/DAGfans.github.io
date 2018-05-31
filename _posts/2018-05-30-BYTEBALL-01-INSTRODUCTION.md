---
layout: posts
categories:
  - Paper
image: https://user-images.githubusercontent.com/39436379/40726422-4edc1474-6458-11e8-81bd-c36e005d1037.jpg
title: "BYTEBALL:1.INSTRUCTION"
tags:
  BYTEBALL
---
>* **Source：** [https://byteball.org/Byteball.pdf](https://byteball.org/Byteball.pdf)  
>* **TranStudy：** [https://github.com/DAGfans/TranStudy/tree/master/Projects/Byteball
](https://github.com/DAGfans/TranStudy/tree/master/Projects/Byteball)

# 1. Introduction
# 1. 介绍
In Orwell’s 1984, the protagonist Winston Smith works in the Records Department of the Ministry of Truth as an editor, revising historical records, to make the past conform to the ever-changing party line and deleting references to unpersons – people who have been "vaporised," i.e. not only killed by the state but denied existence even in history or memory [1]. 
What we present here is data storage that is not rewritable. 
It is a distributed decentralized database where records can neither be revised nor deleted entirely.

在Orwell的`1984`中，真理部亦是主角Winston Smith工作的地方，在那里他改写历史文献好将过去改写得符合正统的政党路线——这每天都在改变——并将非人从历史上抹去，“非人”是指被人“蒸发”的人，即不仅被国家杀掉，而是在历史上或记忆上没这个人的存在[1]。 
我们在这里展示的是不可重写的数据存储。 
它是一个分布式去中心化数据库，记录既不能被修改也不能被完全删除。

Bitcoin [2] was the first system to introduce tamper proof records designed for the specific purpose of tracking the ownership of electronic currency units known as bitcoins. 
In Bitcoin, all transfers of the currency are represented as transactions that are digitally signed by the current owner of the coin, transactions are bundled into blocks, and blocks are linked into a chain (blockchain) secured by proof of work (PoW) that assures that large computing resources have been invested into building the chain. 
Any attempt to rewrite anything contained in the chain would therefore require even larger computing resources than those that have already been expended.

比特币[2]是第一个引入记录防篡改的系统，专门用于追踪称为比特币的电子货币单位的所有权。 
在比特币中，货币的所有流转都表示为由当前所有者进行数字签名的交易，交易被打包成区块，并且区块被链接成链（区块链），由工作量证明（PoW）保证，以确保大量计算资源已投入产生链中。 
因此，任何重写链中包含的任何内容的尝试都需要比那些已经耗费的计算资源更大的计算资源。

Soon after Bitcoin appeared, it became clear that this was more than just a trust-free P2P electronic currency. 
Its technology became a source of new ideas for solving other problems. 
At the same time, Bitcoin’s deficiencies and limitations equally became clear. 
Byteball is designed to generalize Bitcoin to become a tamper proof storage of any data, not solely transfers of a single electronic currency, and remove some of the most pressing deficiencies that impede a wider adoption and growth of Bitcoin.

比特币出现后不久，人们就很清楚它不仅仅是一种去信任的P2P电子货币。 
其技术成为解决其他问题的新思路的来源。 
与此同时，比特币的缺陷和限制同样明显。 
Byteball旨在将比特币推广为对任何数据的防篡改存储，而不仅仅是单一电子货币的流转，并消除阻碍比特币更广泛采用和增长的一些最紧迫的缺陷。

## Blocks
## 区块
In Bitcoin, transactions are bundled into blocks, and blocks are linked into a single chain. 
Since the blocks are linked linearly, their spacing in time and their size are optimized for near-synchrony among nodes, so that the nodes can share a new block with each other much faster than it typically takes to generate a new block. 
This ensures that nodes most likely see the same block as the last block, and orphaning is minimized. 
As Bitcoin grows, blocks become increasingly unwieldy. 
They are either capped in size, in which case the growth is also capped, or they take too long to propagate to all nodes of the network, in which case there is greater uncertainty about which block is last, and more resources are wasted on extending chains that would later be orphaned. 
In Byteball, there are no blocks, transactions are their own blocks, and they need not connect into a single chain. Instead a transaction may be linked to multiple previous transactions, and the whole set of transactions is not a chain but a DAG (directed acyclic graph). 
DAG-based designs have received much attention recently [3-5].

在比特币中，交易被打包成区块，并且区块被链接到单个链中。
由于这些块是线性链接的，因此它们的时间间隔和它们的大小会针对节点之间的近似同步进行优化，以便节点可以以比生成新块快得多的速度相互共享一个新块。(译注: 就是说会尽可能让出块时间大于传播时间)
这确保节点最有可能看到与最后一个块相同的块，并且尽可能减少孤块产生。(译注: 孤块指合法但是被淘汰的块)
随着比特币的增长，区块变得越来越难控制。
如果限定区块大小，在这种情况下，增长也会受到限制，否则它们花费很长时间才能传播到网络的所有节点，在这种情况下，哪个区块最后会产生更大的不确定性，并且会有更多资源浪费在扩展最后被淘汰的链上。
在Byteball中，没有区块，交易就是它们自己的块，并且它们不需要连接到单个链中。
相反，一个交易可以链接多个先前的交易，并且整个交易集合不是一个链，而是一个DAG（有向无环图）。
基于DAG的设计最近受到了很多关注[3-5]。

## Cost
## 消耗

Bitcoin transactions are secure because it is prohibitively expensive to redo all the PoW included in the blocks created after the transaction. 
But that also means that it is necessary to pay to build the legitimate PoW that is strong enough to ward off any attackers. 
This payment is spent for the electricity required to build the PoW. 
What is important to note here, is that this money goes outside the Bitcoin ecosystem – to energy companies – meaning that the community of Bitcoin holders as a whole is bleeding capital. 
In Byteball, there is no PoW, instead we use another consensus algorithm based on an old idea that was known long before Bitcoin.

比特币交易是安全的，因为重复交易后创建的区块中包含的所有PoW是极其昂贵的。 
但这也意味着有必要付出生成足够强大的合法PoW的成本以防止任何攻击者。 
该成本用于支付生成PoW所需的电力。 
这里需要注意的是，这笔钱的超出了比特币生态系统 - 流向了能源公司 - 这意味着比特币持有者的社区作为整体正在流失资本。 
在Byteball中，没有PoW，相反，我们使用了另一种基于早在比特币之前就已知的想法的共识算法。

## Finality
## 最终确认性
Transaction finality in Bitcoin is probabilistic. 
There are no strict and simple criteria for when you can say that a transaction will never be reversed. 
Rather, you can only argue that the probability of a transaction being reversed exponentially decays as more blocks are added. 
While this concept is perfectly clear to those versed in math, it might be a difficult sell to an average Joe who is used to expecting a black-or-white picture in matters of money ownership. 
To complicate things even further, transaction finality also depends on its amount. 
If the amount is small, you can be reasonably sure nobody will try to double-spend against you. 
However, if the amount at stake is greater than the block reward (12.5 BTC at the time of writing), you might speculate that the payer could temporarily rent hashpower to mine another chain of blocks that doesn’t contain the transaction that pays to you. 
Therefore, you have to wait for more confirmations before being sure enough that a high-value transaction is final. In Byteball, there are deterministic criteria for when a transaction is deemed final, no matter how large it was.

比特币中的交易最终确认性是有概率的。
你没有严格和简单的标准可以判断交易永远不会被逆转。
相反，你只能认为，随着更多的区块被添加，交易逆转的可能性呈指数衰减。
虽然这个概念对数学精通者来说是完全清楚的，但对于一个普通的韭菜而言，这对他来说可能是一个难以解释的问题，他在金钱所有权问题上习惯于非黑即白。(译注: 就是说韭菜认为有概率就是不安全)
事情进一步复杂化，交易的最终确认性也取决于金额。
如果金额很小，则可以合理确定没有人会尝试对你双花。
然而，如果受益大于区块奖励（撰写本文时为12.5BTC），您可以推测支付者可能会暂时租用算力来挖掘另一个不包含支付给你的交易的区块链。
因此，在确信高价值交易是最终确认之前，您必须等待更多确认。
在Byteball中，当交易被视为最终确认的时候，有确定性的标准，不管交易额有多大。

## Exchange rate
## 汇率
The Bitcoin price is known to be quite volatile. 
The bigger problem is that this price is not only volatile, it is not bound to anything. 
Share and commodity prices are also very volatile but there are fundamentals behind them. 
Share price is largely a function of company earnings, revenue, debt-to-capital ratio, etc. 
Commodity prices depend, among other factors, on costs of production with various suppliers. 
For example, if the oil price falls below the production costs of some suppliers for a long time, these suppliers will eventually shut down, decreasing production and causing the price to go up. 
There is a negative feedback loop. 
In Bitcoin, there are no fundamentals, and no negative feedback. 
A Bitcoin price of $500 is no more justified than a price of $50,000 or $5. 
If the Bitcoin price moves from where it is now, this movement alone will not create any economic forces that would push the price back. 
It’s just wild. 
In Byteball, the base currency, bytes, is used to pay for adding data into the Byteball database. 
You pay 1,000 bytes to add 1Kb of data. 
It is a measure of the utility of the storage in this database, and actual users will have their opinion on what is a reasonable price for this. 
If the price of byte rises above what you think is reasonable for your needs, you will find ways to store less bytes, therefore you need to buy less bytes, demand decreases, and the price falls. 
This is negative feedback, common for all goods/services whose demand is driven by need, not speculation. Besides paying in bytes, one can issue other assets and use them as means of payment. 
These assets might represent, for example, debt expressed in fiat currencies or in natural units (such as kWh or barrels of oil). 
The price of such assets is naturally bound to the underlying currencies or commodities.

众所周知比特币价格波动非常严重。
更大的问题是，这个价格不仅是波动的，而且它不受任何约束。
股价和商品价格波动也严重，但背后有基本面。
股价主要是公司收益，收入，负债资本比等的函数。
商品价格取决于各种供应商的生产成本等因素。
例如，如果油价长期低于某些供应商的生产成本，这些供应商最终会关闭，导致生产下降并导致价格上涨。
有一个负反馈循环。
在比特币中，没有基本面，也没有负反馈。 
500美元的比特币价格并不比50,000美元或5美元的价格更合理。
如果比特币价格从现在的位置波动，那么这个波动本身不会产生任何推动价格回落的经济力量。
就这么疯狂。
在Byteball中，基本货币字节(bytes)用于支付将数据添加到Byteball数据库中的费用。
你支付1,000字节就是添加1Kb的数据。
这是衡量该数据库中存储的实用性的指标，实际用户会对这个数据的合理价格有自己的看法。
如果字节的价格上涨超过你认为对你的需求合理的程度，你会找到存储更少字节的方法，因此你只需要购买更少的字节，需求减少，价格下降。
这是负反馈，对于需求驱动的所有商品/服务而言都是通用的，而不是投机。
除了以字节为单位支付外，还可以发行其他资产并将它们用作支付手段。
例如，这些资产可能表示以法定货币或自然单位表示的债务（如千瓦时或原油桶数）。
这些资产的价格自然受到相关货币或商品的约束。

## Privacy
## 隐私性
All Bitcoin transactions and balances of all addresses are visible on the blockchain. 
Although there are ways to obfuscate one’s transactions and balances, it is not what people have come to expect from a currency. 
Transactions in bytes (the base currency) in Byteball are equally visible, but there is a second currency (blackbytes), which is significantly less traceable.

所有比特币交易和所有地址的余额都可以在区块链上看到。 
虽然有办法混淆交易和余额，但这不是人们所期望的货币。 
Byteball中以字节(bytes)为单位的交易（基本货币）同样可见，但还有第二种货币（黑字节blackbytes），非常难被追踪。

## Compliance
## 合规性
Bitcoin was designed as an anonymous currency where people have absolute control over their money. 
That goal was achieved; however, it made Bitcoin incompatible with existing regulations, and hence inappropriate for use in the financial industry. 
In Byteball, one can issue assets with any rules that govern their transferability, from no restrictions at all, like Bitcoin, to anything like requiring every transfer to be cosigned by the issuer (e.g. the bank) or restricted to a limited set of whitelisted users.

比特币被设计成匿名货币，人们对他们的资金有绝对控制权。 
这个目标已经实现; 但是，这使得比特币与现有法规不相容，因此不适合用于金融行业。 
在Byteball中，人们可以发布使用任何可转让性规则的资产, 从没有任何限制, 例如比特币, 到任何操作例如需要每笔交易由发行机构(例如银行)共同签名或者限制为一组白名单用户。
