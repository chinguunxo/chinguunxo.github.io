---
layout: post
title: "100 days of Bioinformatics: Day 6 - Linear and Causal Models"
subtitle: "Why the Simplest Things Are Secretly Powerful"
date: 2026-03-29
tags: [100 days of bioinformatics]
---

$$Y = a_0 + a_1 X_1 + a_2 X_2 + \cdots + a_d X_d + \varepsilon$$

$Y$ is whatever you're trying to predict (grades, apartment prices, testosterone levels — yes, that example came up). The $X_i$'s are your explanatory variables, and the $a_i$'s are the **weights** that tell you *how strongly* each one matters. The $\varepsilon$ term is the noise — all the stuff your model doesn't capture. $a_0$ is the intercept, the baseline value of $Y$ when all the $X_i$'s are zero.

Graphically, with one explanatory variable you get a line in 2D. With two, you get a plane in 3D. Beyond that, it's a hyperplane living in a space you can't visualize — but the math stays exactly the same.

---

## The Assumptions (and Why They're Sneaky)

This was the part I found most useful to think carefully about. Linear models carry some real assumptions, and understanding them is half the battle.

### 1. All Variables Must Be Numeric

That sounds limiting until you remember that categorical variables can be handled. Ordinal variables (like clothing sizes XS, S, M, L, XL) can be mapped to integers — say $0, 1, 2, 3, 4$. Nominal variables (like pet type: cat, dog, turtle) get **one-hot encoded**: a Boolean vector where only one component is 1, and the rest are 0.

So "cat, dog, turtle" becomes:

$$\text{cat} = (1, 0, 0), \quad \text{dog} = (0, 1, 0), \quad \text{turtle} = (0, 0, 1)$$

Suddenly "numeric" isn't that restrictive after all.

### 2. Monotonicity

The model assumes $Y$ and $X_i$ vary monotonically together. If the weight $a_i > 0$, then increasing $X_i$ always increases $Y$. If $a_i < 0$, the opposite holds. If $a_i = 0$, that variable has no effect on $Y$ at all.

The testosterone-vs-age example from the lecture was a perfect counterexample: testosterone levels spike in early adulthood, plateau, and then decline across a person's lifetime. That's a distinctly non-monotonic curve — a linear model can't capture this cleanly without some help.

### 3. No Interaction Between Explanatory Variables

This one requires a bit of thought. The assumption says the strength of the relationship between $Y$ and $X_i$ **cannot depend on** $X_j$. In other words, the effect of one variable is fixed regardless of what the others are doing — no positive or negative synergistic effects.

A concrete example: suppose grades increase by 5 points per additional study hour for students who sleep 8 hours a night. This assumption says that same 5-point gain must hold for students who only sleep 4 hours. Intuitively, that seems unlikely.

The apartment price example made this even clearer. If price per square meter is RMB 10k/sqm for a two-bedroom apartment, the assumption says it's also RMB 10k/sqm for a five-bedroom apartment. In downtown Shanghai, that's clearly false — larger apartments in prime locations command a much higher premium per square meter.

### 4. Linear Independence of the $X_i$'s

The explanatory variables are assumed to be **linearly independent**, meaning no $X_j$ can be expressed as a linear combination of the others:

$$X_j \neq \sum_{i \neq j} c_i X_i \quad \text{for any constants } c_i$$

Why does this matter? Because if the variables are linearly dependent, there are infinitely many combinations of weights $a_i$ that produce the same predictions for $Y$. You lose the ability to interpret any individual weight meaningfully.

In practice, this is frequently violated. Apartment size, number of rooms, number of bedrooms, and number of bathrooms are obviously correlated — bigger apartments tend to have more of everything. This is called **multicollinearity**, and it causes identifiability problems when estimating the weights.

---

## The Twist: Feature Engineering

Here's where the lecture surprised me. All those assumptions sound constraining. But the saving move is distinguishing between **attributes** and **features**.

- An **attribute** is a raw value from your data — e.g., a patient's height and weight.
- A **feature** is a value *computed* from attributes — e.g., BMI, calculated as:

