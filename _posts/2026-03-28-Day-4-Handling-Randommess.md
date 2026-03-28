---
layout: post
title: "100 days of Bioinformatics: Day 4 - Uncertainty models (Review)"
subtitle: "Handling uncertainty with distribution models and their usage in bioinformatics."
date: 2026-03-28
tags: [100 days of bioinformatics]
---

## 1. Probability distribution

A probability distribution is a **rule** that assigns probabilities to all possible outcomes of a random experiment, in a way that satisfies the axioms of probability.
- A probability distribution models **uncertainty** about events.  
- It tells us how likely different outcomes of an experiment are.

### 1.1. Formal idea

- For a **discrete** random variable, a probability distribution specifies \(P(X = x)\) for every possible value \(x\), with each probability between 0 and 1 and all of them adding up to 1.  
- For a **continuous** random variable, it is usually given by a *density function* \(f(x)\) such that probabilities of intervals are areas under \(f\), and the total area over all real numbers equals 1.  

### 1.2. Defining and building a probability distribution

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

### 1.3. Conditions a probability distribution must satisfy (Kolmogorov axioms)

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

### 1.4. Special events

- \(\varnothing\) (empty set) is the **impossible event**; it never happens.  
- \(\Omega\) is the **sure event**; it always happens.  

(From the axioms, you can deduce \(P(\varnothing) = 0\) and \(P(\Omega) = 1\).)

***

### 1.5. One simple example

Coin toss:

- \(\Omega = \{\text{H}, \text{T}\}\).  
- \(\mathcal{F} = \{\varnothing, \{\text{H}\}, \{\text{T}\}, \{\text{H},\text{T}\}\}\).  
- Fair coin: \(P(\{\text{H}\}) = 0.5\), \(P(\{\text{T}\}) = 0.5\).  
- Then \(P(\Omega) = P(\{\text{H},\text{T}\}) = 0.5 + 0.5 = 1\), and \(P(\varnothing) = 0\).

---

## 2. Conditional probability: core idea

- **Conditional probability** means the probability of an event **given** that some other event is known to have occurred.  
- Notation: \(P(E \mid F)\).  
- Formula (when \(P(F) > 0\)):  
  \[
  P(E \mid F) = \frac{P(E \cap F)}{P(F)}.
  \]

***

### 2.1. How to interpret conditional probability

- When we condition on \(F\), we **restrict** our universe to situations where \(F\) happens and then look at how often \(E\) happens within that restricted universe.  
- Mathematically, a *conditional probability distribution* is just an ordinary probability distribution where the “sure event” is the conditioning event \(F\) instead of the whole sample space \(\Omega\).  
- The conditioned event \(F\) represents some known or assumed information (facts we’ve already observed).

***

#### 2.1.1. Example from the slide (two dice)

Scenario: Roll two fair 6-sided dice.

- Conditioning event \(F\): “both dice landed on odd values.”  
- Target event \(E\): “at least one die shows a 1.”  
- We want \(P(E \mid F)\): among all outcomes where both dice are odd, what fraction have at least one 1?

(You can practice by explicitly listing the odd–odd outcomes and counting.)

***

## 3. Law of total probability

The law of total probability decomposes \(P(F)\) along a partition of the sample space.

- With an event \(E\) and its complement \(\bar{E}\), we have:
  \[
  P(F) = P(F \mid E)P(E) + P(F \mid \bar{E})P(\bar{E}).
  \]
- More generally, if \(\{E_i\}\) is a collection of events that are:
  - **Mutually exclusive** (no overlaps), and  
  - **Collectively exhaustive** (their union is the whole sample space),  
  then:
  \[
  P(F) = \sum_i P(F \mid E_i) P(E_i).
  \]

Interpretation: to get the overall probability of \(F\), you:

- Break the world into disjoint “cases” \(E_i\).  
- Compute the probability of \(F\) within each case: \(P(F \mid E_i)\).  
- Weight each case by how likely that case is: \(P(E_i)\), and then sum.

---



