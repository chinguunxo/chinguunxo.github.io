---
layout: post
title: "100 days of Bioinformatics: Day 8 - Cleaning and Parsing Sequence Data"
subtitle: "Step one of making sense from randomness."
date: 2026-04-01
tags: [100 days of bioinformatics]
---



```python

import re

with open("input.txt") as f:
    text = f.read()

# Remove numbers at line start
text = re.sub(r'^\s*\d+\s+', '', text, flags=re.MULTILINE)

# Remove all whitespace
sequence = re.sub(r'\s+', '', text)

print(sequence)
```
