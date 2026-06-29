---
layout: post
title: "100 days of Bioinformatics: Day 11 - Learning SEISMIC-RNA"
subtitle: "Installation, Workflow, and How to integrate it into RNA of interest"
date: 2026-06-25
tags: [100 days of bioinformatics]
---

## Introduction

Hello! Long time no see! I have been writing my notes on paper for the last month (which explains the *ridiculous* gap between this and the last post :DDD)! I was also unable to access a laptop, BUT I just recently bought my first MacBook!  Excited to post more hehe :))).

I read the pre-print paper on SEISMIC-RNA about two weeks ago. It is an updated/improved version of DREEM @ Rouskin Lab and is compatible with DMS-MaP and SHAPE-MaP data. I like how it clearly identifies and tries to solve the limitations of existing algorithms for predicting large RNA structures and long-range base pairing interactions. My primary goal is to replicate the findings of the paper, but as the software includes many state-of-the-art tools in the field, I hope to improve my understanding of those on the way as well.

## Installation

Please find the [installation manual here](https://rouskinlab.github.io/seismic-rna/install/index.html).

Conda's bioconda channel gives the older build for 0.24.4. The older and the latest 0.35.X versions have different command/option/file names, and the given tutorial has been updated to the latest version. For me, I downloaded using the bioconda channel and updated it using `pip install --upgrade seismic-rna`.

## What SEISMIC-RNA does (refer to [seismic](https://rouskinlab.github.io/seismic-rna/works/index.html) for graphical illustration and explanation of the workflow)

- Optionally demultiplexes the FASTQ files.
- Aligns the reads to the references.
- Identifies the mutations in each read.
- Filters reads and positions on user-specified criteria.
- Clusters read by their mutations to infer structure ensembles.
- Predicts secondary structure(s) using the mutation rates.
- Generates a variety of graphs and RNA structure diagrams.

## Tutorials!

# SEISMIC-RNA Tutorial 1: Amplicon prepared with RT-PCR

> Updated for **SEISMIC-RNA 0.25.3**. See "Naming changes (0.24.x → 0.25.3)" below for what moved.

Download data (generated with `seismic sim` — it does **not** resemble authentic DMS mutational patterns): [RRE segment of HIV-1](https://raw.githubusercontent.com/rouskinlab/seismic-rna/main/src/userdocs/tutorials/amplicon/data.tar)

- Length: 232 nt
- Condition: **in vitro**
- Probe: DMS-MaPseq

The data is a segment of human immunodeficiency virus 1 (HIV-1) called the Rev response element (RRE). The protein Rev binds the RRE to mediate nuclear export. There are two ensemble structures: one with 5 stems (major) and one with 4 stems (minor). Two rounds of DMS-MaP, plus a non-DMS control, were conducted (hypothetically). The segment was amplified with RT-qPCR, PE 150 × 150 nt.

Extract:

```bash
tar xvf data.tar
cd data
```

`seismic wf` runs the whole pipeline end to end: align → relate → **idmut** → filter → (optional cluster) → (optional fold) → graph/export.

```bash
# activate the environment
conda activate seismic-rna

# no-DMS control
seismic wf -x fq/nodms --keep-g --keep-u --mask-polya 0 --min-mut-gap 0 hiv-rre.fa

# DMS-treated replicates (processed separately)
seismic wf -x fq/dms1 -x fq/dms2 --mask-pos rre 176 \
  -P rre GGAGCTTTGTTCCTTGGGTTCTTGG GGAGCTGTTGATCCTTTAGGTATCTTTC hiv-rre.fa
seismic graph scatter "out/dms[12]/filter/rre/26-204/filter-position-table.csv"

# pool the replicates and process together
seismic pool -p dms-pool out/dms1 out/dms2
seismic wf --mask-pos rre 176 \
  -P rre GGAGCTTTGTTCCTTGGGTTCTTGG GGAGCTGTTGATCCTTTAGGTATCTTTC \
  -k 2 --fold --fold-quantile 0.95 \
  hiv-rre.fa out/dms-pool/idmut
```

`fq/` and the `.fa` file are inside the un-tarred folder.

## Naming changes (0.24.x → 0.25.3)

These replace the corrections that were needed against the older manual:

- **Quantile flag:** use `--fold-quantile` (default `0.95`). `-q` / `--quantile` no longer exist on `wf`.
- **Keep G/U bases:** two separate flags `--keep-g --keep-u`. There is **no** `--keep-gu` in 0.25.3.
- **`idmut` is now a real step.** This is why `out/<sample>/idmut` exists and is a valid input path — it is created automatically by `relate`/`pool`. (It didn't exist in 0.24.4, hence the earlier "can't make idmut" problem.) Keep `out/dms-pool/idmut` in the pooled command.
- **Filter step naming:** the read-processing step tabulates `--filter-pos-table` / `--filter-read-table`, so its outputs are named `filter-*` (e.g. `filter-position-table.csv`, `filter-report.json`). Position masking is still configured with `--mask-pos`, `--mask-polya`, `--keep-g`, `--keep-u`.
  - ⚠ **Confirm the output directory name** after your first 0.25.3 run: `ls out/dms-pool/`. If you see `filter/`, the paths above are correct; if you see `mask/`, swap `filter` → `mask` (and `filter-position-table.csv` → `mask-position-table.csv`) in the scatter/path references.
- **Pool:** `seismic pool -p <name> out/dms1 out/dms2`. `-p` is the **pool name**; do not pass a shell glob containing `/` (e.g. `out/dms[12]`) as the name.
- **Force overwrite:** add `--force` to re-run over existing outputs.
- **Graph filenames keep the `filtered` label** (e.g. `profile_filtered_*`, `scatter_filtered_*`) regardless of the step directory name.

## Breakdown

### no-DMS control

```bash
seismic wf -x fq/nodms --keep-g --keep-u --mask-polya 0 --min-mut-gap 0 hiv-rre.fa
```

- `wf` — run the entire workflow.
- `-x fq/nodms` — search inside `fq/nodms` for paired-end FASTQ files (mate 1 and mate 2 in separate files).
- `--keep-g --keep-u` — keep G and U bases (they don't react with DMS and are usually masked in DMS-modified samples).
- `--mask-polya 0` — do not mask poly(A) stretches (which can cause artifacts in DMS-modified samples).
- `--min-mut-gap 0` — disable observer-bias correction (only applies to DMS-modified samples).
- `hiv-rre.fa` — the reference (mutation-free) sequence.

Open `out/nodms/graph/rre/full/profile_filtered_n-count.html` in a browser:

- `nodms` — the sample
- `rre` — the reference (RNA name)
- `full` — the region of the reference
- `profile` — the graph type (bar graph, position on x-axis)
- `filtered` — data come from the filter step
- `n` — shorthand for "unambiguous"
- `count` — number of reads

This shows each position has enough unambiguous base calls (>1,000) for a reasonably accurate mutation-rate estimate.

Then view mutation rates: `out/nodms/graph/rre/full/profile_filtered_m-ratio-q0.html`. To see why position 176 is highly mutated, check mutation types: `out/nodms/graph/rre/full/profile_filtered_acgtdi-ratio-q0.html`.

> "This graph shows that nearly all (~97%) of the mutations at position 176 are A-to-G substitutions. This finding suggests (given that this hypothetical experiment is in vitro) that the DNA template used to transcribe the RNA could actually be a mixture of about 50% the expected sequence and 50% that sequence with an A-to-G substitution at position 176."

Mask out position 176 to remove the skew (`--mask-pos rre 176`):

```bash
seismic wf -x fq/nodms --keep-g --keep-u --mask-polya 0 --min-mut-gap 0 --mask-pos rre 176 hiv-rre.fa --force
```

- Don't forget `--force` to overwrite existing files.

### Processing the two DMS-modified replicates

```bash
seismic wf -x fq/dms1 -x fq/dms2 --mask-pos rre 176 \
  -P rre GGAGCTTTGTTCCTTGGGTTCTTGG GGAGCTGTTGATCCTTTAGGTATCTTTC hiv-rre.fa
seismic graph scatter "out/dms[12]/filter/rre/26-204/filter-position-table.csv"
```

- `wf` — run the entire workflow.
- `-x fq/dms1` / `-x fq/dms2` — search inside each folder for paired-end FASTQ files.
- `--mask-pos rre 176` — mask position 176 (high mutation rate in the no-DMS sample).
- `-P rre <fwd> <rev>` — define the region of `rre` corresponding to the amplicon flanked by the forward primer `GGAGCTTTGTTCCTTGGGTTCTTGG` and reverse primer `GGAGCTGTTGATCCTTTAGGTATCTTTC`.
- `hiv-rre.fa` — the reference sequence.

For the scatter:

- `graph scatter` — make a scatter plot.
- `out/dms[12]/filter/rre/26-204/filter-position-table.csv` — `[12]` is a shell glob expanding to `out/dms1/...` and `out/dms2/...`.

Open `out/dms1_VS_dms2/graph/rre/26-204/scatter_filtered_m-ratio-q0.html` for the Pearson correlation plot (for a general amplicon, ≥0.98 is ideal, ≥0.95 decent).

### Pooling and processing the two replicates together

**Pool the two DMS-treated replicates.** High correlation means they can be analyzed as one sample — useful when high coverage is needed, e.g. for clustering:

```bash
# don't use a glob here; the name can't contain "/"
seismic pool dms-pool out/dms1 out/dms2
```

- `pool` — combine samples into a new pool.
- `dms-pool` — name of the pooled sample.
- `out/dms1 out/dms2` — the samples to combine (equivalent to `out/dms[12]`).

**Process the pooled sample:**

```bash
seismic wf --mask-pos rre 176 \
  -P rre GGAGCTTTGTTCCTTGGGTTCTTGG GGAGCTGTTGATCCTTTAGGTATCTTTC \
  -k 2 --fold --fold-quantile 0.95 --force \
  hiv-rre.fa out/dms-pool
```

Read `out/dms-pool/cluster/rre/26-204/cluster-report.json` — the field `Best number of clusters` is the number of RNA alternative structures.

### Verifying the structures (ROC-AUC)

For each cluster, DMS reactivities model the secondary structure (`--fold`). But the folder produces a structure for *any* reactivities — even noise — so verify the model agrees with the data: paired bases should have low reactivity, unpaired bases high. Agreement is measured by the ROC area under the curve (AUC):

- AUC = 1.0 → perfect agreement (every unpaired base has higher reactivity than every paired base)
- AUC = 0.5 → reactivities are random

Open `out/dms-pool/graph/rre/full/roc_26-204__clustered-2-x_m-ratio-q0_incl-term.html` and
`out/dms-pool/graph/rre/full/roc_26-204__filtered_m-ratio-q0_incl-term.html`

The structure models can be viewed in text editors `out/dms-pool/fold/rre/full/26-204__cluster-2-1.db`. to draw the secondary structure of the existing outputs `seismic draw out/dms-pool`

You can also use:
- `out/dms-pool/fold/rre/full/*.txt` for reactivity
- `out/dms-pool/fold/rre/full/*.ct`or (Connectivity Table) is a plain-text description of an RNA's secondary structure. You can import this to visualization software.

CT structure for reference:

| Col | Meaning |
|-----|---------|
| 1 | Position index (i) |
| 2 | The base (A/C/G/U) |
| 3 | Previous position (i−1) |
| 4 | Next position (i+1) |
| 5 | Pairing partner's index — 0 if unpaired |
| 6 | Natural/original numbering |


---

Reference:

> Allan et al. (2024). Discovery and Quantification of Long-Range RNA Base Pairs in Coronavirus Genomes with SEARCH-MaP and SEISMIC-RNA. bioRxiv: https://doi.org/10.1101/2024.04.29.591762





