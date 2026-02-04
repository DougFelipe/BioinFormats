# Implementação YAML para Formatos

## Proposta de Estrutura

Este documento apresenta a modelagem YAML para os arquivos de formato de bioinformática, que substituirão o arquivo monolítico `formats.json`.

---

## Estrutura de Diretórios

```
src/data/
└── formats/
    ├── _schema.yaml      # Schema opcional para validação
    ├── bam.yaml
    ├── bed.yaml
    ├── cram.yaml
    ├── fasta.yaml
    ├── fastq.yaml
    ├── gff.yaml
    ├── gtf.yaml
    ├── sam.yaml
    ├── vcf.yaml
    └── wig.yaml
```

---

## Template de Arquivo YAML

Cada arquivo de formato seguirá este template:

```yaml
# [Nome do Formato]
# Arquivo: [extension].yaml

extension: bam
name: Binary Alignment Map

# Áreas de aplicação
area:
  - Genomics
  - Transcriptomics

description: |
  The compressed binary version of the SAM format 
  for efficient storage of alignments.

# Codificação do arquivo
encoding_type: Binary

# Nomes de arquivo típicos
example_filenames:
  - alignment.bam
  - sorted_reads.bam

# Conteúdo de exemplo
example_file_content: "[Binary file - not human-readable]"

# Explicação linha a linha
example_file_explanation:
  - This is a binary file, which is a compressed version of a SAM file.
  - It contains the same alignment data but is not human-readable.
  - Requires tools like SAMtools to be viewed or converted.
  - An index file (.bai) allows for fast access to specific genomic regions.

# Exemplos de pipelines
pipeline_examples:
  - pipeline: SAM → SAMtools → BAM
    explanation: |
      A text-based SAM alignment file is converted and compressed 
      into the efficient binary BAM format using SAMtools.
  
  - pipeline: BAM → GATK → variant calling → VCF
    explanation: |
      A sorted and indexed BAM file is used by the GATK toolkit 
      to identify genetic variants, with results stored in a VCF file.
  
  - pipeline: BAM → IGV → genome visualization
    explanation: |
      BAM files are loaded into genome browsers like IGV to visually 
      inspect how individual reads align to the reference genome.

# Ferramentas associadas
tools:
  - SAMtools
  - IGV
  - GATK
  - Picard
  - BEDTools

# Referências
references:
  - title: SAM/BAM Format Specification
    url: https://samtools.github.io/hts-specs/SAMv1.pdf
    type: standard

# Repositórios onde é utilizado
used_in_repositories:
  - GEO (NCBI)
  - ArrayExpress
  - TCGA

# Notas adicionais
notes: |
  Binary format optimized for fast processing. 
  Requires indexing (.bai) for random access.
```

---

## Exemplos de Arquivos YAML

### `bam.yaml`

```yaml
# Binary Alignment Map Format
extension: bam
name: Binary Alignment Map

area:
  - Genomics
  - Transcriptomics

description: |
  The compressed binary version of the SAM format 
  for efficient storage of alignments.

encoding_type: Binary

example_filenames:
  - alignment.bam
  - sorted_reads.bam

example_file_content: "[Binary file - not human-readable]"

example_file_explanation:
  - This is a binary file, which is a compressed version of a SAM file.
  - It contains the same alignment data but is not human-readable.
  - Requires tools like SAMtools to be viewed or converted.
  - An index file (.bai) allows for fast access to specific genomic regions.

pipeline_examples:
  - pipeline: SAM → SAMtools → BAM
    explanation: A text-based SAM alignment file is converted and compressed into the efficient binary BAM format using SAMtools.
  
  - pipeline: BAM → GATK → variant calling → VCF
    explanation: A sorted and indexed BAM file is used by the GATK toolkit to identify genetic variants, with results stored in a VCF file.
  
  - pipeline: BAM → IGV → genome visualization
    explanation: BAM files are loaded into genome browsers like IGV to visually inspect how individual reads align to the reference genome.

tools:
  - SAMtools
  - IGV
  - GATK
  - Picard
  - BEDTools

references:
  - title: SAM/BAM Format Specification
    url: https://samtools.github.io/hts-specs/SAMv1.pdf
    type: standard

used_in_repositories:
  - GEO (NCBI)
  - ArrayExpress
  - TCGA

notes: Binary format optimized for fast processing. Requires indexing (.bai) for random access.
```

---

### `fasta.yaml`

