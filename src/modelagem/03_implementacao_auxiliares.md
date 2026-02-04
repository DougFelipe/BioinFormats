# Implementação YAML para Arquivos Auxiliares

## Proposta para `areas.yaml`, `faq.yaml` e `glossary.yaml`

Este documento apresenta a modelagem YAML para os arquivos auxiliares de dados.

---

## 1. `areas.yaml` — Áreas de Bioinformática

### Estrutura Proposta

```yaml
# Áreas de Bioinformática
# Arquivo: areas.yaml

areas:
  - id: big-data-repositories
    name: Big Data & Repositories
    # Descrição opcional para expansão futura
    description: Large-scale data storage and management

  - id: genomics
    name: Genomics
    description: Study of genomes and their functions

  - id: ml-bioinformatics
    name: Machine Learning in Bioinformatics
    description: AI/ML applications in biological data

  - id: metabolomics
    name: Metabolomics
    description: Study of metabolites and metabolic processes

  - id: metagenomics
    name: Metagenomics
    description: Genomic analysis of environmental samples

  - id: microbiome-analysis
    name: Microbiome Analysis
    description: Study of microbial communities

  - id: phylogenetics
    name: Phylogenetics
    description: Evolutionary relationships among species

  - id: proteomics
    name: Proteomics
    description: Large-scale study of proteins

  - id: single-cell-omics
    name: Single-Cell
    description: Analysis at single-cell resolution

  - id: structural-biology
    name: Structural Biology
    description: 3D structure of biological macromolecules

  - id: systems-biology
    name: Systems Biology
    description: Holistic approach to biological systems

  - id: transcriptomics
    name: Transcriptomics
    description: Study of transcriptomes and gene expression
```

### Comparação JSON → YAML

```json
// JSON (atual)
[
  { "id": "genomics", "name": "Genomics" }
]
```

```yaml
# YAML (proposto)
areas:
  - id: genomics
    name: Genomics
    description: Study of genomes and their functions
```

### Benefícios

- **Extensibilidade**: Campo `description` preparado para futuras features
- **Comentários**: Possibilidade de documentar cada área
- **Root key**: `areas:` facilita importação e validação

---

## 2. `faq.yaml` — Perguntas Frequentes

### Estrutura Proposta

