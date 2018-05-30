---
layout: posts
categories:
  - Paper
image: https://user-images.githubusercontent.com/22833166/38848616-90b68176-423a-11e8-87e1-0287b5ed15e6.png
title: "BYTEBALL:2.DATABASE STRUCTURE"
tags:
  BYTEBALL
---
>* **Source：** [https://byteball.org/Byteball.pdf](https://byteball.org/Byteball.pdf)  
>* **TranStudy：** [https://github.com/DAGfans/TranStudy/tree/master/Projects/Byteball
](https://github.com/DAGfans/TranStudy/tree/master/Projects/Byteball)

# 2. Database structure
# 2. 数据库结构

When a user wants to add data to the database, he creates a new storage unit and broadcasts it to his peers. 
The storage unit includes (among other things):

* The data to be stored. A unit may include more than one data package called a message. There are many different types of messages, each with its own structure. One of the message types is payment, which is used to send bytes or other assets to peers.

* Signature(s) of one or more users who created the unit. Users are identified by their addresses. Individual users may (and are encouraged to) have multiple addresses, like in Bitcoin. In the simplest case, the address is derived from a public key, again similar to Bitcoin.

* References to one or more previous units (parents) identified by their hashes.

当用户想要将数据添加到数据库时，他创建一个新的存储单元并将其广播给他的对等节点。 
存储单元包括（除其他外）：

* 要存储的数据。 一个单元可能包含多个称为消息的数据包。 有很多不同类型的消息，每个消息都有自己的结构。 消息类型之一是支付，用于向对等节点发送字节或其他资产。

* 创建单元的一个或多个用户的签名。 用户通过他们的地址标识身份。 个人用户可能（并且被鼓励）拥有多个地址，比如比特币。 在最简单的情况下，地址来源于公钥，与比特币类似。

* 引用一个或多个以前的单元（上级）的散列。



References to parents is what establishes the order (only partial order so far) of units and generalizes the blockchain structure. 
Since we are not confined to one-parent–one-child relationships between consecutive blocks, we do not have to strive for near-synchrony and can safely tolerate large latencies and high throughputs: we’ll just have more parents per unit and more children per unit. 
If we go forward in history along parent-child links, we’ll observe many forks when the same unit is referenced by multiple later units, and many merges when the same unit references multiple earlier units (developers are already used to seeing this in git). 
This structure is known in graph theory as directed acyclic graph (DAG). 
Units are vertices, and parent-child links are the edges of the graph.

对上级单元的引用用于确定单元的顺序（至今只有偏序），并泛化区块链结构。 (译注: 泛化这里指区块链结构是一种只有单个父子单元的特殊DAG)
由于我们不限定连续块之间遵守单亲-单子关系，因此我们不必争取近似同步，并且可以安全地忍受较大的延迟和高吞吐量：我们可以在每个单元内拥有更多的父单元和子单元。 (译注: 这里的近似同步相对于严格同步, 以比特币为例, 平均出块时间虽然远大于平均传播时间, 但是理论上后者是可以大于前者的, 造成不同步)
如果我们沿父子链接往前走，我们会观察到当单元被多个后续单元引用时会产生分叉, 当引用多个前置单元时会产生合并 ( 开发者可能已经在git中经常看到这种情况 )。 
这种结构在图论中称为有向无环图（DAG）。 
单元是顶点，父子链接是图的边。

![Figure 1. Storage units connected into a DAG. Arrows are from child to parent, G is the genesis unit.](https://user-images.githubusercontent.com/22833166/39611663-fd2cb7d6-4f8b-11e8-99e6-983dec901ae3.png)

Figure 1. Storage units connected into a DAG. Arrows are from child to parent, G is the genesis unit.
图 1. 连接到DAG的存储单元。 箭头从子单元指向父单元，G是创世单元。


In the special case when new units arrive rarely, the DAG will look almost like a chain, with only occasional forks and quick merges.

在新单元很少到达的特殊情况下，DAG将看起来几乎像一条链，只有偶尔的分叉和快速合并。

Like in blockchains where each new block confirms all previous blocks (and transactions therein), every new child unit in the DAG confirms its parents, all parents of parents, parents of parents of parents, etc. 
If one tries to edit a unit, he will also have to change its hash. 
Inevitably, this would break all child units who reference this unit by its hash as both signatures and hashes of children depend on parent hashes. 
Therefore, it is impossible to revise a unit without cooperating with all its children or stealing their private keys. The children, in turn, cannot revise their units without cooperating with their children (grandchildren of the original unit), and so on. 
Once a unit is broadcast into the network, and other users start building their units on top of it (referencing it as parent), the number of secondary revisions required to edit this unit hence grows like a snowball. 
That’s why we call this design Byteball (our snowflakes are bytes of data).

就像在每个新块确认所有先前块（以及其中的交易）的区块链中一样，DAG中的每个新的子单元都确认其父单元，父单元的所有父单元，父单元的父单元的父单元等。
如果试图编辑单元， 也将不得不改变它的散列。 
不可避免的是，这将破坏所有通过散列引用本单元的子单元，因为子单元的签名和散列都依赖于父散列。 
因此，如果不与所有的子单元合作或窃取它们的私钥，就不可能修改一个单位。 
反过来，子单元如果不与其子单元（原单元的孙单元）合作，就不能修改它们的单元，以此类推。 
一旦一个单元被广播到网络中，并且其他用户开始在它之上建立他们的单元（引用它作为父单元），编辑这个单元所需的连带修改的数量就会像雪球一样增长。 
这就是为什么我们将这种设计称为Byteball（我们的雪花是数据的字节）的原因。

Unlike blockchains where issuing a block is a rare event and only a privileged caste of users is in practice engaged in this activity, in a new Byteball unit starts accumulating confirmations immediately after it is released and confirmations can come from anyone, every time another new unit is issued. 
There is no two-tier system of ordinary users and miners. 
Instead, users help each other: by adding a new unit its author also confirms all previous units.

与区块链不同，区块链发布区块是非常罕见的事件，只有特权级别的用户实际参与此活动，而新的Byteball单元在发布后立即开始累积确认信息，确认信息可以来自任何人，只要他们有新的单元发布。 
没有普通用户和矿工的双层体系。 
相反，用户互相帮助：通过添加一个新单元，它的作者也确认了以前的所有单元。

Unlike Bitcoin, where an attempt to revise a past transaction requires a large computational effort, an attempt to revise a past record in Byteball requires coordination with a large and growing number of other users, most of whom are anonymous strangers. 
The immutability of past records is therefore based on the sheer complexity of coordinating with such a large number of strangers, who are difficult to reach, have no interest in cooperation, and where every single one of them can veto the revision.

与比特币尝试修改过去交易需要大量计算量不同，尝试修改Byteball中的过去记录需要与大量且不断增加的其他用户进行联合，其中大部分用户都是匿名的陌生人。 
因此，过去记录的不可变性基于与大量陌生人进行联合的高度复杂性，这些陌生人难以联系，对联合没有兴趣，并且每个人都可以否决这次修改。(译注: 这里的说法也不完全对, 理论上如果有足够的算力和资源其实也是可以发动女巫攻击的, 所以雪球会有见证人这样的共识机制)

By referencing its parents, a unit includes the parent. 
It doesn’t include the full content of the parent; rather, it depends on its information through the parent’s hash. 
In the same way, the unit indirectly depends on and therefore includes the parents of the parent, their parents, and so on, and every unit ultimately includes the genesis unit.

一个单元通过引用其父单元来包含它们。 
它不包含父单元的全部内容; 相反，它依赖于父单元的散列信息。 
同样，单元间接依赖并因此包括父单元的父单元等，以及更上一级的父单元, 以此类推, 最终每个单元会包含创世单位。

There is a protocol rule that a unit cannot reference redundant parents – that is such parents that one parent includes another. 
For example, if unit B references unit A, then unit C cannot reference both units A and B at the same time. 
A is already, in a way, contained within B. 
This rule removes unnecessary links that don’t add any new useful connectivity to the graph.

有一个协议规则要求，一个单元不能引用冗余的父单元 - 就是指其中一个父单元包含另一个父单元。 
例如，如果单元B引用单元A，则单元C不能同时引用单元A和B. 
因为A已经以某种方式包含在B中。
该规则移除了冗余的链接，因为它们不会为图添加任何新的有用连接性。
