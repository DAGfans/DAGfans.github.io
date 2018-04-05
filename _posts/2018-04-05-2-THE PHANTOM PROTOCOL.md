> **Source：** [https://eprint.iacr.org/2018/104.pdf](https://eprint.iacr.org/2018/104.pdf)  
> **TranStudy：** [https://github.com/DAGfans/TranStudy/edit/master/Papers/PHANTOM/2-THE%20PHANTOM%20PROTOCOLmd](https://github.com/DAGfans/TranStudy/edit/master/Papers/PHANTOM/2-THE%20PHANTOM%20PROTOCOLmd)

# 2. THE PHANTOM PROTOCOL
# 2. PHANTOM 协议

In this section we describe the operation of the PHANTOM protocol.
PHANTOM consists of the following three-step procedure:

在本节中，我们将介绍PHANTOM协议的操作。
PHANTOM包含以下三个步骤：

> 1) Using the structure of the DAG, we recognize in it a cluster of well-connected blocks;
with high probability, blocks that were mined honestly belong to this cluster and vice versa.
> 2) We extend the DAG’s natural partial ordering to a full topological ordering in a way that favours blocks inside the selected cluster and penalizes those outside it.
> 3) The order over blocks induces an order over transactions;

transactions in the same block are ordered according to the order of their appearance in it.
We iterate over all transactions in this order, and accept each one that is consistent (according to the underlying Consistency notion) with those approved so far.
The Consistency notion used in the last step depends on the specific application under consideration.
For instance, with regards to the Payments application, a transaction is consistent with the history only if all of its inputs have been approved and no double spending transaction has been approved before.
Our work is agnostic to the definition of the Consistency rule.
The contribution of PHANTOM is its implementation of the first two steps described above, which we now turn to describe.

> 1) 使用DAG的结构，我们在其中识别出连接良好的区块集群;
很有可能，被诚实挖出的块属于这个集群，反之亦然。
> 2) 我们用某种方式将DAG天然的偏序扩展为全序，该方式奖励集群内的块，并对集群外的块进行惩罚。
> 3) 块的顺序也会引发交易的顺序(译注：应该是指，如果块A的顺序大于块B，则块A内的所有交易的顺序都大于块B内的交易);

同一块的交易根据它们在内部出现的顺序排序.
我们按照此顺序遍历所有交易，并接受每一笔与迄今已确认的交易一致(根据基本的一致性概念)的交易。
最后一步中使用的一致性概念取决于所考虑的具体应用。
例如，关于“支付”应用程序，只有在所有输入都被确认并且之前没有确认过双花交易的情况下，交易才符合历史记录。
我们的工作对一致性规则的定义是不可知的。
PHANTOM的贡献在于实现了上述的前两个步骤，现在我们来描述它们。

## A. Intuition

## A. 思路

How can we distinguish between honest blocks (i.e., blocks mined by cooperating nodes) and dishonest ones?

Recall that the DAG mining protocol instructs a miner to acknowledge in its new block the entire DAG it observes locally, by referencing the “tips” of the DAG.

Thus, if block B was mined at time t by an honest miner, then any block published before time $t-D$ was received by the miner and is therefore in B’s past set (i.e., referenced by B directly or recursively via its predecessors; see illustration in Figure 1).

Similarly, if B’s miner is honest then it published B immediately, and so any honest block created after time $t+D$ belongs to B’s future set.

我们如何区分诚实块(即由协作节点挖的块)和不诚实块？

回想一下，DAG挖矿协议指示矿工通过引用DAG的“末端”，在其新块中确认其本地观察到的整个DAG。

因此，如果块B在时间t由一个诚实的矿工挖出，那么在时间$t-D$之前发布的任何块都会被该矿工接收，因此会在B的过去集中(即，由B直接引用或通过其祖先递归地引用;参见 图1中的图解)。

同样，如果B的矿工是诚实的，并立即发布了B，所以在时间$t+D$之后创建的任何诚实的块都属于B的未来集。

As a result, the set of honest blocks in B’s anticone – which we denote $anticone_h(B)$– is typically small, and consists only of blocks created in the interval $\left [t-D,t+D \right ]$ .^2

