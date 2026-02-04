# Proposta: Otimização do Visualizador de Formatos

> **Data:** 03/02/2026  
> **Componente:** `CodeBlock.tsx`  
> **Página:** `FormatDetail.tsx`

---

## 1. Estado Atual

### Screenshots do Visualizador Atual

````carousel
![FASTQ - Visualização atual](C:/Users/Douglas/.gemini/antigravity/brain/45c0b1f4-262d-44a5-8c8b-fb37d90fff98/uploaded_media_0_1770168214749.png)
<!-- slide -->
![GFF - Dados tabulares sem colunas](C:/Users/Douglas/.gemini/antigravity/brain/45c0b1f4-262d-44a5-8c8b-fb37d90fff98/uploaded_media_1_1770168214749.png)
<!-- slide -->
![FASTA - Sequências sem destaque](C:/Users/Douglas/.gemini/antigravity/brain/45c0b1f4-262d-44a5-8c8b-fb37d90fff98/uploaded_media_2_1770168214749.png)
````

### Estrutura do Componente `CodeBlock.tsx`

```typescript
interface CodeBlockProps {
  content: string;       // Conteúdo em texto plano
  language?: string;     // Tipo do formato (apenas decorativo)
  filename?: string;     // Nome do arquivo exibido
  className?: string;
}
```

### Limitações Identificadas

| Problema | Impacto |
|----------|---------|
| **Sem detecção de tipo** | Todos os formatos renderizados igual |
| **Sem suporte tabular** | GFF, BED, VCF não mostram colunas |
| **Sem syntax highlight** | FASTA headers não destacados |
| **Sem tooltips** | Usuário não entende o que cada coluna significa |
| **Layout fixo** | Não se adapta ao tipo de dado |

---

## 2. Proposta de Otimização

### Arquitetura Modular

```
                         ┌─────────────────────────┐
                         │    FormatViewer.tsx     │  ← Componente orquestrador
                         │    (Smart Router)       │
                         └───────────┬─────────────┘
                                     │
          ┌──────────────────────────┼──────────────────────────┐
          │                          │                          │
          ▼                          ▼                          ▼
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│  TabularViewer  │       │  SequenceViewer │       │   CodeViewer    │
│  (GFF, BED, VCF,│       │  (FASTA, FASTQ) │       │  (Genérico)     │
│   SAM, GTF)     │       │                 │       │                 │
└─────────────────┘       └─────────────────┘       └─────────────────┘
```

---

## 3. Implementação: TabularViewer

### Para Formatos Tabulares (GFF, BED, VCF, SAM, GTF)

#### Proposta Visual

```
┌─────────────────────────────────────────────────────────────────────┐
│ 📊 example.gff                                         1 linha • GFF │
├─────────────────────────────────────────────────────────────────────┤
│ CHROM │ SOURCE │ TYPE │ START │  END  │ SCORE │ STRAND │ PHASE │ ATTR│
├───────┼────────┼──────┼───────┼───────┼───────┼────────┼───────┼─────┤
│ chr1  │ RefSeq │ gene │ 11874 │ 14409 │   .   │   +    │   .   │ ... │
└─────────────────────────────────────────────────────────────────────┘
```

#### Definição de Colunas por Formato

```typescript
const COLUMN_DEFINITIONS: Record<string, ColumnDef[]> = {
  gff: [
    { name: 'Seqname', tooltip: 'Chromosome or scaffold name' },
    { name: 'Source', tooltip: 'Program that generated the feature' },
    { name: 'Feature', tooltip: 'Type of feature (gene, exon, CDS, etc.)' },
    { name: 'Start', tooltip: 'Start position (1-based)' },
    { name: 'End', tooltip: 'End position (inclusive)' },
    { name: 'Score', tooltip: 'Numeric score (. if not available)' },
    { name: 'Strand', tooltip: '+ (forward) or - (reverse)' },
    { name: 'Frame', tooltip: 'Reading frame (0, 1, 2 or .)' },
    { name: 'Attributes', tooltip: 'Semicolon-separated key=value pairs' }
  ],
  bed: [
    { name: 'Chrom', tooltip: 'Chromosome name' },
    { name: 'Start', tooltip: 'Start position (0-based)' },
    { name: 'End', tooltip: 'End position (not inclusive)' },
    { name: 'Name', tooltip: 'Feature name (optional)' },
    { name: 'Score', tooltip: 'Score value (optional)' },
    { name: 'Strand', tooltip: '+ or - (optional)' }
  ],
  vcf: [
    { name: 'CHROM', tooltip: 'Chromosome' },
    { name: 'POS', tooltip: 'Position (1-based)' },
    { name: 'ID', tooltip: 'Variant identifier' },
    { name: 'REF', tooltip: 'Reference allele' },
    { name: 'ALT', tooltip: 'Alternate allele(s)' },
    { name: 'QUAL', tooltip: 'Quality score' },
    { name: 'FILTER', tooltip: 'Filter status' },
    { name: 'INFO', tooltip: 'Additional information' }
  ],
  sam: [
    { name: 'QNAME', tooltip: 'Query template name' },
    { name: 'FLAG', tooltip: 'Bitwise flag' },
    { name: 'RNAME', tooltip: 'Reference sequence name' },
    { name: 'POS', tooltip: 'Position (1-based)' },
    { name: 'MAPQ', tooltip: 'Mapping quality' },
    { name: 'CIGAR', tooltip: 'CIGAR string' },
    { name: 'RNEXT', tooltip: 'Next read reference' },
    { name: 'PNEXT', tooltip: 'Next read position' },
    { name: 'TLEN', tooltip: 'Template length' },
    { name: 'SEQ', tooltip: 'Sequence' },
    { name: 'QUAL', tooltip: 'Quality string' }
  ],
  gtf: [
    { name: 'Seqname', tooltip: 'Chromosome or scaffold' },
    { name: 'Source', tooltip: 'Annotation source' },
    { name: 'Feature', tooltip: 'Feature type' },
    { name: 'Start', tooltip: 'Start position (1-based)' },
    { name: 'End', tooltip: 'End position' },
    { name: 'Score', tooltip: 'Score value' },
    { name: 'Strand', tooltip: '+ or -' },
    { name: 'Frame', tooltip: 'Reading frame' },
    { name: 'Attributes', tooltip: 'Gene/transcript IDs' }
  ]
};
```

