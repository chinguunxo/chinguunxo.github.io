---
layout: post
title: "100 days of Bioinformatics: Day 4 - Uncertainty models (Review)"
subtitle: "Handling uncertainty with distribution models and their usage in bioinformatics."
date: 2026-03-25
tags: [100 days of bioinformatics]
---

## 1. Probability distribution

A probability distribution is a **rule** that assigns probabilities to all possible outcomes of a random experiment, in a way that satisfies the axioms of probability.
- A probability distribution models **uncertainty** about events.  
- It tells us how likely different outcomes of an experiment are.

### 1.1. Formal idea

- For a **discrete** random variable, a probability distribution specifies $$P(X = x)$$ for every possible value $$x$$, with each probability between 0 and 1 and all of them adding up to 1.  
- For a **continuous** random variable, it is usually given by a *density function* $$f(x)$$ such that probabilities of intervals are areas under $$f$$, and the total area over all real numbers equals 1.  

### 1.2. Defining and building a probability distribution

To define a probability distribution, we need three ingredients:

1. **Sample space** $$\Omega$$  
   - The set of all possible *atomic events* (basic outcomes).  
   - Example: For one coin toss, $$\Omega = \{\text{H}, \text{T}\}$$.

2. **Set of events** $$\mathcal{F}$$  
   - A collection of subsets of $$\Omega$$.  
   - These are the (non-atomic) events we want to assign probabilities to, e.g. $$\{\text{H}\}$$, $$\{\text{T}\}$$, $$\{\text{H},\text{T}\}$$, $$\varnothing$$.  
   - In full measure-theoretic language, $$\mathcal{F}$$ is a sigma-algebra, but here you can think of it as “all the events we care about.”

3. **Probability assignment**  
   - If $$\Omega$$ is **discrete**: define a *probability mass* for each atomic event $$\omega \in \Omega$$, usually written $$P(\{\omega\})$$.  
   - If $$\Omega$$ is **continuous**: define a *probability density* $$f(\omega)$$ over $$\Omega$$.  
     - Probabilities of events $$E$$ are then computed by integrating the density over $$E$$:  
       $$
       P(E) = \int_{E} f(\omega)\, d\omega.
$$

Together, $$(\Omega, \mathcal{F}, P)$$ is called a **probability space**.

***

### 1.3. Conditions a probability distribution must satisfy (Kolmogorov axioms)

For any event $$E \in \mathcal{F}$$, the probability function $$P$$ must satisfy:

1. **Non-negativity**  
   $$
   P(E) \ge 0.
$$

2. **Normalization**  
   - The probability of the whole sample space is 1:  
     $$
     P(\Omega) = 1.
$$

3. **Countable additivity (for disjoint events)**  
   - If $$E_1, E_2, E_3, \dots$$ are pairwise disjoint (no overlap), then  
     $$
     P\Big(\bigcup_i E_i\Big) = \sum_i P(E_i).
$$
   - Special cases:  
     - For two disjoint events $$E_1, E_2$$:  
       $$
       P(E_1 \cup E_2) = P(E_1) + P(E_2).
$$  
     - For three disjoint events $$E_1, E_2, E_3$$:  
       $$
       P(E_1 \cup E_2 \cup E_3) = P(E_1) + P(E_2) + P(E_3).
$$

***

### 1.4. Special events

- $$\varnothing$$ (empty set) is the **impossible event**; it never happens.  
- $$\Omega$$ is the **sure event**; it always happens.  

(From the axioms, you can deduce $$P(\varnothing) = 0$$ and $$P(\Omega) = 1$$.)

***

### 1.5. One simple example

Coin toss:

- $$\Omega = \{\text{H}, \text{T}\}$$.  
- $$\mathcal{F} = \{\varnothing, \{\text{H}\}, \{\text{T}\}, \{\text{H},\text{T}\}\}$$.  
- Fair coin: $$P(\{\text{H}\}) = 0.5$$, $$P(\{\text{T}\}) = 0.5$$.  
- Then $$P(\Omega) = P(\{\text{H},\text{T}\}) = 0.5 + 0.5 = 1$$, and $$P(\varnothing) = 0$$.

---

## 2. Conditional probability: core idea

- **Conditional probability** means the probability of an event **given** that some other event is known to have occurred.  
- Notation: $$P(E \mid F)$$.  
- Formula (when $$P(F) > 0$$):  
  $$
  P(E \mid F) = \frac{P(E \cap F)}{P(F)}.
$$

***

### 2.1. How to interpret conditional probability

- When we condition on $$F$$, we **restrict** our universe to situations where $$F$$ happens and then look at how often $$E$$ happens within that restricted universe.  
- Mathematically, a *conditional probability distribution* is just an ordinary probability distribution where the “sure event” is the conditioning event $$F$$ instead of the whole sample space $$\Omega$$.  
- The conditioned event $$F$$ represents some known or assumed information (facts we’ve already observed).

***

#### 2.1.1. Example (two dice)

Scenario: Roll two fair 6-sided dice.

- Conditioning event $$F$$: “both dice landed on odd values.”  
- Target event $$E$$: “at least one die shows a 1.”  
- We want $$P(E \mid F)$$: among all outcomes where both dice are odd, what fraction have at least one 1?