In other words, the probability that an honest block B will suffer a large honest anticone is small:

$Pr(|anticone_h(B)|>k)\in O(e^{-C\cdot k})$ , for some constant $C > 0$ (this stems from a bound on the Poisson distribution’s tail).

We rely on this property and set PHANTOM’s parameter k such that the latter probability is smaller than δ , for some predeﬁned $\delta > 0$;

see discussion in Section 4.

因此，B的反锥体中的诚实块集- 我们表示为anticone h(B) - 通常很小，并且只包含在时段$\left [t-D,t+D \right ]$中创建的块。^2

换句话说，一个诚实的块B会面临一个大的诚实的反锥体的可能性很小：

对于某个常数$C> 0$, $Pr(|anticone_h(B)|>k)\in O(e^{-C\cdot k})$(这源于泊松分布尾部的边界)。

我们根据这个性质，并且设定PHANTOM的参数k，使得后者的概率小于某个预定义的大于0的δ;

请参阅第4节中的讨论。

Following this intuition, the set of honest blocks (save perhaps a fraction δ thereof) is guaranteed to form a k-cluster.

遵循这种思路，诚实的块集(可能因此要保存一个分数δ)能保证形成k-集群。

(^2) Note that, in contrast to anticone h(B), an attacker can easily increase the size of anticone(B), for any block B, by creating many blocks that do not reference B and that are kept secret so that B cannot reference them.

(^2) 注意，与 anticone h(B)相比，对于任何块B,攻击者可以通过创建许多不引用B并且保密的块来很容易地增加 anticone(B)的大小以至于B不能引用它们。

**Definition 1.** Given a DAG $G=(C,E)$ , a subset $S\subseteq C$ is called a k-cluster, if $\forall B\in S: |anticone(B)\cap S|\leq k$.

**定义1** 给定一个DAG $G =(C,E)$，如果 $\forall B \in S: |anticone(B)\cap S|\leq k$，则子集$S\subseteq C$被称为k-集群。

Note that the attacker can easily create k-clusters as well, e.g., by structuring his blocks in a single chain.

Fortunately, we can leverage the fact that the group of honest miners possesses a majority of the computational power, and look at the largest k-cluster.

We argue that the latter represents, in most likelihood, blocks that were mined properly by cooperating nodes.

Refer to Figure 2 for an illustration of the largest 3 -cluster in a given blockDAG.

Identifying this set in general DAGs turns out to be computationally infeasible, and so in practice our protocol uses a greedy algorithm which is good enough for our purposes.

We term this selection of a k-cluster a colouring of the DAG, and use the colours blue and red as a convention for blocks inside and outside the chosen cluster, respectively.

请注意，攻击者也可以很容易地创建k-集群，例如，通过在单个链中构建他的块。

幸运的是，我们可以利用这样一个事实，即诚实的矿工群体拥有大部分计算能力，并且只会考虑最大的k-集群。

我们认为后者很可能代表合作节点正确挖出的区块。

请参考图2，查看给定blockDAG中最大的3-集群的图示。

在一般情况下确定这个集合DAG在计算上是不可行的，所以在实践中我们的协议使用了一个对我们的目标来说足够实用的贪婪算法。

我们称这种K-集群的选择为DAG的着色，并按照惯例将蓝色和红色分别表示所选集群内部和外部块。

## B. Step #1: recognizing honest blocks

## B. 步骤 #1：识别诚实的块

Algorithm 1 below selects a k-cluster in a greedy fashion.

We denote by $BLUE_k(G)$ the set of blocks that it returns.

The algorithm operates as follows:

下面的算法1以贪婪的方式选择k-集群。

我们用$BLUE_k(G)$表示它返回的一组块。

该算法操作如下：

> 1) Given a DAG G, the algorithm recursively computes on the past set of each tip in G.^3
This outputs a k-cluster for each tip.^4 (lines 4-5)

> 2) Then, it makes a greedy choice and picks the largest one among the outputted clusters. (lines 6-7)

