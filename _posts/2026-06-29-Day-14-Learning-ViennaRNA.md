---
layout: post
title: "100 days of Bioinformatics: Day 14 - Learning ViennaRNA: packages and programs"
subtitle: ""
date: 2026-06-29
tags: [100 days of bioinformatics]
---

This is a personal note on using ViennaRNA and the programs included in the package.

The ViennaRNA Package includes the following executable programs:

| Program         | Description                                                                                                               |
| --------------- | :-------------------------------------------------------------------------------------------------------------------------|
| `RNA2Dfold`     | Compute MFE structure, partition function and representative sample structures of k,l neighborhoods                       |
| `RNAaliduplex`  | Predict conserved RNA-RNA interactions between two alignments                                                             |
| `RNAalifold`    | Calculate secondary structures for a set of aligned RNA sequences                                                         |
| `RNAcofold`     | Calculate secondary structures of two RNAs with dimerization                                                              |
| `RNAdistance`   | Calculate distances between RNA secondary structures                                                                      |
| `RNAdos`        | Compute the density of states for the conformation space of a given RNA sequence                                          |
| `RNAduplex`     | Compute the structure upon hybridization of two RNA strands                                                               |
| `RNAeval`       | Evaluate free energy of RNA sequences with given secondary structure                                                      |
| `RNAfold`       | Calculate minimum free energy secondary structures and partition function of RNAs                                         |
| `RNAheat`       | Calculate the specific heat (melting curve) of an RNA sequence                                                            |
| `RNAinverse`    | Find RNA sequences with given secondary structure (sequence design)                                                       |
| `RNALalifold`   | Calculate locally stable secondary structures for a set of aligned RNAs                                                   |
| `RNALfold`      | **Calculate locally stable secondary structures of long RNAs**                                                            |
| `RNAmultifold`  | Compute secondary structures and probabilities for multiple interacting RNAs                                              |
| `RNApaln`       | RNA alignment based on sequence base pairing propensities                                                                 |
| `RNApdist`      | Calculate distances between thermodynamic RNA secondary structures ensembles                                              |
| `RNAparconv`    | Convert energy parameter files from ViennaRNA 1.8 to 2.0 format                                                           |
| `RNAPKplex`     | **Predict RNA secondary structures including pseudoknots**                                                                |
| `RNAplex`       | Find targets of a query RNA                                                                                               |
| `RNAplfold`     | **Calculate average pair probabilities for locally stable secondary structures**                                          |
| `RNAplot`       | **Draw RNA Secondary Structures in PostScript, SVG, or GML**                                                                  |
| `RNApvmin`      | Calculate a perturbation vector that minimizes discripancies between predicted and observed pairing probabilities         |
| `RNAsnoop`      | Find targets of a query H/ACA snoRNA                                                                                      |
| `RNAsubopt`     | Calculate suboptimal secondary structures of RNAs                                                                         |
| `RNAup`         | Calculate the thermodynamics of RNA-RNA interactions                                                                      |
| `AnalyseSeqs`   | Analyse sequence data                                                                                                     |
| `AnalyseDists`  | Analyse distance matrices                                                                                                 |


# RNAfold


`RNAfold < UCA1_2314nt.fasta` gives you the MFE structure in dot-bracket plus _ss.ps you can view. But honestly, for a 2314 nt lncRNA a single global MFE structure is mostly meaningless — long RNAs don't fold into one stable global structure, which is exactly why RNAplfold (local, probabilistic) is the right tool.