```yaml
# Perguntas Frequentes
# Arquivo: faq.yaml

categories:
  - name: General & Platform Usage
    items:
      - question: What is the primary goal of the BioinFormats platform?
        answer: |
          BioinFormats serves as a reference guide for file formats 
          used in bioinformatics. It is designed for users of all levels
          —from students just starting out to experienced researchers—
          to quickly find and understand the structure, pipelines, 
          and associated tools for a wide range of bioinformatics data files.

      - question: Who is this platform for?
        answer: |
          The platform is designed for anyone working with bioinformatics data. 
          This includes undergraduate and graduate students, academic researchers, 
          data scientists, and industry professionals who need a quick and 
          reliable reference for file formats.

      - question: Is this platform free to use?
        answer: |
          Yes, BioinFormats is completely free to use. 
          It is an open-source project developed with the aim 
          of supporting the scientific community.

      - question: How does the search functionality work?
        answer: |
          You can enter almost any term related to a format, including 
          its file extension (e.g., '.sam'), full name ('Sequence Alignment Map'), 
          associated tools ('SAMtools'), a related area ('Genomics'), 
          or even its encoding type ('Binary'). The system will search 
          across all metadata fields to find the most relevant results.

      - question: What makes BioinFormats different from other resources?
        answer: |
          Our focus is on centralization and comprehensive search. 
          Instead of browsing multiple wikis or documentation pages, 
          you get a standardized overview in one place. Our hybrid data 
          aggregation model, combining automated scraping with AI-driven 
          curation, allows us to cover a broad range of formats.

  - name: Technical Details & Data
    items:
      - question: How can I be sure the information is accurate?
        answer: |
          Our data pipeline starts by scraping official sources like 
          standards documentation and established biological databases. 
          This raw information is then processed, verified, and enriched 
          by AI models. While we strive for 100% accuracy, the project's 
          open-source nature allows the community to report any discrepancies 
          via GitHub, ensuring the data is continuously refined.

      - question: How often is the data updated?
        answer: |
          The data is updated periodically to reflect changes in standards 
          and to include new formats. As an open-source project, updates 
          can also be contributed by the community at any time.

      - question: What do the 'Pipeline Examples' represent?
        answer: |
          The pipeline examples are illustrative workflows that show how 
          a specific file format fits into a larger analytical context. 
          They are not executable scripts but rather descriptive guides 
          to help users, especially those new to the field, understand 
          the role a format plays in a multi-step bioinformatics analysis.

      - question: What does the 'Encoding Type' metadata mean?
        answer: |
          'Encoding' specifies how the data is stored. 'ASCII / UTF-8' 
          means it's a plain text file that can be opened in any text editor. 
          'Binary' means the file is encoded in a machine-readable format 
          that is not human-readable and requires specific software.

      - question: Why are some file examples marked as '[Binary file]?'
        answer: |
          Formats like BAM or SRA are binary, meaning their content isn't 
          represented as readable text. Displaying their raw content would 
          be meaningless. For these, we indicate that they are binary and 
          must be handled with specific tools.

      - question: How are the 'Associated Tools' chosen?
        answer: |
          The tools listed are some of the most widely used and officially 
          recognized software for handling that specific format. This list 
          is not exhaustive but serves as a starting point for users.

  - name: Community & Contribution
    items:
      - question: How can I contribute to this project?
        answer: |
          This is an open-source project, and we welcome contributions! 
          You can contribute by forking the repository on GitHub, making 
          your changes, and submitting a 'Pull Request'. We have a guide 
          for contributors in the repository that explains the process.
        link: https://github.com/DougFelipe/BioinFormats

      - question: I found an error or have a suggestion. How can I report it?
        answer: |
          The best way to report a bug or suggest an improvement is to 
          open an 'Issue' on our GitHub repository.
        link: https://github.com/DougFelipe/BioinFormats/issues

      - question: I'm not a developer. Can I still contribute?
        answer: |
          Absolutely! Non-developers can contribute in many valuable ways, 
          such as identifying and reporting errors in the data, suggesting 
          new file formats to include, or improving descriptions.

      - question: What happens after I submit a contribution or report an issue?
        answer: |
          Once you submit a Pull Request or open an Issue, our maintainers 
          will review it. There might be a discussion to clarify details, 
          and once approved, the changes will be merged into the main project.

      - question: Where can I find the contribution guidelines?
        answer: |
          Detailed contribution guidelines are available in the README.md 
          file in our official GitHub repository.
        link: https://github.com/DougFelipe/BioinFormats

  - name: Future Plans
    items:
      - question: Will the platform ever have user accounts or personalized features?
        answer: |
          While not on our immediate roadmap, we have considered features 
          like user accounts for saving favorite formats or creating 
          personalized collections. The implementation depends on user demand.

      - question: Will the platform eventually support a RESTful API?
        answer: |
          Yes, that's part of our long-term goal. A RESTful API would allow 
          programmatic access to the dataset, making integration with 
          pipelines, tools, and registries much easier.

      - question: Are you planning educational resources like mini-courses?
        answer: |
          Yes — education and accessibility are at the core of this platform. 
          The goal is to centralize technical documentation while making it 
          easier to understand through complementary resources.

      - question: Is localization or multilingual support planned?
        answer: |
          English was chosen as the default. However, we recognize the global 
          nature of bioinformatics and may explore localization support 
          in the future.
```

### Benefícios YAML para FAQ

- **Strings multi-linha**: `|` para respostas longas sem escape
- **Estrutura clara**: Hierarquia categoria → items evidente
- **Campos opcionais**: `link:` pode ser adicionado quando relevante

---

## 3. `glossary.yaml` — Glossário

### Estrutura Proposta