> 3) Finally, it tries to extend this set and add to it any block whose anticone is small enough with respect to the set. (lines 8-10)

> 1) 给定一个DAG G，该算法递归计算G 中每个末端的过去集合^3
这将为每个末端输出一个k-集群。^4(第4-5行)

> 2) 然后，它进行一个贪婪的选择，并从输出的集群中选出最大的一个。 (第6-7行)

> 3) 最后，它试图扩展这个集合，并添加任何相对于该集合来说其反锥体足够小的块。 (第8-10行)

(^3) A tip is a leaf-block, that is, a block not referenced by other blocks. See Figure 1.

(^4) Observe that, for any block B, the DAG $past(B)$ is fixed once and for all at B’s creation, and in particular the set $BLUE_k(past(B))$ cannot be later modified.

Thus, in an actual implementation of Algorithm 1, the sets $BLUE_k(B)$ will have been computed already (by previous calls) and stored, and there will be no need to recompute them.

(^3) 末端是一个叶块，也就是一个没有被其他块引用的块。 参见图1

(^4) 可见，对于任何块B，DAG的$past(B)$在B的创建时被永久地固定了，特别是集合$BLUE_k(past(B))$不能被过后修改。

因此，在算法1的实际实现中，集合$BLUE_k(B)$已经(通过之前的调用)被计算并被存储，并且将不需要重新计算它们。

Intuitively, we first let the DAG inherit the colouring of its highest scoring tip, $B_{max}$, where the score of a block is defined as the number of blue blocks in its past: $score(B) :=|BLUE_k(past(B))|$.

Then, we proceed to colour blocks in $anticone(B_{max})$ in a way that preserves the k-cluster property.

This inheritance implies that the greedy algorithm operates as a chain-selection rule—$B_{max}$ is the chain tip, the highest scoring tip in $past(B_{max})$ is its predecessor in the chain, and so on.

We denote this chain by $Chn(G) = (genesis = Chn_0(G),Chn_1(G),...,Chn_h(G))$.

The reasoning behind this procedure is very similar to that given in Section 1 in relation to the Maximum k-cluster SubDAG problem.

They only differ in that, instead of searching for the maximal k-cluster, we are hoping to maximize it via the tip with maximal cluster and then adding blocks from its anticone.

Thus, the reader should think of our algorithm (informally) as approximating the optimal solution to the Maximum k-cluster SubDAG problem.

直觉上，我们首先让DAG继承其得分最高的末端($B_{max}$)的着色，其中一个块的得分被定义为过去的蓝色块的数量：$score(B) :=|BLUE_k(past(B))|$。

然后，我们继续以保留k-集群属性的方式给$anticone(B_{max})$着色。

这种继承意味着贪婪算法作为一个链选择规则运行--$B_{max}$是链末端，$past(B_{max})$中得分最高的是它的上一级，以此类推。

我们用$Chn(G) = (genesis = Chn_0(G),Chn_1(G),...,Chn_h(G))$表示这条链。

这个过程背后的推理与第1节给出的最大k-集群SubDAG问题非常相似。

它们的区别仅在于，不是搜索最大k-集群，而是希望通过最大集群的末端使其最大化，然后从其反锥体中添加块。

因此，读者应该将我们的算法（非正式地）想象为近似最大k-集群SubDAG问题的最佳解决方案。

