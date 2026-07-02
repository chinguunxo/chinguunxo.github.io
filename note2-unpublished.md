`wc` - word count.
`$ grep NNNNNNNNN Mov10.fq | wc -l` - returns only the number of lines

The pipes are important and powerful concepts in shell and you can string along as many commands together as you like.

### GTF file format

> a new file type: Gene Transfer Format (.gtf) is a tab-delimited file with information arranged in a very specific manner, usually for NGS analysis. [More Info Here] (http://useast.ensembl.org/info/website/upload/gff.html)

| seqname | source | feature | start | end | score | strand | frame | attribute |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| chromosome or scaffold | program or data source | feature type e.g. Gene | start position (1-based) | end position (1-based) | floating point value | + or - | 0,1,2 | tag-value pairs |
| . | . | . | . | . | . | . | . | semicolon-separated |

For example, as shown in the following, any empty values should be denoted as  "." instead of being empty. 

```
X	Ensembl	Repeat	2419108	2419128	42	.	.	hid=trf; hstart=1; hend=21
```

Splice isforms are represented in the GTF file as exon being represented multiple times, once for each transcript (or splice isoform).

### More commands in Shell

**`cut` is a command that extracts columns from files**

The `cut` command with `-f` argument to specify the columns to be extracted/outputted. `$ cut -f 1,4 ch1.gtf | head` selects the 1st and 4th column.

> In case of files separated by "," or ";" etc., delimiter can be specified for 	`cut`, e.g. with `-d ","` with a .csv file.

**`sort` is a command to sort the contents of a file in a particular order**

`sort` by `-k` -- which column to sort by, and by the sorting type `n` numeric, and return only unique values `-u`.

```
cut -f 1,4 ch1.gtf | sort -1 -u | wc -l
```

----

*Exercise*

```
grep exon chr1-hg19_genes.gtf | cut -f 1,4,5,7 | sort -u |wc -l
```