$$\text{BMI} = \frac{\text{weight (kg)}}{\text{height (m)}^2}$$

The idea is: instead of fitting a linear model directly on raw attributes, you first transform your data into a carefully chosen feature space. In that new space, the relationship between the target and the features might be linear — even if the relationship between the target and the original attributes is not.

This means **linear models are linear with respect to features, not necessarily with respect to raw attributes**.

### Common Feature Engineering Tricks

**Log transformation.** When a variable has a skewed distribution or a multiplicative relationship, taking $\log X_i$ can linearize it. Engel's Law is a good example here: food expenditure grows with income, but the *share* of income spent on food shrinks. A log transform on income can make this relationship fit a linear model much better.

**Polynomial features.** You can model non-linear relationships by adding polynomial terms:

- Degree 1: $X_i$ (standard linear)
- Degree 2: $X_i X_j$ (interaction between two variables)
- Degree 3: $X_i X_j X_k$ (interaction between three variables)

Notice that degree-2 terms also solve the interaction problem from the assumptions section. If we think downtown location interacts with apartment size, we can explicitly include that product as a feature. Going back to the Shanghai apartment example with $X_1, X_2$ as Boolean downtown/suburb indicators and $X_3$ as area in sqm:

$$Y = a_0 + a_{31} X_3 X_1 + a_{32} X_3 X_2 + \varepsilon$$

Here $a_{31}$ is the price per square meter downtown, and $a_{32}$ is the price per square meter in the suburbs. We'd expect $a_{31} > a_{32}$, which matches what the Shanghai data shows.

**Feature learning.** When domain knowledge isn't enough to craft good features by hand, you can learn them from data — this is essentially what neural networks and deep learning do.

---

## The Usual Pipeline

The lecture also walked through the standard ML workflow, which is worth keeping in mind as a map:

1. **Data acquisition** — collection, aggregation, consolidation
2. **Data preprocessing** — cleaning, imputing missing values, normalization
3. **Feature engineering** — construction and selection of features
4. **Model building, training, and selection** — training on a training set, tuning hyperparameters on a validation set, evaluating on a test set (and using cross-validation)
5. **Model deployment** — profit!

Feature engineering sits right in the middle of this pipeline, and it's often where domain knowledge makes the biggest difference.

---

## Why Bother With Linear Models at All?

Given how many assumptions they make, why are linear models still so widely used? A few reasons:

- **Simplicity.** They're easy to implement, fast to train, and their predictions are easy to compute.
- **Interpretability.** Each weight $a_i$ tells you directly how much $Y$ changes per unit increase in $X_i$, holding everything else constant. That's enormously useful for understanding a phenomenon, not just predicting it.
- **Approximation power.** Over a limited range of values, many real-world relationships are approximately linear. You don't need the model to be globally true — just locally useful.
- **Extensibility.** Through feature engineering and generalized linear models, they can be stretched to handle a wide variety of non-linear, non-Gaussian situations.

---

## The Limits of Linear Models: Causation

Here's the thing the sleep vs GPA scatterplot from last time doesn't tell you: whether sleeping more actually *causes* better grades, or whether both are downstream of some third variable — say, being a generally organized person.

This is the core problem. Linear models fitted on observational data only give you **correlation**. The weights $a_i$ tell you how strongly $X_i$ and $Y$ move together, not whether intervening on $X_i$ would actually change $Y$.

---

## Causality

The lecture drew a distinction between two notions that often get conflated:

**Granger causality** — if knowing the past values of $X$ improves your prediction of $Y$ beyond what $Y$'s own history tells you, then $X$ Granger-causes $Y$. It's a statistical definition, easy to test, and works well with time series data. But it's fundamentally about predictive power, not mechanism.

**Causation** — changing $X$ actually changes $Y$. This is harder to establish. You either need a controlled experiment (an RCT, an A/B test) or a solid theoretical argument. Granger causality does not imply causation.

The correlation formula everyone knows:

