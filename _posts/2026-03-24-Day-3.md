---
layout: post
title: "100 days of Bioinformatics: Day 3 - Sequence Alignments"
subtitle: "Basics, past and future"
date: 2026-03-24
tags: [100 days of bioinformatics]
---

Sequencing technologies overview:
  1. Frist generation / Sanger sequencing
  2. Second generation / Next Generation Sequencing (NGS): Illumina being the market leader
  3. Thirds generation - the signle molecule sequencing: Oxford Nanopore and PacBio SMRT are the leaders
We will focus on the data from second generation sequencing.

---

## FASTQ and FASTQC

FASTQ is the file format that NGSs generates, While FASTQC is an computational approach for quality evaluation of your generated data.

Each sequence will contain:

```
sequence ID
sequence
quality ID
quality score # uses ASCII codes of +33 symbols,
              # eg.[worst] some symbols - numbers - capital letters - lowercase letters [best]
```
Phred quality scores quantify sequencing accuracy and are defined as:

$$Q = -10 \log_{10} P(\text{error})$$

where $P(\text{error})$ is the probability that a base is incorrectly called.

### Low quality score? What to do? - Quality Control Considerations for Sequencing Data

When evaluating sequencing data, it is important to first determine whether the data comes from **single-end** or **paired-end** reads, as this can influence downstream analysis and quality assessment.

Sequencing quality is not uniform across reads. In many platforms, **base quality tends to decrease toward the ends of reads** (especially the 3′ end), meaning later bases are often less reliable than earlier ones. A good quality read will be consistent and high-quality along the read and it will be higher than 30. Poor quality reads will have high variance and quality will drastically decrease in length.

Poor quality can indicate issues with **sample preparation**, and re-preparing or re-sequencing the sample may be necessary.

