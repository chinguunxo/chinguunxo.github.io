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
## Getting ready

Just in case, check whether you have the packages or not and download them if necessary.

```python
import numpy as np
import matplotlib as mp
import sklearn as sk
```

If you haven't already installed, paste the following in your terminal:

```bash
pip install numpy scikit-learn matplotlib
```

## numpy

As mentioned, `numpy` is used for numerical computations. The object to be manipulated will be called `ndarray` or `array`, which can be vectors, matrices, or higher-dimensional arrays. I hope you don't get `sleepy`!
Moving on to the useful stuff :D :

1. To create an array

```python
a = np.array([2,1,3,4,6,3,1])
print(a)
m = np.array([[2,1,4,2],[5,2,4,5]])
print(m)
print(np.zeros(2))
print(np.ones((3,3)))
print(np.array(4))
print(np.arange(2,9,2))
print(np.linspace(0,10,num=5))
```
```
[2 1 3 4 4 6 3 1]
[[2 1 4 2]
 [5 2 4 5]]
[0. 0.]
[[1. 1. 1.]
 [1. 1. 1.]
 [1. 1. 1.]]
[0 1 2 3]
[2 4 6 8]
[ 0.   2.5  5.   7.5 10. ]
```


2. You can also set dimensions and size of your array:

```python
print(m.ndim)
print(m.size)
print(m.shape)
m2 = a.reshape(4,2)
print(m2)
```

```
2
8
(2, 4)
[[2 1]
 [4 2]
 [5 2]
 [4 5]]
```

3. Basic operations in numpy:

```python
print(np.sort(a))
# print(np.concatenate(a,b)) # different dimensions cannot be concatenated
np.concatenate((m,[b]), axis=0)
m3 = m2+ m.reshape(4,2)
print(m3)
print(np.dot(m,m2))
(1/m2.size) * np.sum(np.square(m2 - m3))
```


```
[1 1 2 3 3 4 4 6]
[[ 4  2]
 [ 8  4]
 [10  4]
 [ 8 10]]
[[36 22]
 [58 42]]
np.float64(11.875)
```

4. Indexing

```python
print(a[1])
print(a[0:3])
print(a[2:])
print(a[-2:])
print(a[a>=5])
print(m.reshape(m.size)[(a>3) & (a<6)])
```
```
1
[2 1 3]
[3 4 4 6 3 1]
[3 1]
[6]
[2 5]
```
---