```
RNAFOLD(1)                               User Commands                               RNAFOLD(1)

NAME
       RNAfold - manual page for RNAfold 2.7.2

SYNOPSIS
       RNAfold [OPTIONS] [<input0.fa>] [<input1.fa>]...

DESCRIPTION
       RNAfold 2.7.2

       Calculate minimum free energy secondary structures and partition function of RNAs

       The  program  reads  RNA sequences, calculates their minimum free energy (mfe) structure
       and prints the mfe structure in bracket notation and its free energy.  If not  specified
       differently  using  commandline  arguments, input is accepted from stdin or read from an
       input file, and output printed to stdout. If the -p option was given  it  also  computes
       the partition function (pf) and base pairing probability matrix, and prints the free en‐
       ergy  of the thermodynamic ensemble, the frequency of the mfe structure in the ensemble,
       and the ensemble diversity to stdout.

       It also produces PostScript files with plots of the resulting secondary structure  graph
       and  a  "dot  plot"  of the base pairing matrix.  The dot plot shows a matrix of squares
       with area proportional to the pairing probability in  the  upper  right  half,  and  one
       square  for  each  pair in the minimum free energy structure in the lower left half. For
       each pair i-j with probability p>10E-6 there is a line of the form

       i  j  sqrt(p)  ubox

       in the PostScript file, so that the pair probabilities can be easily extracted.

       Sequences may be provided in a simple text format where each sequence occupies a  single
       line. Output files are named "rna.ps" and "dot.ps". Existing files of the same name will
       be overwritten.

       It  is  also  possible to provide sequence data in FASTA format. In this case, the first
       word of the FASTA header will be used as prefix for output file names.  PostScript files
       "prefix_ss.ps" and "prefix_dp.ps" are produced for the structure and dot  plot,  respec‐
       tively.  Note,  however, that once FASTA input was provided all following sequences must
       be in FASTA format too.

       To avoid problems with certain operating systems and/or file systems the prefix will AL‐
       WAYS be sanitized! This step substitutes any special character in the prefix by a  file‐
       name  delimiter.  See the --filename-delim option to change the delimiting character ac‐
       cording to your requirements.

       The program will continue to read new sequences until a line consisting  of  the  single
       character '@' or an end of file (EOF) condition is encountered.

```


# RNAplfold

RNAplfold slides a window of width -W along the sequence, one position at a time. Inside each window, it computes the full partition function — i.e., the probability of every possible base pair within that window. Any given pair (i,j) shows up in multiple overlapping windows, so RNAplfold averages its probability across all windows that contain it. That averaged value is the final base-pair probability. The -L cutoff just says "don't bother with pairs whose span exceeds L." That averaging is the "assembly" — it's not stitching structures together, it's averaging pairing probabilities position by position.
What you get out:

`UCA1_..._dp.ps` — a dot plot in PostScript. Upper triangle = base-pair probabilities (bigger square = higher probability that i pairs with j). View it with:

```bash
gv UCA1_2314nt_dp.ps      # or evince, okular, or convert to PDF/PNG:
ps2pdf UCA1_2314nt_dp.ps dotplot.pdf # this gave a tiny plot that is uninterprateable
```

`UCA1_..._lunp` — the unpaired-probability table from -u. Plot accessibility along the sequence with that.