Quality control of the massive FASTQ files can be done by FASTQC [https://www.bioinformatics.babraham.ac.uk/projects/fastqc/]. FastQC provides summaries of:
- Per-base sequence quality
- GC content - Mean mean GC content should be within the expectation at around 45%. 
- Sequence duplication levels
- Adapter contamination

These metrics help identify potential problems before proceeding to downstream analysis.

## (The Incredibly Slow) Early Sequence Alignment Methods (1 with 1)

Alignment methods can be divided into two types:

---

## Sequence Alignment — Quick Reference Notes

Here’s a clean, **Jekyll-compatible Markdown file** (simple formatting, no LaTeX that might break rendering, and clear explanations).

You can copy this directly into a `.md` file (e.g., `sequence-alignment.md`) in your GitHub Pages site.

---

## Sequence Alignment — Intuitive Guide

### 🧠 Big Picture

We are trying to **compare biological sequences (DNA/proteins)**.

There are two main approaches:

1. **Dynamic Programming (Exact but slower)**
   - Needleman-Wunsch → global alignment
   - Smith-Waterman → local alignment

2. **Indexing (Fast for large genomes)**
   - Suffix arrays
   - Burrows-Wheeler Transform (BWT)

---

# 1. Needleman–Wunsch (Global Alignment)

## 💡 Idea

Align **entire sequences from start to end**, allowing:
- matches (+1)
- mismatches (−1)
- gaps (−2)

---

## 🧱 Step 1: Create a grid

Example:

```

X = ACTG
Y = ATG

```

Build a table:

```

```
  -   A   T   G
```

---

* |  0
  A |
  C |
  T |
  G |

```

---

## 🧱 Step 2: Initialize

Why?

Because aligning with "nothing" = gaps.

```

F(i,0) = i * gap
F(0,j) = j * gap

```

Example (gap = -2):

```

```
  -   A   T   G
```

---

* |  0  -2  -4  -6
  A | -2
  C | -4
  T | -6
  G | -8

```

---

## 🧱 Step 3: Fill the table

At each cell, you ask:

> “What is the BEST way to reach here?”

Three choices:

1. Diagonal → match/mismatch
2. Up → gap in Y
3. Left → gap in X

```

F(i,j) = max(
diagonal + match/mismatch,
up + gap,
left + gap
)

```

---

## 🧠 Logic (IMPORTANT)

Each cell = **best score up to that point**

You are building the solution **piece by piece**.

---

## 🔙 Step 4: Traceback

Start from **bottom-right**.

Follow the path that gave the best score:
- diagonal → align letters
- up → gap in Y
- left → gap in X

---

## ⏱ Time Complexity

```

O(mn)

```

---

# 2. Smith–Waterman (Local Alignment)

## 💡 Idea

Find the **best matching region**, not full alignment.

---

## 🔥 Key Difference

You can **restart alignment anywhere**.

---

## 🧱 Initialization

Everything starts at 0:

```

F(i,0) = 0
F(0,j) = 0

```

---

## 🧱 Recurrence

```

F(i,j) = max(
0,
diagonal + match/mismatch,
up + gap,
left + gap
)

```

---

## 🧠 Why include 0?

If scores go negative:

👉 “This alignment is bad → start fresh”

---

## 🔙 Traceback

- Start from **highest value in table**
- Stop when you hit **0**

---

## 🧠 Intuition

Needleman-Wunsch = force full alignment  
Smith-Waterman = find best matching chunk

---

# 3. Why DP is Slow

Dynamic programming:

```

O(mn)

```

Too slow for:
- millions of reads
- whole genome

---

# 4. Seed-and-Extend Strategy

## 💡 Idea

Instead of aligning everything:

1. Find small exact matches (**seeds**)
2. Only align around those regions

---

## 🧠 Analogy

Like searching a book:
- Don’t read everything
- Search keywords → zoom in

---

# 5. Suffix Array

## 💡 Idea

Store all suffixes in sorted order.

Example:

```

T = banana$

```

Suffixes:

```

banana$
anana$
nana$
ana$
na$
a$
$

```

Sorted:

```

$
a$
ana$
anana$
banana$
na$
nana$

```

Suffix array:

```

[6, 5, 3, 1, 0, 4, 2]

```

---

## 🔍 Searching

Use **binary search** on sorted suffixes.

Time:

```

O(|P| log n)

```

---

# 6. Burrows-Wheeler Transform (BWT)

## 💡 Idea

Rearrange string to make it easier to search/compress.

---

## 🧱 Steps

1. Add `$`
2. Generate all rotations
3. Sort them
4. Take last column

---

## Example

```

banana$ → BWT = annb$aa

```

---

## 🧠 Key Insight

Similar letters group together → efficient searching

---

# 7. LF Mapping (Core Trick)

## 💡 Idea

Connect:
- Last column (BWT)
- First column (sorted)

---

## Rule

> The k-th occurrence of a letter in Last = k-th in First

---

## Formula

```

LF(i) = C(c) + Occ(c, i)

```

Where:
- C(c) = number of letters smaller than c
- Occ(c, i) = how many times c appears up to i

---

## 🧠 Intuition

Lets you move **backward in the original string** without reconstructing it.

---

# 8. BWT Search (FM-Index)

## 💡 Idea

Search pattern **backwards**

---

## Algorithm

```

top = 0
bot = len(BWT)

for each character in pattern (right → left):
update top and bot

if top >= bot:
no match

```

---

## 🧠 Why it’s fast

```

O(|P|)

```

Independent of genome size 🚀

---

# 9. File Formats

## SAM

Text format storing alignments.

Important fields:
- QNAME → read name
- POS → position
- CIGAR → alignment description
- SEQ → sequence

---

## CIGAR Example

```

50M2D20M

```

Means:
- 50 matches
- 2 deletions
- 20 matches

---

## BAM

Binary compressed version of SAM.

---

## BED

Stores **regions only**, not full alignments.

---

# 🧠 Final Summary

| Method | Type | Use |
|------|------|-----|
| Needleman-Wunsch | Global DP | Full alignment |
| Smith-Waterman | Local DP | Best region |
| Suffix Array | Index | Fast search |
| BWT / FM-index | Index | Very fast search |
| Seed-and-Extend | Heuristic | Real-world tools |


