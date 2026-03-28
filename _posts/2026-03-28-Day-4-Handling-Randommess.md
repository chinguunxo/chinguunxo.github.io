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

## In the course context

- Your syllabus refers to a “family of probability distributions” and “probability notions,” assuming you know basic definitions like assigning probabilities over outcomes that sum to 1. 
- When you “specify a model” in this class, very often that means choosing a particular probability distribution (for example, normal, binomial, Poisson) for the random variable you are studying. 

Do you want this in set-theoretic notation (sample space, events) or more in terms of random variables and common named distributions like normal/binomial?

---