(You can practice by explicitly listing the odd–odd outcomes and counting.)

***

## 3. Law of total probability

The law of total probability decomposes $$P(F)$$ along a partition of the sample space.

- With an event $$E$$ and its complement $$\bar{E}$$, we have:
  $$
  P(F) = P(F \mid E)P(E) + P(F \mid \bar{E})P(\bar{E}).
$$
- More generally, if $$\{E_i\}$$ is a collection of events that are:
  - **Mutually exclusive** (no overlaps), and  
  - **Collectively exhaustive** (their union is the whole sample space),  
  then:
  $$
  P(F) = \sum_i P(F \mid E_i) P(E_i).
$$

Interpretation: to get the overall probability of $$F$$, you:

- Break the world into disjoint “cases” $$E_i$$.  
- Compute the probability of $$F$$ within each case: $$P(F \mid E_i)$$.  
- Weight each case by how likely that case is: $$P(E_i)$$, and then sum.

---

## 4. Probabilistic independence

Two events $$E$$ and $$F$$ are **independent** if knowing that one happened does not change the probability of the other. E and F are independent if: 
   1. $$P(E\mid F)=P(E)$$
   2. $$P(F\mid E)=P(F)$$
   3. $$P(E\cap F)=P(E)P(F)$$

The intuition is simple: if two experiments do not influence each other, then information about one gives no extra information about the other. That is why consecutive coin flips, consecutive dice rolls, or simultaneous experiments run by different teams are standard examples of independence.

A quick example: let $$E$$ be “the first coin toss is heads” and $$F$$ be “the second coin toss is heads.” Then $$P(E)=1/2$$, $$P(F)=1/2$$, and $$P(E\cap F)=1/4=(1/2)(1/2)$$, so the events are independent. 

## 4.1. Conditional probabilistic independence

Conditional probabilistic independence means that $$E$$ and $$F$$ become independent **once we know** a third event $$G$$. E and F are independent given that G if:
   1. $$P(E\mid F,G)=P(E\mid G)$$
   2. $$P(F\mid E,G)=P(F\mid G)$$
   3. $$P(E\cap F\mid G)=P(E\mid G)P(F\mid G)$$.

This means $$G$$ contains the relevant background information, so after conditioning on $$G$$, learning $$F$$ gives no additional information about $$E$$. In probabilistic modeling, this idea is extremely important because it lets us simplify complicated joint distributions into smaller pieces. 

For example, let $$G$$ be “both dice are odd,” $$E$$ be “first die is 1,” and $$F$$ be “second die is 1.” Given $$G$$, each die can only be $$1,3,5$$, so $$P(E\mid G)=1/3$$, $$P(F\mid G)=1/3$$, and $$P(E\cap F\mid G)=1/9=(1/3)(1/3)$$, which shows conditional independence. 

## 5. Bayes' theorem

Bayes’ theorem is a rule for **reversing** conditional probabilities, meaning it lets us go from $$P(F\mid E)$$ to $$P(E\mid F)$$. In its simple form it will be:
   $$P(E\mid F)=\frac{P(F\mid E)P(E)}{P(F)}$$, 
We can rewrite $$P(F)$$ using the law of total probability as 
   $$P(F\mid E)P(E)+P(F\mid \bar E)P(\bar E)$$. 

More generally, if $$E_1,E_2,\dots$$ form a partition of the sample space, then Bayes’ theorem becomes
$$
P(E_i\mid F)=\frac{P(F\mid E_i)P(E_i)}{\sum_j P(F\mid E_j)P(E_j)}.
$$
This is one of the most important rules in statistics and AI because it updates prior beliefs after new evidence is observed. 

A simple interpretation is:
- $$P(E)$$: prior belief about $$E$$
- $$P(F\mid E)$$: likelihood of seeing evidence $$F$$ if $$E$$ is true
- $$P(F)$$: total probability of the evidence
- $$P(E\mid F)$$: updated belief after observing $$F$$. 

## 6. Random variable

A random variable $$X$$ is a function from the sample space $$\Omega$$ to the real numbers $$\mathbb{R}$$, written $$X:\Omega\to\mathbb{R}$$. Instead of working directly with outcomes $$\omega\in\Omega$$, we often work with the numerical value $$X(\omega)$$, which is easier to analyze statistically. 

For example, where $$S$$ is the sum of the roll of two six-sided dice. In that case, the outcome space consists of ordered pairs like $$(1,4)$$ or $$(6,6)$$, while the random variable maps them to numbers like $$5$$ or $$12$$.

A random variable induces probabilities such as $$P(X=x)$$ or $$P(X\in A)$$. For example, if $$S$$ is the sum of two fair dice, then $$P(S\text{ is even})$$ is the probability that both dice have the same parity, which equals $$18/36=1/2$$.

### 6.1. Summaries of a random variable: 