```yaml
# Glossário de Bioinformática
# Arquivo: glossary.yaml

terms:
  - id: alignment
    term: Alignment
    slug: alignment
    definition: |
      Mapping of reads to a reference sequence (or to each other), 
      resulting in positions and CIGAR operations.
    area_ids:
      - genomics
      - transcriptomics
    aliases:
      - mapping
    related_terms:
      - sam
      - bam
      - cram

  - id: annotation
    term: Annotation
    slug: annotation
    definition: |
      Functional information added to genomic elements/variants 
      (effect, gene, impact, ontology).
    area_ids:
      - genomics
      - transcriptomics
      - epigenomics
    aliases:
      - functional annotation
      - feature annotation
    related_terms:
      - gff
      - gtf
      - snpEff

  - id: contig
    term: Contig
    slug: contig
    definition: Continuous sequence generated by assembling overlapping reads.
    area_ids:
      - genomics
      - metagenomics
    aliases:
      - contiguous sequence
    related_terms:
      - assembly
      - scaffold
      - fasta

  - id: coverage
    term: Coverage
    slug: coverage
    definition: |
      Average read depth at a position or region of the genome. 
      Often reported as X (e.g., 30×).
    area_ids:
      - genomics
      - cancer-genomics
      - clinical-bioinformatics
    aliases:
      - depth
      - read depth
      - sequencing depth
    related_terms:
      - bam
      - bigwig
      - bedgraph

  - id: normalization
    term: Normalization
    slug: normalization
    definition: Procedures to make samples comparable (e.g., TPM/FPKM in RNA-seq).
    area_ids:
      - transcriptomics
      - genomics
      - ml-bioinformatics
    aliases:
      - scaling
      - library size correction
    related_terms:
      - deseq2
      - edger
      - tpm
      - counts

  - id: peak-calling
    term: Peak Calling
    slug: peak-calling
    definition: Identification of enriched signal regions in ChIP-seq/ATAC-seq data.
    area_ids:
      - epigenomics
      - genomics
    aliases:
      - peak detection
    related_terms:
      - bed
      - wig
      - bigwig

  - id: phasing
    term: Phasing
    slug: phasing
    definition: Determination of which variants are on the same haplotype.
    area_ids:
      - genomics
      - population-genetics
    aliases:
      - haplotype phasing
    related_terms:
      - vcf
      - plink

  - id: quality-score
    term: Quality Score
    slug: quality-score
    definition: |
      Per-base metric (Phred) that indicates the probability of error 
      in nucleotide calling.
    area_ids:
      - genomics
      - transcriptomics
    aliases:
      - phred score
      - base quality
    related_terms:
      - fastq
      - qc
      - trimming

  - id: read
    term: Read
    slug: read
    definition: |
      Short sequence of DNA or RNA produced by a sequencer. 
      Reads are primary inputs for alignment, assembly, and quantification.
    area_ids:
      - genomics
      - transcriptomics
      - metagenomics
    aliases:
      - sequencing read
      - raw read
      - read pair
      - paired-end read
    related_terms:
      - fastq
      - alignment
      - coverage
    references:
      - title: FASTQ Format (Overview)
        url: https://en.wikipedia.org/wiki/FASTQ_format

  - id: reference-genome
    term: Reference Genome
    slug: reference-genome
    definition: Consensus sequence used as a basis for alignment and variant calling.
    area_ids:
      - genomics
      - evolutionary-genomics
    aliases:
      - reference
      - ref genome
      - assembly
    related_terms:
      - fasta
      - index
      - chr

  - id: transcript
    term: Transcript
    slug: transcript
    definition: Transcription product of a gene, which may include multiple isoforms.
    area_ids:
      - transcriptomics
      - genomics
    aliases:
      - isoform
      - mrna
    related_terms:
      - gtf
      - gff
      - counts

  - id: variant
    term: Variant
    slug: variant
    definition: Observed difference relative to the reference genome (SNP, indel, SV).
    area_ids:
      - genomics
      - clinical-bioinformatics
      - population-genetics
    aliases:
      - mutation
      - polymorphism
      - SNP
      - INDEL
      - SV
    related_terms:
      - vcf
      - bcf
      - annotation
```

### Benefícios YAML para Glossário

- **Definições legíveis**: Strings multi-linha sem escape
- **Arrays naturais**: Aliases e related_terms como listas YAML
- **Comentários por termo**: Documentação inline possível

---

## Estrutura Final de Diretórios

```
src/data/
├── formats/           # Arquivos individuais por formato
│   ├── bam.yaml
│   ├── bed.yaml
│   ├── cram.yaml
│   ├── fasta.yaml
│   ├── fastq.yaml
│   ├── gff.yaml
│   ├── gtf.yaml
│   ├── sam.yaml
│   ├── vcf.yaml
│   └── wig.yaml
├── areas.yaml         # Áreas de bioinformática
├── faq.yaml           # Perguntas frequentes
└── glossary.yaml      # Glossário de termos
```
