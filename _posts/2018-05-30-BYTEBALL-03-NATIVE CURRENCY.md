---
layout: posts
categories:
  - Paper
image: https://user-images.githubusercontent.com/39436379/40726422-4edc1474-6458-11e8-81bd-c36e005d1037.jpg
title: "BYTEBALL:3.NATIVE CURRENCY:BYTE"
tags:
  BYTEBALL
---
>* **Source：** [https://byteball.org/Byteball.pdf](https://byteball.org/Byteball.pdf)  
>* **TranStudy：** [https://github.com/DAGfans/TranStudy/tree/master/Projects/Byteball
](https://github.com/DAGfans/TranStudy/tree/master/Projects/Byteball)

# 3. Native currency: bytes
# 3. 原生货币：字节(bytes)

Next, we need to introduce some friction to protect against spamming the database with useless messages. 
The barrier to entry should roughly reflect the utility of storage for the user and the cost of storage for the network. 
The simplest measure for both of these is the size of the storage unit. 
Thus, to store your data in the global decentralized database you have to pay a fee in internal currency called bytes, and the amount you pay is equal to the size of data you are going to store (including all headers, signatures, etc). 
Similar to pound sterling, which was equal to one pound of silver when it was first introduced, the name of the currency reflects its value.

接下来，我们需要引入一些门槛来防止滥发无用的消息到数据库。 
进入门槛大致反映了用户存储的效用和网络存储成本。 
最简单的衡量两者的方法就是存储单元的大小。 
因此，要将数据存储在全局的去中心化数据库中，你必须要用被成为字节(bytes)的内部货币支付手续费，并且你支付的金额就是等于你要存储的数据的大小（包括所有头部，签名等）。 
与英镑一样，它在首次引进时相当于一磅白银，货币的名称反映了它的价值。

To keep the incentives aligned with the interests of the network, there is one exception in size calculation rules. 
For the purposes of calculating unit size, it is assumed that the unit has exactly two parents, no matter the real number. 
Therefore, the size of two hashes of parent units is always included in the unit size. 
This exception ensures that users will not try to include just one parent in an effort to minimize cost. 
The cost is the same no matter how many parents are included.

为保持激励与网络利益一致，尺寸计算规则中有一个例外。 
在计算单元大小时，假定单元正好有两个父单元，而不管实际情况是几个。 
因此，父单元的两个散列的大小总是包含在单元尺寸中。 
这种例外可以确保用户不会尝试仅包含一个父单元，以尽可能降低成本。 
无论包括多少父单元，成本是相同的。

To keep the DAG as narrow as possible, we incentivize users to include as many parents as possible (as mentioned before, this does not negatively affect payable size), and as recent parents as possible, by paying part of the unit’s fees to those who are first to include it as a parent. 
We’ll define later what exactly is ‘first’.

为了使DAG尽可能变窄，(译注: 变窄的是指DAG不要产生过多的分支)我们鼓励用户尽可能多地包含父单元（如前所述，这不会对支付金额的大小产生负面影响），然后通过将单元的手续费支付给最先将其作为父单元包含进来的单元, 鼓励尽可能地包含最近的父单元。 
我们将在后面定义'最先'到底是什么。

Bytes can be used not only for payment of storage fees (also called commissions), but also can be sent to other users to pay for goods or services or in exchange for other assets. 
To send a payment, the user creates a new unit that includes a payment message such as the following (from now on, we use JSON to describe data structures):

字节不仅可以用于支付存储费用（也称为手续费），还可以发送给其他用户以支付商品或服务或换取其他资产。 
要发送支付，用户需要创建一个包含如下格式的支付消息的新单元（从现在开始, 我们使用JSON来描述数据结构）：

```javascript
{

inputs: [ {

unit: "hash of input unit", message_index: 2, // index of message where this utxo was created output_index: 0 // index of output where this utxo was created

}, …

], outputs: [ {

address: "RECEIVER ADDRESS", amount: 15000 // in bytes

}, …

]

}
```


The message contains:

* An array of outputs: one or more addresses that receive the bytes and the amounts they receive.

* An array of inputs: one or more references to previous outputs that are used to fund the transfer. These are outputs that were sent to the author address(es) in the past and are not yet spent.

该消息包含：

* 一组输出：一个或多个接收字节的地址以及接收数量。

* 一组输入：一个或多个之前的输出的引用, 用于提供该转账所需的资金。 这些输出是之前被发送到交易发起人的地址上但是还未被花费的交易。

The sum of inputs should be equal to the sum of outputs plus commissions (input amounts are read from previous outputs and are not explicitly indicated when spending). 
The unit is signed with the author’s private keys.

输入总和应等于输出加手续费的总和（输入的金额是从上一个输出的汇总得到的, 所以不需要明确指示）。 
该单元使用交易发起人的私钥签名。(译注: 注意区别两个输出, 一个是当前交易的输出, 一个是当前输入所引用的之前未花费的交易的输出)

The total number of bytes in circulation is $10^{15}$ , and this number is constant. 
All bytes are issued in the genesis unit, then transferred from user to user. 
Fees are collected by other users who help to keep the network healthy (more details about that later), so they stay in circulation. 
The number $10^{15}$  was selected as the largest round integer that can be represented in JavaScript. 
Amounts can only be only integers. 
Larger units of the currency are derived by applying standard prefixes: 1 kilobyte (Kb) is 1,000 bytes, 1 megabyte (Mb) is 1 million bytes, etc.

流通中的总字节数是$10^{15}$，并且这个数字是恒定的。 
所有字节都在创世单元中发布，然后从用户转移到用户。 
被其他用户收集的费用有助于保持网络的健康（稍后会有更多详细信息），因此它们会保持流通。 
选择数字$10^{15}$ 是因为它是JavaScript可以表示的最大整数。 
数量只能是整数。 
较大的货币单位使用标准的尺寸单位：1千字节（Kb）是1,000字节，1兆字节（Mb）是100万字节等等。
