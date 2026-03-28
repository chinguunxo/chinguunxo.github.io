---
layout: post
title: "100 days of Bioinformatics: Day 4 - Uncertainty models -- Review"
subtitle: "Handling uncertainty with distribution models and their usage in bioinformatics."
date: 2026-03-28
tags: [100 days of bioinformatics]
---

## Probability distribution

A probability distribution is a **rule** that assigns probabilities to all possible outcomes of a random experiment, in a way that satisfies the axioms of probability.

### Formal idea

- For a **discrete** random variable, a probability distribution specifies \(P(X = x)\) for every possible value \(x\), with each probability between 0 and 1 and all of them adding up to 1.  
- For a **continuous** random variable, it is usually given by a *density function* \(f(x)\) such that probabilities of intervals are areas under \(f\), and the total area over all real numbers equals 1.  

### Defining a probability distribution

Here’s a compact, well-structured note based on your slide.

***

## 1. What is a probability distribution?

- A probability distribution models **uncertainty** about events.  
- It tells us how likely different outcomes of an experiment are.

***

## 2. Building a probability distribution

To define a probability distribution, we need three ingredients:

1. **Sample space** \(\Omega\)  
   - The set of all possible *atomic events* (basic outcomes).  
   - Example: For one coin toss, \(\Omega = \{\text{H}, \text{T}\}\).

2. **Set of events** \(\mathcal{F}\)  
   - A collection of subsets of \(\Omega\).  
   - These are the (non-atomic) events we want to assign probabilities to, e.g. \(\{\text{H}\}\), \(\{\text{T}\}\), \(\{\text{H},\text{T}\}\), \(\varnothing\).  
   - In full measure-theoretic language, \(\mathcal{F}\) is a sigma-algebra, but here you can think of it as “all the events we care about.”

3. **Probability assignment**  
   - If \(\Omega\) is **discrete**: define a *probability mass* for each atomic event \(\omega \in \Omega\), usually written \(P(\{\omega\})\).  
   - If \(\Omega\) is **continuous**: define a *probability density* \(f(\omega)\) over \(\Omega\).  
     - Probabilities of events \(E\) are then computed by integrating the density over \(E\):  
       \[
       P(E) = \int_{E} f(\omega)\, d\omega.
       \]

Together, \((\Omega, \mathcal{F}, P)\) is called a **probability space**.

***

## 3. Conditions a probability distribution must satisfy (Kolmogorov axioms)

For any event \(E \in \mathcal{F}\), the probability function \(P\) must satisfy:

1. **Non-negativity**  
   \[
   P(E) \ge 0.
   \]

2. **Normalization**  
   - The probability of the whole sample space is 1:  
     \[
     P(\Omega) = 1.
     \]

3. **Countable additivity (for disjoint events)**  
   - If \(E_1, E_2, E_3, \dots\) are pairwise disjoint (no overlap), then  
     \[
     P\Big(\bigcup_i E_i\Big) = \sum_i P(E_i).
     \]
   - Special cases:  
     - For two disjoint events \(E_1, E_2\):  
       \[
       P(E_1 \cup E_2) = P(E_1) + P(E_2).
       \]  
     - For three disjoint events \(E_1, E_2, E_3\):  
       \[
       P(E_1 \cup E_2 \cup E_3) = P(E_1) + P(E_2) + P(E_3).
       \]

***

## 4. Special events

- \(\varnothing\) (empty set) is the **impossible event**; it never happens.  
- \(\Omega\) is the **sure event**; it always happens.  

(From the axioms, you can deduce \(P(\varnothing) = 0\) and \(P(\Omega) = 1\).)

***

## 5. One simple example

Coin toss:

- \(\Omega = \{\text{H}, \text{T}\}\).  
- \(\mathcal{F} = \{\varnothing, \{\text{H}\}, \{\text{T}\}, \{\text{H},\text{T}\}\}\).  
- Fair coin: \(P(\{\text{H}\}) = 0.5\), \(P(\{\text{T}\}) = 0.5\).  
- Then \(P(\Omega) = P(\{\text{H},\text{T}\}) = 0.5 + 0.5 = 1\), and \(P(\varnothing) = 0\).


---




