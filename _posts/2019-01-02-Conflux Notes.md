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

在Conflux论文的附录A.2的攻击策略中，作者定义了一个正整数数列：

$$
h_n = \frac{(n - 2)(n - 1)}{2} + 1
$$

因此，

$$
\begin{aligned}
h_i - h_{i - 1 + k_\Delta}
&= \frac{(i - 2)(i - 1)}{2} - \frac{(i - 3 + k_\Delta)(i - 2 + k_\Delta)}{2}  \\
&= - \frac{(k_\Delta - 1)(k_\Delta + 2i - 4)}{2}
\end{aligned}
$$
