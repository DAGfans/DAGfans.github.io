---
layout: posts
categories:
  - Paper
image: https://user-images.githubusercontent.com/22833166/38848616-90b68176-423a-11e8-87e1-0287b5ed15e6.png
title: "SPECTRE:7.CONCLUSION"
tags:
  SPECTRE
---
> **Source：** [https://eprint.iacr.org/2016/1159.pdf](https://eprint.iacr.org/2016/1159.pdf)  
> **TranStudy：** [https://github.com/DAGfans/TranStudy/new/master/Papers/SPECTRE](https://github.com/DAGfans/TranStudy/new/master/Papers/SPECTRE)


# 7. CONCLUSION
# 7. 结论


In this work we presented SPECTRE, a new cryptocurrency protocol that is inherently scalable. 
Unlike Bitcoin and its many variants, SPECTRE is secure against attackers with less than 50% of the computational power, even when its throughput is increased and the propagation delay becomes non-negligible. 
Our results demonstrate that SPECTRE can achieve incredibly low conﬁrmation times, especially compared to Nakamoto Consensus. 
Further work to improve and tighten the acceptance policy we derived can lower conﬁrmation times further. 
Key to SPECTRE’s achievements is its willingness to delay the decision regarding visibly double-spent transactions. 
It thus solves a weaker problem than traditional consensus protocols. 
This fact also makes it less suitable for systems like Ethereum, where a total order over transactions is required

在本论文中，我们介绍了SPECTRE，一种新的加密货币协议，具有内在的可扩展性。 
与比特币及其众多变体不同，即使其吞吐量增加并且传播延迟变得不可忽略，SPECTRE也可以安全抵御计算能力不足50％的攻击者。 
我们的研究结果表明，SPECTRE可以实现令人难以置信的低确认时间，特别是与中本聪共识相比。 
进一步改进和收紧我们生成的接受规则可进一步缩短确认时间。 
SPECTRE的成就关键在于它延迟了明显的双花交易的决定时间。 
因此它解决了一个比传统共识协议更弱的问题。 
这一事实也使得它不太适合像以太坊这样的系统，因为它们需要交易的全序

The core algorithm of SPECTRE – the pairwise voting procedure (Alg. 1) – is nontrivial. 
We encourage the reader to refer to Appendix A for intuition and illustrations about its operation.
SPECTRE的核心算法 - 成对投票程序（算法1） - 是不平凡的。 
我们鼓励读者参考附录A中的思路和操作说明。

REFERENCES
参考

[1] Ittai Abraham, Dahlia Malkhi, Kartik Nayak, Ling Ren, and Alexander Spiegelman. Solidus: An incentive-compatible cryptocurrency based on permissionless byzantine consensus. arXiv preprint arXiv:1612.02916, 2016.

[2] Kenneth J Arrow, Amartya Sen, and Kotaro Suzumura. Handbook of Social Choice & Welfare, volume 2.

Elsevier, 2010.

[3] Miguel Correia, Nuno Ferreira Neves, and Paulo Ver´ıssimo. From consensus to atomic broadcast: Time-free byzantine-resistant protocols without signatures. The Computer Journal, 49(1):82–96, 2006.

[4] Christian Decker, Jochen Seidel, and Roger Wattenhofer. Bitcoin meets strong consistency. In Proceedings of the 17th International Conference on Distributed Computing and Networking, page 13. ACM, 2016.

[5] Christian Decker and Roger Wattenhofer. Information propagation in the bitcoin network. In 13th IEEE International Conference on Peer-to-Peer Computing (P2P), Trento, Italy, September 2013.

[6] Ittay Eyal, Adem Efe Gencer, Emin G¨un Sirer, and Robbert Van Renesse. Bitcoin-ng: A scalable blockchain protocol. In 13th USENIX Symposium on Networked Systems Design and Implementation (NSDI 16), pages 45–59, 2016.

[7] Juan Garay, Aggelos Kiayias, and Nikos Leonardos. The bitcoin backbone protocol: Analysis and applications. In Annual International Conference on the Theory and Applications of Cryptographic Techniques, pages 281–310. Springer, 2015.

[8] Aggelos Kiayias and Giorgos Panagiotakos. On trees, chains and fast transactions in the blockchain. Cryptology ePrint Archive, Report 2016/545, 2016.

[9] Eleftherios Kokoris-Kogias, Philipp Jovanovic, Nicolas Gailly, Ismail Khofﬁ, Linus Gasser, and Bryan Ford.

Enhancing bitcoin security and performance with strong consistency via collective signing. In 25th USENIX Security Symposium, USENIX Security 16, Austin, TX, USA, August 10-12, 2016., pages 279–296, 2016.

[10] Yoad Lewenberg, Yonatan Sompolinsky, and Aviv Zohar. Inclusive block chain protocols. In International Conference on Financial Cryptography and Data Security, pages 528–547. Springer, 2015.

[11] Silvio Micali. Algorand: the efﬁcient and democratic ledger. arXiv preprint arXiv:1607.01341, 2016.

[12] Andrew Miller, Yu Xia, Kyle Croman, Elaine Shi, and Dawn Song. The honey badger of bft protocols. In Proceedings of the 2016 ACM SIGSAC Conference on Computer and Communications Security, pages 31–42. ACM, 2016.

[13] Satoshi Nakamoto. Bitcoin: A peer-to-peer electronic cash system, 2008.

[14] Rafael Pass, Lior Seeman, and Abhi Shelat. Analysis of the blockchain protocol in asynchronous networks.

IACR Cryptology ePrint Archive, 2016:454, 2016.

[15] Rafael Pass, Lior Seeman, and Abhi Shelat. Analysis of the blockchain protocol in asynchronous networks.

IACR Cryptology ePrint Archive, 2016:454, 2016.

[16] Rafael Pass and Elaine Shi. Hybrid consensus: Efﬁcient consensus in the permissionless model. Cryptology ePrint Archive, Report 2016/917, 2016.

[17] Meni Rosenfeld. Analysis of hashrate-based double spending. arXiv preprint arXiv:1402.2009, 2014.

[18] Yonatan Sompolinsky and Aviv Zohar. Secure high-rate transaction processing in bitcoin. In International Conference on Financial Cryptography and Data Security, pages 507–527. Springer, 2015.
