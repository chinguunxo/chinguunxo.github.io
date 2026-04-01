---
layout: post
title: "100 days of Bioinformatics: Day 8 - Cleaning and Parsing Sequence Data"
subtitle: "Step one of making sense from randomness."
date: 2026-04-01
tags: [100 days of bioinformatics]
---

## `re` is a built-in Python module used for regular expressions.

re = **"regular expression"**
It lets you search, match, and manipulate text patterns. Think of it as a powerful text-cleaning and pattern-finding tool, which is why it’s super common in:

- Bioinformatics (cleaning sequences)
- Data processing
- Log/file parsing

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
