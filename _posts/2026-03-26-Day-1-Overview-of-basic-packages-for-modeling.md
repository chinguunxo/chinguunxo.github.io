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
### Getting ready

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

# numpy

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
# matplotlib
### Plot with matplotlib (not named matlibplot, unfortunately)

Offers powerful tools for creating plots in Python.

```python
import matplotlib as mpl
import matplotlib.pyplot as plt # submodule pyplot
```

With it simple to complex plots can be created. Use the following codes on your code editor:

- When plotting you specify how the plots are drawn using three different formatting character, as 'xyz':
1. To specify how the points appear, x: ’o’, ’*’, ’.’,’+’, ’x’, ...
2. To specify the appearance of lines, y:  ’-’, ’:’, ’–’, ’-.’
3. To set the color, y: ’r’, ’g’, ’b’, ’c’, ’m’, ’y’, ’k’,...

You can set the size of the points and lines too.

```python
x = [1, 2, 3, 4]
y = [1, 4, 2, 3]
plt.plot(x, y, '+:g')
print(plt.show())
```
- Multiple plots can be drawn on the same figure. Also to add labels, legend and titles:

```python
x = [1, 2, 3, 4]
y = [1, 4, 2, 3]
y2 = [0, 5, 1, 4]
plt.plot(x, y, 'o-r', label='First experiments')
plt.plot(x, y2, 'x-.b', label='Second experiments')
plt.title("My beautiful plot")
plt.xlabel("x-axis label")
plt.ylabel("y-axis-label")
plt.legend()
plt.show()
```

> The package matplotlib provides many ways to further customize a plot (e.g., choice of fonts, positions of labels or legends,...). In addition, it can also draw many other types of plots (3D plots, scatter plots, bars, histograms, pie charts...). You can check the documentation for more details. - The lab manual! 

# scikit-learn

It is used for machine learning and in this lesson it will mainly focus on linear models. As always start with import: 

```python
from sklearn import linear_model as lm
```

You can train your model in three *simple* steps:
1. On a array dataset with x and y, the dimensions of x would be N x d where N is the number of points and d is the number of features. The dimension of y would be N x 1.
2. The model can be created using `lm.LinearRegression()`
3. Train the model using the method `fit` of your linear model.

```python
# 1. create the dataset
x = [[0,0],[1,1],[2,2]]
y = [0,1,2]
# 2. Creating a linear model
reg = lm.LinearRegression()
print(reg)
# 3. Train the model!
reg.fit(x,y)
```
You can check the parameters of your trained models using the following

```python
reg.coef_
reg.intercept_
```
> You can also predict on a set nX of new points using reg.predict(nX) where nX is of dimension N′ × d with N ′representing the number of new points. - Again, the lab manual.
