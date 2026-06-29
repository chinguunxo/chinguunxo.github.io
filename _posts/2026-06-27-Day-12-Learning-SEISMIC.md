---
layout: post
title: "100 days of Bioinformatics: Day 12 - Day 2 of Learning SEISMIC-RNA"
subtitle: "Installation, Workflow, and How to integrate it into RNA of interest"
date: 2026-06-26
tags: [100 days of bioinformatics]
---

## Tutorials!

# SEISMIC-RNA Tutorial 2: [Running a sample with a single-end FASTQ](https://rouskinlab.github.io/seismic-rna/tutorials/single-end/index.html#tutorial-2-running-a-sample-with-a-single-end-fastq)

> Includes instructions to run a single-end (SE) FASTQ file using the entire SEISMIC-RNA workflow.

Download data (generated with `seismic sim` — it does **not** resemble authentic DMS mutational patterns): [DATA](https://raw.githubusercontent.com/rouskinlab/seismic-rna/main/src/userdocs/tutorials/single-end/fq/single_end.zip)

Extract:

```bash
mkdir fq
unzip single_end.zip fq
```

Provide SEISMIC-RNA with a reference fasta file, the FASTQ file, and the option `-z`:

```bash
seismic wf fq/sim_single_end.fa -z fq/sim_single_end_ref.fq.gz --fold --draw --export
```

Different from the previous tutorial, this contains singl-end read so the flag is changed.

| Flag | Read type |
|------|-----------|
| `-x` / `--fastqx` | Paired-end, mates 1 & 2 in **separate** files |
| `-y` / `--fastqy` | Paired-end, mates **interleaved** in one file |
| `-z` / `--fastqz` | **Single-end** reads |

(Uppercase `-X` / `-Y` / `-Z` = same three layouts, but for already-**demultiplexed** inputs.)

Paired-end-only options (don't apply to single-end): `--bt2-discordant`, `--bt2-mixed`, `--bt2-dovetail`, `--drop-discontig`, `--overhangs`, `--sep-strands`.

### Outputs

SEISMIC-RNA will automatically create the index, align, idmut, filter, and produce a number of graphs.

The rendered report `sim_single_end_ref/graph/sim_single_end_ref/full/collated.html` contains many analysis plots:

- Histogram of the mutations per read `histread_filtered_m-count`.
- Barplots with the coverage per base in all positions `profile_all_n-count`
- Barplot with the mutation rate per base in all positions `profile_all_m-ratio`
- Barplot with identity of the mutations per base in all positions ` profile_all_acgtdi-ratio`
- Stacked barplot with the coverage per base in the unmasked positions `profile_filtered_n-count`.
- Additionally, because the --fold flag was included, an ROC curve plot is outputted describing the accuracy of the models provided by fold.

# SEISMIC-RNA Tutorial 3: [Clustering](https://rouskinlab.github.io/seismic-rna/tutorials/clustering/index.html#tutorial-3-clustering)

> Includes instructions to do clustering on paired-end (PE) FASTQ file using the entire SEISMIC-RNA workflow.

Download data (generated with `seismic sim` — it does **not** resemble authentic DMS mutational patterns): [DATA](https://raw.githubusercontent.com/rouskinlab/seismic-rna/main/src/userdocs/tutorials/clustering/fq/Clustering.zip)

Extract:

```bash
mkdir fq
unzip Clustering.zip fq
```

Run the `wf` using the --cluster and --x flags:

```bash
seismic wf fq/sim_clustering.fa -x fq/ --cluster
```

Different from tutorial 2, clustering will include additional tables, reports, and plots in the ouput:

- Stacked barplot depicting the abundance of each cluster found in `abundance_clustered`
- All other plots, including mutation rate per base in the unmasked positions `profile_filtered_m-ratio`.

You can compare the correlation of each cluster using:

```bash
seismic graph corroll /out/sim_clustering_ref/cluster/sim_clustering_ref/full/cluster-position-table.csv --compself
```

# SEISMIC-RNA Tutorial 4: [Running multiple samples at once](https://rouskinlab.github.io/seismic-rna/tutorials/clustering/index.html#tutorial-3-clustering](https://rouskinlab.github.io/seismic-rna/tutorials/multi-sample/index.html#tutorial-4-running-multiple-samples-at-once)

> Includes instructions to analyze multiple samples in only one command using the SEISMIC-RNA workflow.

Download data (generated with `seismic sim` — it does **not** resemble authentic DMS mutational patterns): [DATA](https://raw.githubusercontent.com/rouskinlab/seismic-rna/main/src/userdocs/tutorials/multi-sample/fq/MultiSample.zip)

Extract:

```bash
mkdir fq
unzip Clustering.zip fq
```

It is as simple as giving the directory containing all FASTQ files:

```bash
seismic wf fq/sim_multiple.fa -x fq/
```


# SEISMIC-RNA Tutorial 5: [Masking using region file](https://rouskinlab.github.io/seismic-rna/tutorials/regions-file/index.html#tutorial-5-masking-using-a-regions-file)

> Includes instructions to analyze only distinct parts of a sequence using the SEISMIC-RNA workflow.

Masking/filtering using *region file* could be used for removing primer binding sites. 

Download data (generated with `seismic sim` — it does **not** resemble authentic DMS mutational patterns): [DATA](https://raw.githubusercontent.com/rouskinlab/seismic-rna/main/src/userdocs/tutorials/regions-file/fq/RegionsFile.zip)

Extract:

```bash
mkdir fq
unzip Clustering.zip fq
```

It is as simple as giving the directory containing all FASTQ files:

```bash
seismic wf fq/Regions_Ref.fa -x fq/ --regions-file fq/regions_file.csv --fold --draw
```


---

Reference:

Allan et al. (2024). Discovery and Quantification of Long-Range RNA Base Pairs in Coronavirus Genomes with SEARCH-MaP and SEISMIC-RNA. bioRxiv: https://doi.org/10.1101/2024.04.29.591762