![fig 3](https://user-images.githubusercontent.com/22833166/37557316-b6d343a4-2a3d-11e8-8ac2-e66eab0aab45.jpg)

**Fig. 3:** An example of a blockDAG G and the operation of the greedy algorithm to construct its blue set $BLUE_k(B)$ set, under the parameter k= 3.

The small circle near each block X represents its score, namely, the number of blue blocks in the DAG $past(X)$.

The algorithm selects the chain greedily, starting from the highest scoring tip M, then selecting its predecessor K(the highest scoring tip in $past(M))$,

then H,D(breaking the C,D,E tie arbitrarily), and finally Genesis.

For methodological reasons, we add to this chain a hypothetical “virtual” block V – a block whose past equals the entire current DAG.

Blocks in the chain(genesis,D,H,K,M,V) are marked with a light-blue shade.

Using this chain, we construct the DAG’s set of blue blocks,$BLUE_k(G)$.

The set is constructed recursively, starting with an empty one, as follows: In step 1 we visit D and add genesis to the blue set (it is the only block in $past(D))$.

Next, in step 2, we visit H and add to $BLUE_k(G)$ blocks that are blue in $past(H)$, namely, C,D,E.

In step 3 we visit K and add H,I;

note that block B is in $past(K)$ but was not added to the blue set, since it has 4 blue blocks in its anticone.

In step 4 we visit M and add K to the blue set;

again, note that $F\in past(M)$ could not be added to the blue set due its large blue anticone.

Finally, in step 5, we visit the block $virtual(G) =V$, and add M and L to $BLUE_k(G)$, leaving J away due its large blue anticone.

**图3:** blockDAG G的一个例子，展示贪婪算法在参数k = 3下构造其蓝色集$BLUE_k(G)$的操作。

每个块X附近的小圆圈表示其得分，即DAG的$past(X)$中的蓝色块的数量。

该算法贪婪地选择链，从最高得分尖端M开始，然后选择其上级K（$past(M)$中的最高得分的末端）

然后H，D（从得分相同的C，D，E中随意选择），最后是创世块。

出于方法论的原因，我们在这条链上添加了一个假设的“虚拟”块V--一个过去与当前DAG相同的块。

链条中的块（创世块，D，H，K，M，V）标有浅蓝色阴影。

使用这个链，我们构建了DAG的蓝色块集合, $BLUE_k(G)$。

该集合是递归构造的，从空的开始，如下所示：在第1步中，我们访问D并将创世块添加到蓝色集合（它是$past(D)$中唯一的块）。

接下来，在步骤2中，我们访问H并添加$past(H)$中蓝色的块到$BLUE_k(G)$块集中，即C，D，E。

在步骤3中，我们访问K并添加H，I;

注意块B已经在$past(K)$中，但还没有添加到蓝色集合中，因为它的反锥体中有4个蓝色块。

在步骤4中，我们访问M并将K添加到蓝色集合;

再一次请注意，$F\in past(M)$由于其大蓝色反锥体而无法添加到蓝色集合中。

最后，在步骤5中，我们访问$virtual(G) =V$，并将M和L添加到$BLUE_k(G)$中，J由于其大的蓝色反锥体而被抛弃。

We demonstrate the operation of this algorithm in Figure 3.

Another example appears in Figure 4.

Note that the recursion halts because for any block $B\in G:|past(B)|<|G|$.

Let us specify the order in which blocks in $anticone(B_{max})$ should be visited, in line 8 of the algorithm.

We suggest inserting all blocks in $anticone(B_{max})$ into a lexicographical topological priority queue, which we denote $topo\_queue$.

The priority of a block is represented by the size of its past set;^5

in case of ties, the block with lowest hash ID is chosen.

我们在图3中演示该算法的操作。

另一个例子出现在图4中。

请注意，递归会因为任何块$B\in G:|past(B)|<|G|$而停止。

让我们在算法的第8行中指定应该被访问的$anticone(B_{max})$中块的顺序。

我们建议将$anticone(B_{max})$中所有的块插入到一个词典拓扑优先级队列中，我们将其表示为$topo\_queue$。

块的优先级由其过去集的大小表示; ^5

在优先级相同的情况下，选择ID的散列值最小的块。

(^5) This guarantees that a block cannot be popped out while a block in its past is still in the queue, since $C\in future(B) \Rightarrow |past(C)|>|past(B)|$.

(^5) 由于$C\in future(B) \Rightarrow |past(C)|>|past(B)|$，所以这确保了块在其过去的块仍然在队列中时不能弹出。

**Remark.** Our choice of ordering via $topo\_queue$ is not inherently significant, and many alternative topological orderings can provide similar robustness properties.

That said, it might be the case that other rules provide faster convergence and confirmation times.

We revisit this issue in Section 7.

**备注.** 我们选择通过$topo\_queue$进行排序的本质上并不重要，许多替代拓扑排序可以提供类似的鲁棒性性。

也就是说，其他规则可能会提供更快的收敛和确认时间。

我们在第7节重新讨论这个问题。

To summarize the function that the blue set satisfies, we state the following:

为了总结蓝色集满足的功能，我们陈述如下：

**Proposition 2.** Let $G=G_{pub}^\infty$ be the eventual DAG containing all blocks in history, and let B be an arbitrary block in G.

**命题2.** 假定 $G=G_{pub}^\infty$ 是包含历史中所有块的最终DAG，B为G中的任意块。

> - If B was created by an honest miner, the probability that B will not belong to $BLUE_k(G)$ decreases exponentially with k.

> - If B was created by a malicious miner, and was withheld for a time interval of length T, the probability that B will belong to $BLUE_k(G)$ decreases exponentially with T.

> - 如果B由诚实的矿工创建，则B不会属于$BLUE_k(G)$的概率随k的增大而指数式减小。

> - 如果B由恶意矿工创建，并且在长度为T的时间间隔内被扣留，那么B会属于$BLUE_k(G)$的概率将随着T的增大而指数式减小。

The proof of this proposition follows from the proof of Claim 3 in Section 5.

这个命题的证明来自第5节中的断言3的证明。

##### C. Step #2: ordering blocks

##### C. 步骤 #2: 区块排序

Recall that the DAG is ordered partially via its topology.

We now wish to extend this order to a full order (aka a topological order).

Our objective is to define a rule that gives precedence to blocks in the blue set, that penalizes blocks outside this set by deferring their location in the order, and that preserves the topological relations of blocks.

回想一下，DAG是通过其拓扑部分排序的。

我们现在希望将此顺序扩展到全序（又称拓扑顺序）。

我们的目标是定义一个让蓝色集合中的块优先的规则，该规则通过降低顺序来惩罚蓝色集合之外的块，并且保留块的拓扑关系。

We propose the following procedure: Traverse the blue set according to some topological order, and iteratively add blocks to the current last position in $ord^k$;

when visiting block B, first check if there are blocks in past(B) that haven’t been added yet, add such blocks to the order (again, according to some topological order), and then add B to the order.

我们提出以下步骤：根据某些拓扑顺序遍历蓝色集合，并迭代地将块添加到$ord^k$中当前的最后位置;

当访问块B时，首先检查past(B)中是否有块尚未添加，将这些块添加到顺序中（再次根据某种拓扑顺序），然​​后将B添加到顺序中。

For example, a possible output of $ord^3$ on the blockDAG illustrated in Figure 2 is: (A,D,C,G,B,F,I,E,J,H,K).

例如，图2中所示的blockDAG上的 $ord^3$的可能输出是：（A，D，C，G，B，F，I，E，J，H，K）。

This procedure is formalized in Algorithm 2 below.

The algorithm begins by initializing an empty priority queue and an empty ordered list.

Throughout, the list will represent the order in which blocks were popped out from the queue.

The algorithm favours blocks in the blue set by adding to the queue all of the blue children of the current block.

When a block is pushed into the queue, all blocks in its past (that weren’t already treated) are pushed as well.

该过程在下面的算法2中被形式化。

算法首先初始化一个空的优先级队列和一个空的有序列表。

在整个过程中，该列表将表示块从队列中弹出的顺序。

该算法通过向队列中添加当前块的所有蓝色子元素来支持蓝色集中的块。

当一个块被推入队列时，其所有过去的块（尚未处理过的块）也被推入。

In the algorithm,topo_queue is the same lexicographical topological priority queue defined in the preceding subsection.

In addition, the queue should avoid duplicating elements, and so $topo\_queue.push(C)$ should do nothing in case C is already in $topo\_queue$.

在算法中，topo_queue是在前一小节中定义的同样的词典拓扑优先级队列。

另外，队列应该避免重复元素，所以$topo\_queue.push(C)$在C已经在$topo\_queue$的情况下不应该做任何事情。

The intuition here is simple.

The algorithm is intended to guarantee that a block B can precede a blue block C only if B is blue, or B is referenced by a blue block.

In this way, blocks that were withheld by an attacker will not precede blocks that were mined properly and published on time (which are represented roughly by the set of blue blocks).

这里的思路很简单。

该算法旨在保证块只有B是蓝色，或B是由蓝色块引用时，B才可以在蓝色块C之前。

通过这种方式，攻击者扣留的区块将不会在正确挖出并按时发布的区块（大致由蓝色区块表示）之前。

> **Algorithm 1** Selection of a blue set

**Input:** G – a block DAG, k – the propagation parameter

**Output:** $BLUE_k(G)$ – the dense-set of G

1. **function** CALC-B L UE(G, k )

2. > **if** $B == genesis$ **then**

3. >> **return** {$genesis$}

4. > **for** $B \in tips(G)$ **do**

5. >> $BLUE_k(B) \leftarrow CALC-BLUE(past (B) , k)$

6. > $B_{max} \leftarrow \arg max \{|BLUE_k(B)|:B\in tips(G)\}$ (and break ties arbitrarily)

7. >> $BLUE_k(G) \leftarrow BLUE_k(B_{max}) \cup \{B_{max} \}$

8. >> **for** $B \in anticone (B_{max} )$ **do** in some topological ordering

9. >>> **if** $|anticone (B) \cap BLUE_k(G)| \leq k$ **then**

10. >>>> add B to $BLUE_k(G)$

11. >> **return** $BLUE_k(G)$

译者注：arg max即“argument of the maximum“的缩写，直译就是”最大值的自变量“，意思是使arg max后面所跟的公式达到最大值的自变量的取值。在上面算法中就是指拥有最多蓝色祖先区块的G的末端区块。

> **Algorithm 2** Ordering of the DAG

<hr>

**Input:** G – a block DAG, k – the propagation parameter

**Output:** $ord(G)$ – an ordered list containing all of G’s blocks

1. **function** ORDER(G, k )

2. > initialize empty queue topo_queue

3. > initialize empty ordered list L

4. > $BLUE_kG) \leftarrow CALC-BLUE(G, k)$