```
RNAPLFOLD(1)                             User Commands                             RNAPLFOLD(1)

NAME
       RNAplfold - manual page for RNAplfold 2.7.2

SYNOPSIS
       RNAplfold [OPTION]...

DESCRIPTION
       RNAplfold 2.7.2

       calculate locally stable secondary structure - pair probabilities

       Computes local pair probabilities for base pairs with a maximal span of L. The probabil‐
       ities are averaged over all windows of size L that contain the base pair. For a sequence
       of  length n and a window size of L the algorithm uses only O(n+L*L) memory and O(n*L*L)
       CPU time. Thus it is practical to "scan" very large genomes for short stable RNA  struc‐
       tures.

       Output  consists of a dot plot in postscript file, where the averaged pair probabilities
       can easily be parsed and visually inspected.

       The -u option makes i possible to compute the probability that a  stretch  of  x  conse‐
       qutive  nucleotides  is unpaired, which is useful for predicting possible binding sites.
       Again this probability is averaged over all windows containing the region.

       The output is a plain text matrix containing on each line a position i followed  by  the
       probability  that  i is unpaired, [i-1..i] is unpaired [i-2..i] is unpaired and so on to
       the probability that [i-x+1..i] is unpaired.

Algorithms:
              Select and change parameters of (additional) algorithms which should be included
              in the calculations.

       -W, --winsize=size
              Average the pair probabilities over windows of given size.

              (default=`70')

       -L, --span=size
              Set the maximum allowed separation of a base pair to span.

              By setting the maximum base pair span no pairs (i,j) with j-i > span will be al‐
              lowed. Defaults to winsize if parameter is omitted.

       -u, --ulength=length
              Compute the mean probability that regions of length 1 to a given length are  un‐
              paired.

              (default=`31')

              Output is saved in a '_lunp' file.

       --betaScale=DOUBLE
              Set the scaling of the Boltzmann factors.  (default=`1.')

              The  argument  provided with this option is used to scale the thermodynamic tem‐
              perature in the Boltzmann factors independently from the temperature of the  in‐
              dividual  loop  energy  contributions.  The Boltzmann factors then become 'exp(-
              dG/(kT*betaScale))' where 'k' is the Boltzmann constant, 'dG'  the  free  energy
              contribution of the state and 'T' the absolute temperature.

       -S, --pfScale=DOUBLE
              In  the calculation of the pf use scale*mfe as an estimate for the ensemble free
              energy (used to avoid overflows).

              (default=`1.07')

              The default is 1.07, useful values are 1.0 to 1.2. Occasionally needed for  long
              sequences.

```

A 2314 nt lncRNA has no single meaningful global fold. So "mapping the structure" really means: identify locally stable, high-confidence structured domains, then characterize each. The pipeline reflects that — RNALfold finds candidate domains, RNAplfold scores confidence, RNAPKplex flags PKs, RNAfold/RNAplot zoom in and draw the ones that matter.
The table has been filtered down to what actually matters, grouped by job:

**Structure of the long RNA itself (your core)**
- `RNALfold` — locally stable structures of long RNAs. This is the companion to RNAplfold: RNAplfold gives you *probabilities*, RNALfold gives you actual *drawable local structures* with energies. For a 2314 nt lncRNA, this is your real "what does it fold into locally" tool.
- `RNAplfold` — accessibility + pair probabilities (already using).
- `RNAPKplex` — pseudoknots. Worth running if you suspect functional PK elements; standard folding ignores them.

**RNA–RNA interactions (essential if you're probing the sponge/target function)**
- `RNAup` — interaction thermodynamics *that account for accessibility*. Best choice for miRNA: UCA1 or UCA1:mRNA binding because it factors in whether the site is open.
- `RNAplex` — fast target screening; use to scan many candidate miRNAs/mRNAs against UCA1, then refine hits with RNAup.
- `RNAduplex` — quick pairwise hybridization, ignores intramolecular structure (rough/first pass).
- `RNAcofold` / `RNAmultifold` — full co-folding of two / multiple interacting RNAs (dimers, complexes).

**Comparative / conservation (only if you have multi-species alignments of UCA1)**
- `RNAalifold` — consensus structure from an alignment (conservation = functional structure signal; strong for a proposal).
- `RNALalifold` — local version for long alignments.
- `RNAaliduplex` — conserved interactions between two alignments.

**Visualization & support**
- `RNAplot` — draw structures (PS/SVG) from dot-bracket.
- `RNAfold` — global MFE + partition function; useful on extracted *sub-domains*, not the whole 2314 nt.
- `RNAsubopt` — sample the suboptimal ensemble (shows structural heterogeneity — good argument for why local methods are needed).
- `RNAdistance` / `RNApdist` — compare structures (e.g. wild-type vs mutant, or across conditions).

**Probably ignore for this project**
`RNA2Dfold`, `RNAdos`, `RNAheat`, `RNAinverse` (design, not analysis), `RNAeval`, `RNAparconv` (format conversion), `RNAsnoop` (snoRNA-specific), `AnalyseSeqs`, `AnalyseDists`.

One conditional: `RNApvmin` becomes relevant **only if you have experimental probing data** (SHAPE/DMS) — it folds the RNA constrained to match your data. Big credibility boost for a proposal if you have or plan such data.

**The core three**

`RNALfold` is your primary structure caller. It scans the 2314 nt for locally stable structures and outputs actual dot-bracket structures with energies and coordinates — the things you can draw. Run with a span limit:

```
RNALfold -L 150 < UCA1_2314nt.fasta > UCA1.lfold
```

`-L` caps how far apart paired bases can be (150 nt is a sensible local-domain ceiling for a lncRNA; structure beyond that is rarely real/stable).

`RNAplfold` is the probabilistic companion — it tells you *how confident* each pairing is and which regions are accessible. RNALfold says "here's a structure," RNAplfold says "here's how reliable each pair is." Use them together: high-probability regions in the dot plot that also appear in RNALfold = your confident structured domains.

```
RNAplfold -W 150 -L 150 -u 1 < UCA1_2314nt.fasta
```

`RNAPKplex` catches pseudoknots that the other two structurally cannot represent. Run it as a check — if it reports PKs in a region, that's a flag that standard folding under-describes that domain.

```
RNAPKplex < UCA1_2314nt.fasta > UCA1.pkplex
```

**Support tools for this aim**

`RNAplot` draws any structure you pull out (e.g. a confident domain from RNALfold) into PS/SVG. `RNAfold` is for zooming into a single extracted sub-domain (run it on a 100–200 nt slice, not the whole thing). `RNAsubopt` on a sub-domain shows the ensemble spread — useful evidence for *why* you're using local methods on a long RNA, which strengthens the proposal narrative.







