---
layout: posts
categories:
  - Blog
title: "SPECTRE数学符号"
tags: SPECTRE
---

# SPECTRE数学符号

# SPECTRE Mathematical Notations

[SPECTRE论文地址](https://eprint.iacr.org/2016/1159.pdf)

[The address of the SPECTRE paper](https://eprint.iacr.org/2016/1159.pdf)

$$\mathcal{N}$$: the set of nodes, aka miners, defined in the formal statement of mining protocol in section 2.

$$\mathcal{N}$$: 节点或矿工的集合。定义在第2节对挖矿协议的正式描述中。

$$tx$$: a transaction, defined in the formal statement of transactions in section 2.

$$tx$$：一笔交易。定义在第2节对交易的正式描述中。

$$D$$: the propagation time of a message to reach all nodes in seconds, defined in the formal statement of mining protocol in section 2.

$$D$$：一条消息传播至全网所需的时间秒数。定义在第2节对挖矿协议的正式描述中。

$$d$$: upper bound on $$D$$ (the recent delay diameter in the network), defined in Appendix C, before Algorithm 3 Risk (offline).

$$d$$：$$D$$的上限（最近的网络延迟直径）。
定义在附录C，在算法3风险（离线）之前。

$$G^v_t$$: the state of the DAG ledger formed by transactions observed by node $v$ at time $t$, defined in the formal statement of formation of ledger in section 2.

$$G^v_t$$：节点$v$在时刻$t$观察到的由交易组成的DAG账本的状态。定义在第2节对账本构成的正式描述中。

$$G_t$$: we write $$G_t$$ instead of $$G^v_t$$ when local context is unimportant.
The definition is in the formal statement of formation of ledger in section 2.

$$G_t$$：当我们不关心本地上下文时，就将$$G^v_t$$记为$$G_t$$。定义在第2节对账本构成的正式描述中。

$$\lambda$$: the block creation rate, first appeared in the formal statement of robust TxO protocol in section 2, but defined in the beginning of section 3.

$$\lambda$$：出块率，首先出现在第2节对鲁棒TxO协议的正式描述中，但定义在第3节开头。

$$\alpha$$: the attacker’s relative computational power, defined in the formal statement of mining protocol in section 2.
Formally, it is the probability that the creator of the next PoW in the system belongs malicious.

$$\alpha$$：攻击者的相对算力，定义在第2节对挖矿协议的正式描述中。
其正式定义是系统中的下一个PoW来自于恶意创建者的概率。

$$\epsilon$$: the error probability of the sets of accepted transactios that are guaranteed to remain so forever, defined in the formal statement of Robust TxO protocol in section 2.

$$\epsilon$$：已确认的交易被推翻的概率。定义在第2节对鲁棒TxO协议的正式描述中。

$$TxO(G)$$: a consistent subset of transactions extracted from the public ledger $$G$$ by the TxO protocol, defined in section 2.
Every transaction in this set must have its inputs in it as well, and cannot conﬂict with another transaction in the set.

$$TxO(G)$$：TxO协议从公共账本$$G$$中提取的一致的交易子集。
定义在第2节。
该集合中每笔交易的输入必须也在这个集合中，并且不能与集合中的另一笔交易冲突。

$$RobustTxO(G^v_t,D,\lambda,\alpha,\epsilon)$$: a subset of $TxO(G_t)$ specified by the RobustTxO protocol, defined in section 2.
A $tx$ in RobustTxO is said to be (robustly) accepted, and are gauranteed to remain so forever, up to an error probability of $$\epsilon$$.

$$RobustTxO(G^v_t,D,\lambda,\alpha,\epsilon)$$：RobustTxO协议所定义的$$TxO(G_t)$$的一个子集。
定义在第2节。
鲁棒TxO中的$tx$被认为是（鲁棒地）被确认接受的，并且以上限为$$\epsilon$$的错误（被推翻的）概率被保证永远保持被接受的状态。

$$\tau$$: the time from which a transaction is robustly accepted by all nodes, formally a time no smaller than $$t$$ such that $$\forall u \in \mathcal{N},\forall s \geq \tau: tx \in RobustTxO(G^u_s,D,\lambda,\alpha,\epsilon)$$, defined in section 2, property 2 (safty).

$$\tau$$：一笔交易被所有节点鲁棒地永久接受的时间，其形式化定义是一个大于等于$$t$$的时间，使得$$\forall u \in \mathcal{N},\forall s \geq \tau: tx \in RobustTxO(G^u_s,D,\lambda,\alpha,\epsilon)$$。
定义在第2节，属性2（安全性）。

$$\psi(t,D,\lambda,\alpha,\epsilon) := \min\{s \geq t : tx \in RobustTxO(G^v_s,D,\lambda,\alpha,\epsilon)\}$$, the waiting time for transaction $tx \in G_t^v$ to be robustly accepted by $v$, defined in section 2, property 3 (weak liveness).
The expected value is $$M_1 / \lambda$$ (Part VI in Appendix E). $$\mathbb{E}[\psi - t] < \epsilon$$ (Lemma 19).

$$\psi(t,D,\lambda,\alpha,\epsilon) := \min\{s \geq t : tx \in RobustTxO(G^v_s,D,\lambda,\alpha,\epsilon)\}$$, 交易$$tx \in G^v_t$$被节点$$v$$鲁棒接受的时间。
定义在第2节，属性3（弱活跃度）。

$$received^v(x)$$: the time at which node $v$ received block $x$, defined in Appendix C before Algorithm 7 Risk (online).

$$received^v(x)$$：节点$v$收到区块$x$的时刻。
定义在附录C，在算法7风险（在线）之前。

$$future(z,G)$$: the subset of blocks in $G$ from which block $z$ is reachable, defined in section 4.A.

$$future(z,G)$$：在$G$中能够到达区块$z$的区块子集。 定义在第4.A节。
