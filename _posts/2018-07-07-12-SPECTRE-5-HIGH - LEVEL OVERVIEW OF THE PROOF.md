---
layout: posts
categories:
  - Paper
image: https://user-images.githubusercontent.com/22833166/38848616-90b68176-423a-11e8-87e1-0287b5ed15e6.png
title: "SPECTRE:5. HIGH - LEVEL OVERVIEW OF THE PROOF"
tags:
  SPECTRE
---
> **Source：** [https://eprint.iacr.org/2016/1159.pdf](https://eprint.iacr.org/2016/1159.pdf)  
> **TranStudy：** [https://github.com/DAGfans/TranStudy/new/master/Papers/SPECTRE](https://github.com/DAGfans/TranStudy/new/master/Papers/SPECTRE)

# 5. HIGH - LEVEL OVERVIEW OF THE PROOF
# 5. 证明的高层次概述


We now provide some intuition as to why SPECTRE’s procedures indeed guarantee that transactions can be accepted safely, and that all transactions of honest users are quickly accepted. 
We aim at proving Property 4. 
As mentioned above, this property is easy to translate to the desired security properties of transactions (as we do formally in Appendix E). 
Concretely, we wish to prove the following statement (in the proposition, $G_r^{pub} := ∪_{u∈honest} G_r^u$ ):

我们现在提供一些思路，说明为什么SPECTRE的程序确实能够保证安全地接受交易，并且诚实用户的所有交易都很快被接受。 
我们旨在证明属性4.
如上所述，这个属性很容易转化为期望的交易安全属性（正如我们在附录E中形式化论证的那样）。 
具体而言，我们希望证明以下陈述（在命题中，$G_r^{pub} := ∪_{u∈honest} G_r^u$）：

>### Proposition
>Assume block x was published at time $t_{pub}(x ∈ G_{t_{pub}}^{pub} )$, and y not published before  time $t_{acc}(y ∉ G_{t_{acc}}^{pub})$. [^4] 
>Let $T = t_{acc}-t_{pub}$ . 
>Then the probability that x will not always precede y ($Pr (∃u ∈ honest, ∃s ≥ t_{acc} : vote_{x,y}(virtual (G_s^u )) ≥ 0)$) decreases exponentially in T .

>### 命题
>假设在时间$t_{pub}(x ∈ G_{t_{pub}}^{pub} )$发布块x，并且y在时间$t_{acc}(y ∉ G_{t_{acc}}^{pub})$之前未发布。[^4]
>设$T = t_{acc}-t_{pub}$。 
>那么x不会总是先于y的概率($Pr (∃u ∈ honest, ∃s ≥ t_{acc} : vote_{x,y}(virtual (G_s^u )) ≥ 0)$) 在T中呈指数下降。

*Proof overview.* 
Assume that the event in which y comes to precede x in some future DAG occurs. 
Let s be the earliest moment in time that such an event occurred at some node. 
Notice that y cannot be in the past of x or in its future (otherwise their order is determined by the topology and cannot be reversed). 
We thus assume henceforth $y ∈ anticone (x)$.

*证明概述.* 
假设在未来的某个DAG中，发生了y出现在x之前的事件。 
假设s是某个节点发生该事件的最早时刻。 
请注意，y不能位于x的过去集或者将来集（否则它们的顺序由拓扑决定，不能颠倒）。
（**译注：** 划重点）
 因此我们假设$y ∈ anticone (x)$。

**The block race after x is published.** We ﬁrst consider the votes of blocks created after the publication of block x:

* (Almost) all honest blocks created between $t_{pub}$ and $t_{acc}$ vote forever in favour of $x≺y$ , as they have x in their past but not y . Denote by $n_1$ the number of such blocks.

* All honest blocks created between $t_{acc}$ and s vote in favour of $x≺y$ , as well, by the choice of s. Denote by $n_2$ the number of such blocks.

* Denote by $m_1$ and $m_2$ the number of blocks created by the attacker in the time intervals corresponding to $n_1$ and $n_2$ . Honest nodes possess a fraction $1-α > α$ of the computational power. Consequently, for any positive constant C , the probability that the relation $m_1+m_2+C-(n_1 + n_2 ) ≥ 0$ will ever be satisﬁed decreases exponentially with $n_1$ . This is typically analyzed as the probability that a biased random walk on the integers, beginning at C , returns to the origin (see [13], [17], [18]).

**x发布后的区块竞争.** 我们首先考虑在区块x发布后创建的区块投票：

* （几乎）在$t_{pub}$ 和$t_{acc}$之间创建的所有诚实区块永远投票支持$x≺y$，因为他们在过去有x，但不是y。 用$n_1$表示这种块的数量。

* 在$t_{acc}$和s之间的创建的所有诚实区块也都投票支持$x≺y$，直到时间点s。 用$n_2$表示这种块的数量。

* 用$m_1$和$m_2$表示攻击者在对应于$n_1$和$n_2$的时间间隔中创建的块的数量。 诚实的节点具有计算能力的比例$1-α > α$。 因此，对于任何正常数C，满足关系$m_1+m_2+C-(n_1 + n_2 ) ≥ 0$的概率将会满足$n_1$指数级下降。 这通常被分析为从C开始的整数上的偏见随机游走返回原点的概率（参见[13]，[17]，[18]）。（**译注：** 随机游走就是指随机的分布，比如说设x, y在[-1，1]内随机抽取，形成一个坐标，点数足够多会近似一个圆，这里“偏见”体现在概率的分布是不一样的，比如说抽取到0的概率大于抽取到1的概率，这里也是这个意思，如果是以常数C为原点，则随机选择大于或等于C的点，但是越接近C被抽取的概率就越高，最终平均值趋近于C）

The term $m_1+m_2+C-(n_1 + n_2 )$ represents the aggregate vote between x and y , considering only blocks created after x’s publication. 
We now show that blocks that the attacker prepared in advance before x’s publication, in a preparatory “pre-mining” stage, do not give him more than some constant advantage (which will be counted into C above).

术语$m_1+m_2+C-(n_1 + n_2 )$表示x和y之间的总体投票，仅考虑x发布后创建的块。
我们现在证明，即使攻击者在x发布之前的准备阶段“预挖矿”，也并不会给予它带来某些恒定的优势（这将被计算在上面的C中）。
（**译注：** 这里的C代表的就是预挖矿的挖出的数量）

[^4]: Intuitively, $t_{acc}$ represents the time at which some node accepted a transaction which appears in block x. 
直观上可以将$t_{acc}$理解为某个节点在区块x发布前接受了了一笔存在于x的交易

>### The pre-mining stage
>Honest blocks that were created before x was published are typically in its past (apart from a small set of blocks) and hence have their vote decided by the majority of votes in their future (as per Alg. 1). 
>Their vote is thus possibly subject to change as the DAG grows, and as the attacker publishes blocks.

> ### 预挖矿阶段
>在x发布之前创建的诚实区块通常在它过去集中（除了一小部分区块），因此他们的投票将在未来的大多数投票中决定（根据算法1）。 
>因此，他们的投票可能随着DAG的增长而发生变化，并且攻击者也会发布区块。

For every block z in the past of x we must therefore consider the number of blocks above it that vote in favour of x and those that vote against it. 
Denote by $X_z$ the gap between the number of attacker blocks and honest blocks in the future of z , up to time $t_{pub}$ . 
In Lemma 24 we show that the worst case gap $X_z$ (over all blocks $z ∈ past (x)$) can be modeled as a reﬂecting random walk over the nonnegative integers, with bias towards the origin. 
Consequently, the best gap that the attacker can secretly gain over a block in $past (x)$ has an exponentially decaying tail, and, in particular, is bounded by a constant w.h.p.

因此，对于x的过去集的每个块z，我们因此必须认为支持x的区块数量大于支持y的。
用$X_z$表示到时间$t_{pub}$时z的未来攻击者块和诚实块之间的差值。
在引理24中，我们证明最坏情况差值$X_z$（相对于过去集中所有的块z，即$z ∈ past (x)$）可以被建模为在一个非负整数上的上下随机浮动，且不断地往原点靠近。
因此，攻击者可以私自地获得在与$past (x)$中块的最大差值会指数级衰减，特别是会很大概率下限定在一个常量内。

All in all, as $t_{acc}-t_{pub}$ grows, the number $n_1$ of votes, or “conﬁrmations”, that x receives increases linearly, and the probability that the attacker will be able to reveal enough blocks so that some $z ∈ past (x)$ will have more $y≺x$ votes in its future than $x≺y$ votes, decreases exponentially in $n_1$ . 
Since this holds for all $z ∈ past (x)$ uniformly, it implies in particular that the genesis block has more $x≺y$ votes in its future than $y≺x$ votes (unless an exponentially unlikely event occurred). 
The vote of the virtual block is determined by that of the genesis block (this is easy to see, and is proven in Lemma 13), completing the argument.

总而言之，随着$t_{acc}-t_{pub}$的增长，x接收的投票数$n_1$或“确认”线性增加，因此攻击者能够展示足够多的区块从而对于$z ∈ past (x)$在其未来集中将会有$y≺x$的票数多于$x≺y$ 的概率，以$n_1$指数级别降低。
因为这对所有的$z ∈ past (x)$一致，特别意味着创世区块的未来集中投$x≺y$ 比投$y≺x$多（除非发生指数级别的低概率事件）。
虚拟块的投票是由创世块的投票决定（很容易看出来，并在引理13中得到证实）。
(**译注:** 因为创世块是的未来集是其他所有块,然后创世块服从大多数的投票)

The proposition above is the gist of Lemmas 14 and 15. 
In the above sketch, we abstracted out many additional subtleties and details. 
For instance, honest blocks that were created D seconds around $t_{pub}$ , $t_{acc}$ , or s may not have contributed votes in favour of x. 
In our formal analysis (Appendix E) we count these as attacker blocks, accounting for the worst case, and add them to the aforementioned constant C . 
We additionally show how the user can measure $n_1$ correctly, even if the attacker publishes his blocks in an attempt to delay acceptance.

上面的命题是引文14和15的要点。
在上面的概述中，我们忽略了许多额外的细节。 
例如，在$t_{pub}$，$t_{acc}$或s前后D秒附近, 诚实的块可能没有投票支持x。 
在我们的形式分析（附录E）中，我们将这些数据视为攻击者区块，考虑最坏的情况，并将其添加到上述常数C中。 
(**译注:** 诚实的块也是可以视作攻击)
我们还展示了用户如何正确测量$n_1$ ，即使攻击者发布他的区块以试图延迟接受。
