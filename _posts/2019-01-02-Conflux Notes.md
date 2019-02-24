---
layout: posts
categories:
  - Blog
title: "Conflux笔记"
---

# Conflux阅读笔记

[Phantom历史版本](https://eprint.iacr.org/eprint-bin/getfile.pl?entry=2018/104&version=20180529:083501&file=104.pdf)

[Phantom修订版本](https://eprint.iacr.org/2018/104.pdf)

[Conflux论文地址](https://arxiv.org/pdf/1805.03870.pdf)（其中附录给出了对Phantom的攻击案例）

以上链接来自[知乎上的Conflux中文社区的一个回答](https://www.zhihu.com/question/305112969/answer/550983357)。

## 论文末尾对Phantom的攻击策略

思路：定义一批攻击区块，即文中的集合$A$，使作恶tips的分值比诚实tips的分值高。这样Phantom算法就会从作恶tips开始构造主链。

在攻击策略中，作者定义了一个正整数数列：

$$
h_n = \frac{(n - 2)(n - 1)}{2} + 1
$$

因此，

$$
\begin{aligned}
h_i - h_{i - 1 + k_\Delta}
&= \frac{(i - 2)(i - 1)}{2} - \frac{(i - 3 + k_\Delta)(i - 2 + k_\Delta)}{2}  \\
&= - \frac{(k_\Delta - 1)(k_\Delta + 2i - 4)}{2}，\\
h_i
&= h_{i - 1 + k_\Delta} - \frac{(k_\Delta - 1)(k_\Delta + 2i - 4)}{2}，\\
|Blue_k(past(a_i))|
&= i - 1 + h_i  \\
&= i - 1 + h_{i - 1 + k_\Delta} - \frac{(k_\Delta - 1)(k_\Delta + 2i - 4)}{2}  \\
&< i - 1 + h_{i - 1 + k_\Delta} - \frac{(k_\Delta - 1)(k_\Delta - 2i - 4)}{2}  \\
&= i - 1 + h_{i - 1 + k_\Delta} - \frac{k_\Delta^2 - 2k_\Delta i -5k_\Delta + 2i + 4}{2}  \\
&< i - 1 + h_{i - 1 + k_\Delta} - \frac{k_\Delta^2 - 2k_\Delta -5k_\Delta + 2i + 4}{2}  \\
&= i - 1 + h_{i - 1 + k_\Delta} - \frac{k_\Delta^2 - 7k_\Delta + 2i + 4}{2}  \\
&= h_{i - 1 + k_\Delta} - 1 - \frac{k_\Delta^2 - 7k_\Delta + 4}{2}  \\
&< h_{i - 1 + k_\Delta} - 1 - \frac{k_\Delta^2 - 7k_\Delta}{2}。  \\
\end{aligned}
$$

又因为论文A.2的参数假设（Parameter Assumption）一节假设$$k_\Delta (k_\Delta - 7) \geq 4k'$$，所以

$$
\begin{aligned}
h_{i - 1 + k_\Delta} - 1 - \frac{k_\Delta^2 - 7k_\Delta}{2}
&\leq h_{i - 1 + k_\Delta} - 1 - 2k'  \\
& < h_{i - 1 + k_\Delta} - 1 - k'。
\end{aligned}
$$

于是

$$
|Blue_k(past(a_i))| < h_{i - 1 + k_\Delta} - 1 - k'。
$$