```yaml
# FASTA Format
extension: fasta
name: FASTA Format

area:
  - Genomics
  - Transcriptomics
  - Proteomics

description: |
  A text-based format for representing nucleotide or peptide sequences. 
  Each sequence is preceded by a single-line description that starts 
  with a '>' character.

encoding_type: ASCII / UTF-8

example_filenames:
  - sequences.fasta
  - genome.fa
  - proteins.faa

example_file_content: |
  >seq1 description
  ACGTACGTACGT
  >seq2 description
  TGCATGCATGCA

example_file_explanation:
  - "Line 1: Header of the first sequence, starting with '>' followed by the identifier 'seq1' and an optional description."
  - "Line 2: Nucleotide sequence of the first entry (ACGTACGTACGT)."
  - "Line 3: Header of the second sequence with identifier 'seq2' and description."
  - "Line 4: Nucleotide sequence of the second entry (TGCATGCATGCA)."

pipeline_examples:
  - pipeline: FASTA → BLAST → alignment results
    explanation: A sequence from a FASTA file is used as a query in a BLAST search to find similar sequences in a database, producing alignment results.
  
  - pipeline: FASTA → Clustal Omega → multiple alignment
    explanation: Multiple sequences from a FASTA file are aligned using Clustal Omega to identify conserved regions and evolutionary relationships.
  
  - pipeline: FASTA → MUSCLE → phylogenetic tree
    explanation: Sequences are aligned with MUSCLE, and this alignment is then used as input for phylogenetic software to construct an evolutionary tree.

tools:
  - BLAST
  - Clustal Omega
  - MUSCLE
  - MAFFT
  - SeqKit

references:
  - title: FASTA Format Description
    url: https://en.wikipedia.org/wiki/FASTA_format
    type: documentation

  - title: NCBI FASTA Format Guide
    url: https://www.ncbi.nlm.nih.gov/BLAST/fasta.shtml
    type: standard

used_in_repositories:
  - NCBI GenBank
  - ENA
  - DDBJ
  - UniProt

notes: |
  A widely supported and de facto standard for biological sequences. 
  Common extensions include .fa, .fas, .fna (DNA), .faa (amino acids).
```

---

### `vcf.yaml`

```yaml
# Variant Call Format
extension: vcf
name: Variant Call Format

area:
  - Genomics
  - Clinical Bioinformatics

description: |
  A standard format for storing genetic variations 
  such as SNPs, indels, and structural variants.

encoding_type: ASCII / UTF-8

example_filenames:
  - variants.vcf
  - mutations.vcf.gz

example_file_content: |
  ##fileformat=VCFv4.2
  #CHROM	POS	ID	REF	ALT	QUAL	FILTER	INFO
  chr1	123456	.	A	G	60	PASS	DP=30

example_file_explanation:
  - "Line 1: Meta-information specifying the VCF format version (v4.2)."
  - "Line 2: Header line defining the columns."
  - "Line 3: A variant record showing a change from 'A' to 'G' on chromosome 1 at position 123456."

pipeline_examples:
  - pipeline: BAM → GATK → VCF → annotation
    explanation: A VCF file is generated from alignments (BAM) using GATK, and then annotated to add functional information to the variants.
  
  - pipeline: VCF → VCFtools → population analysis
    explanation: A VCF file containing variants from multiple individuals is analyzed with VCFtools to calculate population genetics statistics.
  
  - pipeline: VCF → PLINK → GWAS analysis
    explanation: VCF data is converted and used in PLINK for genome-wide association studies (GWAS) to find links between variants and traits.

tools:
  - GATK
  - VCFtools
  - bcftools
  - PLINK
  - SnpEff

references:
  - title: VCF Format Specification
    url: https://samtools.github.io/hts-specs/VCFv4.3.pdf
    type: standard

used_in_repositories:
  - dbSNP
  - ClinVar
  - gnomAD
  - dbVar

notes: |
  The standard for genome-wide association studies (GWAS) 
  and medical genomics. Supports multiple samples.
```

---

## Vantagens da Estrutura Proposta

### 1. Manutenibilidade

- **Edição isolada**: Modificar um formato não afeta outros
- **Histórico limpo**: Git diff mostra apenas mudanças relevantes
- **Colaboração**: Múltiplos contribuidores podem trabalhar em paralelo

### 2. Legibilidade

```yaml
# Antes (JSON)
"example_file_explanation": [
  "Line 1: Header of the first sequence...",
  "Line 2: Nucleotide sequence..."
]

# Depois (YAML)
example_file_explanation:
  - "Line 1: Header of the first sequence..."
  - "Line 2: Nucleotide sequence..."
```

### 3. Escalabilidade

- Adicionar novo formato: criar arquivo `novo_formato.yaml`
- Remover formato: deletar arquivo correspondente
- Organização por categoria possível (subdiretórios futuramente)

### 4. Documentação Inline

```yaml
# FASTA Format
# Formato padrão para sequências biológicas
# Última atualização: 2024-01
extension: fasta
# ...
```

---

## Observações de Implementação

1. **Extensões aceitas**: `.yaml` ou `.yml` (preferir `.yaml` para consistência)

2. **Caracteres especiais**: Strings com `:`, `>`, `|`, `#` devem ser quoted

3. **Ordem das chaves**: Manter ordem consistente (extension → name → area → ...)

4. **Validação**: Considerar JSON Schema convertido para YAML Schema
