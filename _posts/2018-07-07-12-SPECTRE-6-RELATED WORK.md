---
layout: posts
categories:
  - Paper
image: https://user-images.githubusercontent.com/22833166/38848616-90b68176-423a-11e8-87e1-0287b5ed15e6.png
title: "SPECTRE:6. RELATED WORK"
tags:
  SPECTRE
---
> **Source：** [https://eprint.iacr.org/2016/1159.pdf](https://eprint.iacr.org/2016/1159.pdf)  
> **TranStudy：** [https://github.com/DAGfans/TranStudy/new/master/Papers/SPECTRE](https://github.com/DAGfans/TranStudy/new/master/Papers/SPECTRE)


# 6. RELATED WORK
# 6. 相关工作


Previous research has produced several suggestions for protocols that attempt to address the security-scalability challenge, but all protocols still provide a total order over blocks:

先前的研究已经为试图解决安全性-可扩展性矛盾的挑战的协议提出了一些建议，但所有协议仍然是基于区块全序：

GHOST is an alternative chain selection rule that gradually chooses a tree of blocks until converging on a single chain [18]. 
It can be shown that the Liveness property of GHOST can be attacked, as was demonstrated by [8]. 
The use of block DAGs was proposed in the Inclusive work [10], in which throughput was increased by integrating off-chain blocks into the ledger. 
Due to the reliance on a chain, Inclusive mitigates but does not avoid the security-scalability trade-off. 
The Inclusive paper further includes a game theoretic analysis of the incentives of nodes to embed different transactions in their blocks (without the ability to coordinate). [^5]

GHOST是一种可供选择的链选择规则，它逐渐选择一个区块树，直到收敛到一个单一链上[18]。 
可以证明GHOST的活性可以被攻击，如[8]所证明的那样。 
在Inclusive工作[10]中提出了块DAG的使用，其中通过将链下区块集成到账本中来提高吞吐量。 
由于对链的依赖，Inclusive可以缓解但不能避免安全性-可扩展性矛盾。 
Inclusive论文进一步提供了对节点在其块中嵌入不同交易（不存在协调的情况下）的激励的博弈理论分析。[^5]
(**译注:** 由于交易提交的异步性, 很难避免在不同区块中嵌入同一笔交易,造成账本的冗余以及一定的带宽开销, 但是Inclusive通过经济模型会让矿工不愿意将重复的交易打到区块中)

Bitcoin-NG [6] provides a clever chain structure that is composed of two types of blocks: 
key blocks that require PoW but contain no transactions, and mini-blocks that do not require PoW but do contain transactions. 
Bitcoin-NG manages to obtain a signiﬁcant scalability increase, but its key blocks are still generated slowly, hence, conﬁrmation times remain high. 
Another line of work bootstraps PoW to instantiate a committee that is later used to run classical BFT protocols. 
Examples from this line of research include Byzcoin [9], a work by Decker et. al. [4], Hybrid Consensus [16], and recently Solidus [1]. 
Protocols built in this manner are highly scalable, building upon work in consensus protocols, but lack some of the properties achieved by Bitcoin. 
They typically require large committees and require committee members to remain online for long periods of time, making them susceptible to network isolation and DoS attacks. [9], [4], [1] 
additionally fail without recovering if the committee is ever composed of a high fraction of malicious entities (Bitcoin, on the other hand, is self-stabilizing). 
Moreover, they require forward secrecy. 
If the cryptographic keys of a sufﬁcient fraction of the committee at any point in the past is compromised, the attacker can create an alternative equally acceptable version of events.

Bitcoin-NG [6]提供了一种巧妙的链结构，它由两种类型的区块组成：
需要PoW但不包含交易的关键块，以及不需要PoW但包含交易的小块。 
Bitcoin-NG设法获得显着的可扩展性增长，但其关键块仍然生成缓慢，因此确认时间仍然很长。
还有一系列工作使用PoW创建委员会来运行传统BFT协议。
这一系列研究的例子包括Byzcoin [9]，Decker等人的工作 [4]，混合共识[16]，以及最近的Solidus [1]。
以这种方式构建的协议具有高度可扩展性，以共识协议中的工作为基础，但牺牲了某些比特币已实现的特性。
他们通常需要大型委员会，并要求委员会成员长时间保持在线状态，这使他们很容易受到网络隔离和DoS攻击[9]，[4]，[1]。 
如果委员会由大量恶意实体组成（比特币则可以自我稳定），则还会导致失败而无法恢复。
而且，他们需要前向安全性。
(**译注:** 如果系统具有前向安全性，就可以保证在主密钥泄露时历史记录的安全)
如果在过去的任何时候足够比例的委员会的加密密钥泄露了，攻击者可以创建另一个同样可接受的事件的版本。
(**译注:** 这里的攻击用的是compromise, 指的是类似于诈骗或者钓鱼那样的被动攻击获得隐私信息, 和入侵hack有明显的区别, 这里的事件可以简单理解为交易)

The Algorand protocol [11] is a proof-of-stake based algorithm that uses the ownership of currency itself to achieve a scalable consensus protocol. 
It utilizes additional techniques (based on VRFs) to hide the committee members that take place in the consensus protocol. 
In contrast, miners in SPECTRE are not directly involved in any explicit consensus protocol and moreover can operate with little regard of other nodes’ synchronization status. 
Honey Badger [12] is an atomic broadcast protocol that is oblivious to network parameters and does not require tuning under different network conditions (similarly to SPECTRE). 
It is set in the classical permissioned setting where identities of the participants are known.

Algorand协议[11]是一种基于股权证明(proof-of-stake)的算法，它使用货币本身的所有权来实现可扩展的共识协议。 
(**译注:** 这里没有采用流行的“权益证明”的翻译, 是因为“股”对PoS来说具有高度的概括性)
它利用额外的技术（基于VRF）隐藏在共识协议中发生的委员会成员。 
(**译注:** VRF 是Verifiable Random Function, 可以理解为一个随机的抽签算法, 利用这个算法可以从大量的节点中抽取一部分节点成为委员会, 可以提高BFT的效率. )
相比之下，SPECTRE中的矿工并不直接参与任何明确的共识协议，而且可以在很少考虑其他节点的同步状态的情况下运行。 
(**译注:** 这里不知道如何理解, 在我看来SPECRE就算是共识协议了)
Honey Badger [12]是一种原子广播协议，它可以无视网络参数，不需要在不同的网络条件下进行调整（类似于SPECTRE）。 
它工作在在经典的许可环境下，参与者的身份是已知的。

[^5]: We build on this argument, and indeed assume that nodes will maximize their proﬁts by avoiding transaction “collisions” and will try to embed unique content in their blocks.
我们建立在这个论点之上，并且假设节点将通过避免交易“碰撞”来最大化他们的利益，并且将尝试在其块中嵌入独特的内容。