$$\rho(X, Y) = \frac{\mathbb{E}[(X - \mathbb{E}[X])(Y - \mathbb{E}[Y])]}{\sigma_X \sigma_Y}$$

gives a number between $-1$ and $1$. A value near $\pm 1$ means the variables move together tightly. A value near $0$ means they don't — but crucially, $\rho = 0$ doesn't rule out a non-linear relationship (the scatter plot examples from the lecture made this clear). And $\rho \neq 0$ tells you nothing about *why* they move together.

In practice, estimated from $n$ observations $(x_1, y_1), \ldots, (x_n, y_n)$:

$$\hat{\rho}(X, Y) = \frac{\frac{1}{n}\sum_{i=1}^{n}(x_i - \hat{x})(y_i - \hat{y})}{\hat{\sigma}_X \hat{\sigma}_Y}$$

where $\hat{x} = \frac{x_1 + \cdots + x_n}{n}$ and $\hat{\sigma}_X^2 = \frac{\sum_{i=1}^n (x_i - \hat{x})^2}{n}$.

---

## Confounders and Spurious Correlations

The standard examples of correlation-without-causation are almost too absurd to be useful — ice cream sales and drowning rates, Nicolas Cage films and pool drownings. But the lecture gave better ones:

- Higher vitamin D levels predict better health outcomes. Should you take supplements? Maybe the real driver is that healthy, active people spend more time outdoors.
- Schools that give tablets to students have higher achievement. Should all schools issue tablets? Maybe wealthier schools both buy tablets *and* attract better-resourced students.

In both cases, a **confounder** — a third variable that causally influences both $X$ and $Y$ — produces the observed correlation without there being any direct causal link between them:

```
Confounder
   ↙       ↘
Exposure  →?→  Outcome
```

The arrow between Exposure and Outcome doesn't exist, but because both are caused by the Confounder, they appear correlated in the data.

The confounder problem cuts both ways. A confounder can also *mask* a real relationship, making two genuinely causally linked variables appear independent in aggregate data. This is the mechanism behind **Simpson's paradox** — a trend that holds within every subgroup can reverse or disappear when the groups are combined, because the grouping variable (the confounder) was left uncontrolled.

---

## Causal Models

A **causal model** is structurally identical to a linear model — same equation, same weights:

$$Y = a_0 + a_1 X_1 + a_2 X_2 + \cdots + a_d X_d + \varepsilon$$

The difference is in the claim being made. In a causal model, the $X_i$'s are assumed to have a genuine causal relationship with $Y$, not merely a correlational one. That assumption has to come from somewhere — domain knowledge, theory, prior experiments — it can't be read off the data alone.

Establishing causality empirically requires **interventional data**: you actually manipulate $X_i$ (in an RCT, for example) and observe what happens to $Y$, rather than passively watching both vary together. Observational data, no matter how much of it you have, can't close this gap on its own.

---

## Linear Models vs Causal Models: What Each Is Good For

| | Linear Model (observational) | Causal Model |
|---|---|---|
| **Data required** | Observational | Interventional preferred |
| **What weights mean** | Correlation strength | Causal effect size |
| **Good for** | Prediction | Explanation, decision-making |
| **Handles confounders?** | No | Yes, if modeled |
| **Source of variable selection** | Statistical fit | Theory / prior knowledge |

The key tradeoff: for pure prediction, a non-causal variable that is strongly correlated with $Y$ can be just as useful — or more useful — than a causal one. Predicting a student's math grade from their physics grade works fine even though physics performance doesn't *cause* math performance; both are proxies for the same underlying aptitude. Predicting a store's sales from neighboring stores' sales is similarly valid for forecasting, even though there's no direct causal link.

But if you want to *intervene* — if the question is "what should we change to get a different outcome?" — a purely correlational model will mislead you. Policy decisions, clinical interventions, business strategy: these all require causal reasoning. Giving every school tablets won't necessarily improve outcomes if the actual driver was school funding all along.

The practical upshot is that model choice depends on what you're trying to do. Prediction and explanation are different goals, and conflating them is where most "correlation vs causation" mistakes in the wild actually come from.