5. > $topo\_queue.push (genesis)$

6. > **while** $topo\_queue \neq \phi$ **do**

7. >> $B \leftarrow topo\_queue.pop()$

8. > $L.add(B)$ (B is added to the end of the list)

9. > **for all** $C \in childrenB \cap BLUE_k(G)$ **do**

10. >>> **for all** $D \in past (C) \cap anticone (b) \setminus L$ **do**

11. >>>> $topo\_queue.push(D)$

12. >>> $topo\_queue.push(C)$

13. > $ord(G) \leftarrow L$

14. > **return** $ord(G)$

##### D. Implications to transaction security

##### D. 对交易安全的影响

We now demonstrate how the above procedures of PHANTOM enable safe acceptance of transactions.

Consider a transaction $tx\in B$, where B is a block in the blue set of G.

In order to render tx invalid, a conflicting transaction $\bar{tx}$ must precede it in the order, and must therefore be embedded in a block $C\in anticone(B)$ that precedes B.^6

The ordering procedure implies that, for C to precedes B, it must either be a blue block or in the past set of a blue block.

In both cases,C could not have been withheld for too long, by the second guarantee of Proposition 2.

Thus, the recipient of tx can wait for the blue set around B to become sufficiently robust to reorgs, and then approve tx.

In Section 5 we prove that robustness is indeed obtained, after some waiting time.

我们现在演示PHANTOM的上述程序如何确保安全地接受交易。

考虑一个交易$tx\in B$，其中B是G的蓝色集合中的一个块。

为了使tx无效，冲突交易$\bar{tx}$ 必须在它的顺序之前，因此必须嵌入在B之前的块$C\in anticone(B)$

排序过程意味着，对于C先于B，它必须是蓝色块或过去的蓝色块。

在这两种情况下，由于命题2的第二个保证，C不能被扣留太久。

因此，tx的接收者可以等待B周围的蓝色集合对重组变得足够强健后，然后批准tx。

在第5节中，我们证明了在一段等待时间之后确实获得了鲁棒性。
