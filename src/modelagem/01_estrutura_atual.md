# Estrutura de Dados Atual

## Análise dos Arquivos JSON

Este documento detalha a estrutura de cada arquivo JSON em `src/data/` e como eles são consumidos pela aplicação.

---

## 1. `formats.json` — Catálogo de Formatos

### Estrutura de Dados

```json
[
  {
    "extension": "bam",
    "name": "Binary Alignment Map",
    "area": ["Genomics", "Transcriptomics"],
    "description": "The compressed binary version...",
    "example_filenames": ["alignment.bam", "sorted_reads.bam"],
    "example_file_content": "[Binary file - not human-readable]",
    "example_file_explanation": [
      "This is a binary file...",
      "It contains the same alignment data..."
    ],
    "pipeline_examples": [
      {
        "pipeline": "SAM → SAMtools → BAM",
        "explanation": "A text-based SAM alignment file..."
      }
    ],
    "tools": ["SAMtools", "IGV", "GATK", "Picard", "BEDTools"],
    "references": [
      {
        "title": "SAM/BAM Format Specification",
        "url": "https://samtools.github.io/hts-specs/SAMv1.pdf",
        "type": "standard"
      }
    ],
    "encoding_type": "Binary",
    "used_in_repositories": ["GEO (NCBI)", "ArrayExpress", "TCGA"],
    "notes": "Binary format optimized for fast processing..."
  }
]
```

### Interface TypeScript (`types/index.ts`)

```typescript
export interface FileFormat {
  extension: string;
  name: string;
  area: string[];
  description: string;
  example_filenames: string[];
  example_file_content: string;
  example_file_explanation: string[];
  pipeline_examples: PipelineExample[];
  tools: string[];
  references: Reference[];
  encoding_type: string;
  used_in_repositories?: string[];
  notes?: string;
}

export interface PipelineExample {
  pipeline: string;
  explanation: string;
}

export interface Reference {
  title: string;
  url: string;
  type: 'documentation' | 'paper' | 'tool' | 'standard';
}
```

### Uso na Aplicação

```typescript
// App.tsx
import formatsData from './data/formats.json';
const [formats] = useState<FileFormat[]>(formatsData);
```

### Formatos Catalogados (10)

| Extensão | Nome | Áreas |
|----------|------|-------|
| `bam` | Binary Alignment Map | Genomics, Transcriptomics |
| `bed` | Browser Extensible Data | Genomics, Epigenomics |
| `cram` | CRAM Format | Genomics, Big Data & Repositories |
| `fasta` | FASTA Format | Genomics, Transcriptomics, Proteomics |
| `fastq` | FASTQ Format | Genomics, Transcriptomics |
| `gff` | General Feature Format | Genomics, Transcriptomics, Epigenomics |
| `gtf` | Gene Transfer Format | Genomics, Transcriptomics |
| `sam` | Sequence Alignment Map | Genomics, Transcriptomics |
| `vcf` | Variant Call Format | Genomics, Clinical Bioinformatics |
| `wig` | Wiggle Format | Genomics, Epigenomics |

---

## 2. `areas.json` — Áreas de Bioinformática

### Estrutura de Dados

```json
[
  { "id": "big-data-repositories", "name": "Big Data & Repositories" },
  { "id": "genomics", "name": "Genomics" },
  { "id": "ml-bioinformatics", "name": "Machine Learning in Bioinformatics" }
]
```

### Interface TypeScript

```typescript
export interface BioinformaticsArea {
  id: string;
  name: string;
}
```

### Uso na Aplicação

```typescript
// App.tsx
import areasData from './data/areas.json';
const [areas] = useState<BioinformaticsArea[]>(areasData);
```

### Áreas Catalogadas (12)

- Big Data & Repositories
- Genomics
- Machine Learning in Bioinformatics
- Metabolomics
- Metagenomics
- Microbiome Analysis
- Phylogenetics
- Proteomics
- Single-Cell
- Structural Biology
- Systems Biology
- Transcriptomics

---

## 3. `faq.json` — Perguntas Frequentes

### Estrutura de Dados

```json
[
  {
    "category": "General & Platform Usage",
    "items": [
      {
        "question": "What is the primary goal...?",
        "answer": "BioinFormats serves as a reference guide..."
      }
    ]
  }
]
```

### Uso na Aplicação

```typescript
// pages/Faq.tsx
import faqData from '../data/faq.json';

{faqData.map((category, categoryIndex) => (
  <div key={categoryIndex}>
    <h2>{category.category}</h2>
    {category.items.map((faq, itemIndex) => (
      <FaqItem question={faq.question} answer={faq.answer} />
    ))}
  </div>
))}
```

### Categorias (4)

1. General & Platform Usage (5 perguntas)
2. Technical Details & Data (6 perguntas)
3. Community & Contribution (5 perguntas)
4. Future Plans (4 perguntas)

---

## 4. `glossary.json` — Glossário

### Estrutura de Dados

```json
[
  {
    "id": "alignment",
    "term": "Alignment",
    "slug": "alignment",
    "definition": "Mapping of reads to a reference sequence...",
    "area_ids": ["genomics", "transcriptomics"],
    "aliases": ["mapping"],
    "related_terms": ["sam", "bam", "cram"],
    "references": [
      { "title": "FASTQ Format (Overview)", "url": "https://..." }
    ]
  }
]
```

### Interface TypeScript

```typescript
export type GlossaryTerm = {
  id: string;
  term: string;
  slug: string;
  definition: string;
  area_ids: string[];
  aliases?: string[];
  related_terms?: string[];
  references?: ReferenceLink[];
};
```

### Uso na Aplicação

```typescript
// pages/Glossary.tsx
import glossaryJSON from "../data/glossary.json";
const glossary = glossaryJSON as GlossaryTerm[];
```

### Termos Catalogados (12)

- Alignment, Annotation, Contig, Coverage
- Normalization, Peak Calling, Phasing
- Quality Score, Read, Reference Genome
- Transcript, Variant

---

## Padrões de Consumo de Dados

### Importação Direta

Todos os arquivos JSON são importados estaticamente:

```typescript
import formatsData from './data/formats.json';
import areasData from './data/areas.json';
import faqData from '../data/faq.json';
import glossaryJSON from "../data/glossary.json";
```

### Utilitários de Busca (`searchUtils.tsx`)

O arquivo `src/utils/searchUtils.tsx` implementa:

- `searchFormats()` — Busca ponderada em múltiplos campos
- `getUniqueAreas()` — Extrai áreas únicas dos formatos
- `searchGlossary()` — Busca no glossário
- `highlightMatch()` — Destaque de termos encontrados

### Dependência de Tipos

Os tipos TypeScript em `types/index.ts` definem contratos:

- `FileFormat` — Estrutura do formato de arquivo
- `BioinformaticsArea` — Área de bioinformática
- `GlossaryTerm` — Termo do glossário
- `Reference` / `ReferenceLink` — Links de referência
- `PipelineExample` — Exemplo de pipeline