- **Expectation** $$E[X]$$: the average or center of the distribution; for discrete values, $$E[X]=\sum_x xP(X=x)$$, and for continuous values, $$E[X]=\int_{-\infty}^{+\infty} x\,p(x)\,dx$$. 
- **Variance** $$V[X]$$: the spread around the mean; $$V[X]=E[(X-E[X])^2]=E[X^2]-E[X]^2$$. 
- **Standard deviation** $$\sigma_X$$: the square root of the variance, which puts spread back into the original unit of measurement.

### 6.2. Multiple random variables

When there is more than one random variable, we care about how they behave **together**, not just one at a time. The joint probability $$P(X_1, X_2, \dots, X_n)$$ describes the probability of specific values occurring simultaneously, such as $$P(X_1=x_1, X_2=x_2, \dots, X_n=x_n)$$.

A good example is rolling two dice. If $$X$$ is the first die and $$Y$$ is the second die, then $$P(X=2, Y=5)$$ is the joint probability that the first die is 2 and the second die is 5, which equals $$1/36$$ for fair dice. 

Marginal probability means focusing on only part of the system and ignoring the rest. For discrete variables, you get a marginal by summing the joint probability over the variables you do not care about, such as 
$$
P(X=x)=\sum_y P(X=x,Y=y).
$$

Conditional probability between random variables means asking about one variable after fixing information about another. For example, 
$$
P(X=x\mid Y=y)=\frac{P(X=x,Y=y)}{P(Y=y)}
$$
when $$P(Y=y)>0$$, so it tells you how the distribution of $$X$$ changes once $$Y$$ is known.

## Independence of random variables

Two random variables $$X$$ and $$Y$$ are independent if knowing one gives no information about the other. Equivalent ways to express this are $$P(X\mid Y)=P(X)$$, $$P(Y\mid X)=P(Y)$$, and $$P(X,Y)=P(X)P(Y)$$.

The most useful form is the product rule:
$$
P(X,Y)=P(X)P(Y).
$$
It means the joint distribution factors into two separate pieces, one for $$X$$ and one for $$Y$$.

For two fair dice, the result of the first die does not affect the second, so the variables are independent. That is why $$P(X=2,Y=5)=P(X=2)P(Y=5)=(1/6)(1/6)=1/36$$.

### 6.3. Conditional independence

Conditional independence is subtler. $$X$$ and $$Y$$ may not be independent in general, but they can become independent once a third variable $$Z$$ is known. 

This is written as
$$
P(X,Y\mid Z)=P(X\mid Z)P(Y\mid Z),
$$
and equivalently as $$P(X\mid Y,Z)=P(X\mid Z)$$ or $$P(Y\mid X,Z)=P(Y\mid Z)$$. The idea is that once $$Z$$ is fixed, $$Y$$ no longer adds extra information about $$X$$. 

This concept is central in probabilistic modeling because it lets us simplify large joint distributions into smaller conditional pieces, which is especially important in models for reasoning under uncertainty such as Bayesian networks covered in this course.

Here is a clear explanation in the exact order you want.

## 7. Aleatoric vs Epistemic Uncertainty

Aleatoric uncertainty is uncertainty coming from real randomness in the world. A standard example is the roll of a fair die: even if you know everything about the setup at the modeling level, the outcome is still treated as random. 

Epistemic uncertainty comes from incomplete knowledge rather than inherent randomness. For example, if a die has already been rolled but the result is hidden, the uncertainty is about what we do not know, not about a future random event. 
Probability distributions are often used to model both types. For aleatoric uncertainty, they model variability in outcomes, while for epistemic uncertainty, they model uncertainty in our beliefs or information.

### 7.1. Potential issue for epistemic uncertainty

Suppose $$X$$ is a random variable taking values in $$[0,1]$$, and we say we know nothing about it. A natural first thought might be to choose a uniform distribution on $$[0,1]$$, because it seems to represent complete ignorance.
The problem is that this “ignorance” depends on how we describe the variable. If we now look at $$X^2$$, that quantity is also unknown, but $$X$$ being uniform does not make $$X^2$$ uniform, so the same state of ignorance leads to different-looking distributions under different parameterizations.

This shows a deeper issue: using one ordinary probability distribution to represent total lack of knowledge can be problematic. In other words, epistemic uncertainty is harder to encode cleanly because “I know nothing about $$X$$” may not stay consistent after transforming $$X$$.

## 8. Probability and frequency

The law of large numbers says that if we take many independent samples, the sample average converges to the expected value, when that expectation exists. This connects theoretical probability with what we actually observe in repeated experiments. 

A practical consequence is that in an i.i.d. setting, observed frequencies tend to approach true probabilities. Here i.i.d. means independent and identically distributed, so each trial follows the same distribution and does not affect the others. 

For a fair coin, the probability of heads is $$1/2$$ and the probability of tails is $$1/2$$. If we flip the coin many times, the observed fraction of heads should get closer and closer to $$1/2$$, even though short runs can still look uneven. 
This also helps explain the difference between physical randomness and limited information. If the coin has already been flipped but you have not seen the outcome yet, the uncertainty is about your knowledge, even though probability may still be used to describe it. 

## Conclusion

Probability is a fundamental tool for modeling uncertain situations. It gives us a probability space, rules for combining events, ways to define random variables, and methods for updating beliefs from evidence. 


















