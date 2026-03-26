---
layout: post
title: "Overview of Basic Python Packages for Modeling"
subtitle: "Python packages: numpy, matplotlib, and scikit-learn."
date: 2026-03-26
tags: [100 days of bioinformatics, python]
---

These are my lab notes of Lab 2 from the course *STATS 202: Modeling and Predicting*. We will cover basic functions and tools provided by the following three packages:
> **numpy** for numerical computations
> **matplotlib** for graphing
> **scikit-learn** to generate plots, which is apparently a popular package for machine learning and data science.

---
# Getting ready

Just in case, check whether you have the packages or not and download them if necessary.

```python
import numpy
import matplotlib
import sklearn
```

If haven't already installed paste the following in your terminal:

```bash
pip install numpy scikit-learn matplotlib
```

# numpy

As mentioned, `numpy` is used for numerical computations. The object to be manipulated will be called `ndarray` or `array`, that can be vectors, matrices, or higher-dimensional arrays.
Moving on to the useful stuff :D :

1. To create an array
```python
a = np.array([2,1,3,4,6,3,1])
m = np.array([2,1,4,2],[5,2,4,5])
np.zeros(2)
np.ones((3,3))
b = np.array(4)
np.arrange(2,9,2)
np.linspace(0,10,num=5)
```




---
