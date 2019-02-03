---
layout: posts
categories:
  - Blog
title: "Prism笔记"
---

# Prism阅读笔记

# Prism Notes

[Prism论文地址](https://dtr.org/wp-content/uploads/2019/01/2018-11-8-Deconstructing-Blockchain-Approach-Physical-Limits.pdf)

[The address of the Prism paper](https://dtr.org/wp-content/uploads/2019/01/2018-11-8-Deconstructing-Blockchain-Approach-Physical-Limits.pdf)

## Mathematical Notations

## 数学符号

$$\beta$$: the fraction of hashing power the adversary can control without compromising system security, defined in section 1.1.

$$\beta$$：在系统安全性不受危害的情况下攻击者能控制的哈希算力的部分。定义在1.1节。

$$\lambda$$: the throughput, number of transactions confirmed per second, defined in section 1.1.

$$\lambda$$：吞吐量，即每秒钟确认的交易数量。定义在1.1节。

$$C$$: the communication capacity of the network, measured in transactions per second, defined in section 1.2.

$$C$$：网络的通信承载力，以每秒承载的交易数量为度量。定义在1.2节。

$$\overline{\lambda} := \lambda / C$$: the throughput as a fraction of the network capacity and is a measure of the efficiency of a protocol, defined in the beginning of section 4.

$$\overline{\lambda} := \lambda / C$$：网络承载力的一部分，是对协议效率的一种度量。定义在第4节的开头。

## Comments for Comprehension

## 有助于理解的笔记

在图6的注释中，作者说“The tradeoffs for the baseline protocols are upper bounds, while that for Prism 1.0 is exact”。
这里的意思是基线的协议需要在（吞吐量）上限上做出妥协，而Prism 1.0的上限则正好是$$1 - \beta$$。