---

## 4. Implementação: SequenceViewer

### Para FASTA e FASTQ

#### Features Propostas

| Feature | Descrição |
|---------|-----------|
| **Header highlight** | Lines starting with `>` or `@` in blue |
| **Sequence coloring** | A=green, T=red, G=yellow, C=blue |
| **Quality visualization** | FASTQ quality as gradient bar |
| **Copy button** | Copy sequence to clipboard |

#### Proposta Visual FASTA

```
┌─────────────────────────────────────────────────────────────────────┐
│ 🧬 example.fasta                                   4 linhas • FASTA │
├─────────────────────────────────────────────────────────────────────┤
│ 1 │ >seq1 description                               [HEADER]        │
│ 2 │ ACGTACGTACGT                                    [SEQUENCE]      │
│ 3 │ >seq2 description                               [HEADER]        │
│ 4 │ TGCATGCATGCA                                    [SEQUENCE]      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 5. Opções de Bibliotecas

### Opção A: Implementação Custom (Recomendada)

**Prós:**
- Zero dependências adicionais
- Controle total sobre o design
- Performance otimizada para casos específicos

**Contras:**
- Mais código para manter

**Estimativa:** ~300 linhas de código

---

### Opção B: react-syntax-highlighter

```bash
npm install react-syntax-highlighter
```

**Prós:**
- Syntax highlight out-of-the-box
- 200+ linguagens suportadas

**Contras:**
- Não tem suporte nativo para formatos bioinformáticos
- Bundle size: ~150KB

---

### Opção C: Monaco Editor (VS Code)

```bash
npm install @monaco-editor/react
```

**Prós:**
- Editor completo com line numbers
- Extensível com linguagens custom

**Contras:**
- Bundle size: ~2MB
- Overkill para read-only
- Complexidade de configuração

---

### Opção D: Prism.js

```bash
npm install prismjs
```

**Prós:**
- Leve (~30KB)
- Fácil de customizar

**Contras:**
- Sem suporte a formatos bioinformáticos
- Precisa criar gramáticas custom

---

## 6. Recomendação Final

### Abordagem Híbrida

| Componente | Implementação |
|------------|---------------|
| **TabularViewer** | Custom (tabela HTML com tooltips) |
| **SequenceViewer** | Custom (regex para highlight) |
| **CodeViewer** | Manter `CodeBlock.tsx` atual |

### Arquivos a Criar

```
src/components/viewers/
├── FormatViewer.tsx       # Router inteligente
├── TabularViewer.tsx      # Para formatos tabulares
├── SequenceViewer.tsx     # Para FASTA/FASTQ
├── columnDefinitions.ts   # Definições de colunas
└── index.ts               # Barrel export
```

---

## 7. Plano de Implementação

### Fase 1: Fundação
- [ ] Criar diretório `src/components/viewers/`
- [ ] Criar `columnDefinitions.ts` com mapeamentos
- [ ] Criar `FormatViewer.tsx` (router)

### Fase 2: TabularViewer
- [ ] Implementar parsing de TSV/tab-delimited
- [ ] Renderizar como `<table>` com headers
- [ ] Adicionar tooltips nos headers
- [ ] Destacar linhas alternadas

### Fase 3: SequenceViewer
- [ ] Detectar FASTA/FASTQ
- [ ] Highlight em headers (`>` e `@`)
- [ ] Colorir nucleotídeos (opcional)

### Fase 4: Integração
- [ ] Atualizar `FormatDetail.tsx`
- [ ] Substituir `CodeBlock` por `FormatViewer`
- [ ] Testar todos os 10 formatos

---

## 8. Exemplo de Código: TabularViewer

```tsx
interface TabularViewerProps {
  content: string;
  format: 'gff' | 'bed' | 'vcf' | 'sam' | 'gtf';
  filename?: string;
}

const TabularViewer: React.FC<TabularViewerProps> = ({ content, format, filename }) => {
  const columns = COLUMN_DEFINITIONS[format];
  const rows = content.split('\n').filter(line => !line.startsWith('#'));
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm font-mono">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-2 py-1 text-gray-500">#</th>
            {columns.map((col, idx) => (
              <th 
                key={idx} 
                className="px-3 py-2 text-left"
                title={col.tooltip}
              >
                {col.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-gray-50' : ''}>
              <td className="px-2 py-1 text-gray-400">{rowIdx + 1}</td>
              {row.split('\t').map((cell, cellIdx) => (
                <td key={cellIdx} className="px-3 py-1 truncate max-w-xs">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
```

---

## 9. Estimativa de Esforço

| Tarefa | Tempo Estimado |
|--------|----------------|
| Estrutura base | 30 min |
| TabularViewer | 1-2 horas |
| SequenceViewer | 1 hora |
| Integração e testes | 1 hora |
| **Total** | **~4 horas** |

---

## 10. Decisão Requerida

1. **Implementar solução custom?** (Recomendado)
2. **Usar biblioteca externa?** (Qual?)
3. **Priorizar TabularViewer primeiro?** (GFF, BED, VCF)
4. **Adicionar cores nos nucleotídeos?** (FASTA/FASTQ)

> **Aguardando aprovação para prosseguir com a implementação.**
