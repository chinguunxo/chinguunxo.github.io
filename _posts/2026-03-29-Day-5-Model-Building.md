---
layout: post
title: "100 days of Bioinformatics: Day 5 - Model building"
subtitle: "What are models and how to build them?"
date: 2026-03-28
tags: [100 days of bioinformatics]
---

> *"All models are wrong, but some are useful."*
> — George E.P. Box

> *"The map is not the territory."*
> — Alfred Korzybski

---

## Table of Contents

1. [Why Do We Use Models?](#why-do-we-use-models)
2. [Types of Models](#types-of-models)
3. [What Can Models Be Used For?](#what-can-models-be-used-for)
4. [How to Construct a Model?](#how-to-construct-a-model)
5. [Conclusion](#conclusion)

---

## Why Do We Use Models?

Imagine you want to understand a real-world phenomenon — maybe house prices, unemployment rates, online shopping behavior, or geographic segregation. You have a question, and you need a way to answer it.

Reality is complex, messy, multi-faceted, and only partially observable. A **model** is your way of cutting through that complexity.

> **A model ≈ an abstraction of reality.**

A good model:
- Simplifies reality into something workable
- Captures only the factors that matter for your specific problem
- May address just *one* aspect of a larger phenomenon (e.g., segregation can be legal, economic, historical, or voluntary — a single model may only capture one of these)
- Distinguishes between **first-order effects** (the main drivers) and **higher-order effects** (secondary ripples)

### Models Are Everywhere

Scientific progress across virtually every field is built on models:

| Field | Example Model |
|---|---|
| Physics | Newton's second law: *F = ma* |
| Neuroscience | The perceptron — a simple model of a neuron |
| Economics | Growth models of how countries develop |

Models are not just abstract math — they are **tools for thinking**.

### A Word of Caution

Because models are simplifications, they will always be imperfect. This is not a reason to distrust them — it's a reason to be thoughtful:

- Economic models often assume perfectly rational agents. Real people aren't.
- A map helps you navigate, but it is not the actual road.

**Always interrogate the assumptions behind a model before trusting its predictions.**

---

## Types of Models

Models can be categorized along several dimensions. These are not mutually exclusive — a single model can belong to multiple types.

### 1. Linear vs. Non-Linear

**Linear models** combine factors in a weighted sum. Classic example — predicting house price:

```
Price = c₀ + c₁·area + c₂·bathrooms + c₃·stories + c₄·aircon + c₅·pref_area
```

Each coefficient `cᵢ` controls how much that factor contributes to the price.

**Non-linear models** capture more complex relationships — where a doubling of one input does *not* produce a doubling of the output.

*Ask yourself: does each factor have a monotonic, linear effect on the outcome? If not, a linear model will underfit.*

---

### 2. Causal vs. Non-Causal

**Causal models** use only factors that genuinely *cause* the outcome. This is harder than it sounds, because:

- **Correlation ≠ causation** — two variables can move together without one causing the other.
- **Granger causality** is one formal definition: one variable "Granger-causes" another if it helps predict the other's future values.
- **Causal diagrams** can map out the direction of influence between variables.

*Example: Does the unemployment rate rise because GDP falls, or do both respond to a third hidden cause? That distinction matters enormously for policy.*

---

### 3. Parametric vs. Non-Parametric

- **Parametric models** are defined by a fixed set of parameters (e.g., the coefficients `cᵢ` in linear regression). They are compact and interpretable but may be too rigid.
- **Non-parametric models** do not assume a fixed functional form. They are more flexible but require more data and can be harder to interpret.

---

### 4. Generative vs. Non-Generative

- **Generative models** can *sample new data points* from the distribution they've learned. For example, a probabilistic model of online shoppers can simulate new users arriving and clicking on products.
- **Non-generative models** (like most linear models) only predict outcomes for given inputs — they can't generate synthetic examples.

*Generative models are the foundation of modern AI tools like diffusion models and large language models.*

---

### 5. Agent-Based vs. Non-Agent-Based

**Agent-based models** take a bottom-up approach:

1. Identify the basic components of the system (the **agents**)
2. Define their individual behavior (often rule-based)
3. Simulate their interactions
4. Observe what **emergent** patterns arise

A famous example is **Schelling's model of segregation**: even when each individual agent only mildly prefers neighbors similar to themselves, the collective outcome is dramatic geographic segregation — a counterintuitive result impossible to see without the model.

---

## What Can Models Be Used For?

Different fields emphasize different uses. Here's a synthesis across statistics, data analytics, and general modeling.

---

### The REDCAPE Framework (Scott E. Page, *The Model Thinker*)

| Letter | Purpose | Description |
|---|---|---|
| **R** | **Reason** | Identify conditions and deduce logical implications |
| **E** | **Explain** | Provide testable explanations for observed phenomena |
| **D** | **Design** | Choose features of institutions, policies, and rules |
| **C** | **Communicate** | Formalize knowledge for precise, reproducible discussion |
| **A** | **Act** | Guide policy choices and strategic decisions |
| **P** | **Predict** | Forecast future or unknown values |
| **E** | **Explore** | Investigate possibilities and hypotheticals |

These uses are not mutually exclusive.

---

### Reason

Models help us discover non-obvious logical consequences of our assumptions.

Two classic examples:

- **Simpson's Paradox** — A trend that holds within every subgroup can *disappear or reverse* when the groups are combined. The classic medical example: Treatment A outperforms Treatment B for both small and large kidney stones, yet Treatment B looks better in the overall combined data. Without a model, this is invisible.

- **Braess's Paradox** — Adding a new road to a traffic network can actually *slow down* overall traffic. This is because individual drivers, each optimizing for themselves, collectively worsen outcomes for everyone. Only a model reveals this.

---

### Explain

Models don't just describe — they provide *mechanistic* explanations.

- Physics models explain *why* objects fall at the rate they do and trace the shape of a trajectory.
- Epidemiological models explain *why* disease spread follows an S-shaped curve.
- Economic models explain *why* prices adjust after a supply shock.

**Prediction ≠ Explanation.** This is critical:

> Deep learning models can predict extremely well but provide almost no explanation. Plate tectonic models beautifully *explain* earthquakes but cannot reliably *predict* when one will occur.

The shape of diffusion — whether ideas, diseases, or technologies — typically follows an **S-curve**:
- Slow initial adoption (innovators)
- Rapid growth (early majority)
- Plateau (late majority and laggards)

Understanding this shape is itself valuable, independent of any specific prediction.

---

### Design

Models are essential tools for evaluating design choices *before* committing to them in the real world:

- **Computer scientists** use network models to design reliable communication protocols
- **Social scientists** use economic models to design fair institutions and incentive structures
- **Logistics engineers** use supply chain models to minimize costs and delays

The model lets you ask "what if?" without the cost of a real-world experiment.

---

### Communicate

Formal models force precise definitions. That precision enables:

- **Reproducibility** — other researchers can replicate your findings
- **Debate** — disagreements can be pinpointed and resolved
- **Accumulation** — knowledge builds because everyone is working with the same concepts

For example, studying political ideology requires an agreed model of "liberalness" before any meaningful comparison across studies is possible.

---

### Act

Models help translate analysis into decisions under uncertainty:

- Should a company raise or lower its prices?
- Should a government enforce a lockdown during a pandemic?
- Should an autonomous vehicle brake or swerve?
- Should a central bank bail out a failing financial institution?

In each case, a model structures the tradeoffs and makes the decision process more transparent and defensible.

---

### Predict

Prediction is often the most visible use of models:

- Weather forecasting
- Predictive policing (with all its ethical complications)
- Flu strain forecasting
- Recommendation systems

**Key insight:** A model optimized for prediction may not be the same as one optimized for explanation. They serve different goals and should be evaluated differently.

---

### Explore

Models let you run thought experiments that reality won't permit:

- *What if all city buses were free?*
- *What if students chose which assignments determined their grade?*
- *What if all economic agents were perfectly rational?*
- *What if residents moved based on a simple preference rule?*

This exploratory use is especially powerful in early-stage research and policy design, where you want to stress-test assumptions before committing resources.

---

## How to Construct a Model?

Building a good model is an iterative, judgment-heavy process. Here are the key questions to work through:

### Step 1 — Define the purpose
What is this model for? Use the REDCAPE framework. A model built to *explain* a phenomenon may look very different from one built to *predict* it.

### Step 2 — Identify important factors
- What variables drive the outcome you care about?
- Are those factors *causal* or merely correlated?
- Apply **Occam's razor**: among models of equal performance, prefer the simpler one. Complexity that doesn't improve fit is a liability.
- Use domain knowledge, prior research, and data exploration to guide selection.

### Step 3 — Specify how factors interact
- Are the factors **independent** of each other, or do they interact?
- Are interactions **synergistic** (positive) or **antagonistic** (negative)?
- Is the relationship **linear** or **non-linear**?

### Step 4 — Specify or estimate parameters
- If data is available, use it. This is the *estimation* or *training* step.
- If data is scarce, expert judgment may be necessary — but document your assumptions carefully.
- Always ask: how sensitive is the model to changes in its parameters? A model that breaks if one number shifts slightly is fragile.

---

## Conclusion

| Topic | Key Takeaway |
|---|---|
| **What is a model?** | A simplified, formal abstraction of reality built to answer a specific question |
| **Why use one?** | Reality is too complex to reason about directly; models extract the essential structure |
| **Model types** | Linear/non-linear, causal/non-causal, parametric/non-parametric, generative, agent-based — not mutually exclusive |
| **What for?** | REDCAPE: Reason, Explain, Design, Communicate, Act, Predict, Explore |
| **How to build one?** | Define purpose → select factors → specify interactions → estimate parameters |

The most important habit to develop is **critical awareness of your model's assumptions**. Every model is wrong somewhere. The goal is to be wrong in ways that don't matter for your specific question.

---

*Notes from STATS 202: Modeling and Predicting — Spring 2026, Duke Kunshan University.*
*Lecture by Paul Weng. Based on course slides and Scott E. Page's* The Model Thinker.
