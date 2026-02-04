# Plano de Migração JSON → YAML

## Checklist de Implementação

Este documento apresenta o plano de migração passo a passo para converter a estrutura de dados de JSON para YAML.

---

## Fase 1: Preparação

### 1.1 Instalar Dependências

```bash
# Plugin para suporte a YAML no Vite
npm install -D @rollup/plugin-yaml

# Opcional: para script de conversão
npm install -D js-yaml @types/js-yaml tsx
```

### 1.2 Configurar Vite

Editar `vite.config.ts`:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import yaml from '@rollup/plugin-yaml';

export default defineConfig({
  plugins: [
    react(),
    yaml()
  ]
});
```

### 1.3 Criar Declaração de Tipos YAML

Criar `src/types/yaml.d.ts`:

```typescript
declare module '*.yaml' {
  const data: unknown;
  export default data;
}

declare module '*.yml' {
  const data: unknown;
  export default data;
}
```

---

## Fase 2: Conversão dos Arquivos

### 2.1 Criar Diretório de Formatos

```bash
mkdir src/data/formats
```

### 2.2 Converter `areas.json` → `areas.yaml`

**Antes** (`areas.json`):
```json
[
  { "id": "genomics", "name": "Genomics" }
]
```

**Depois** (`areas.yaml`):
```yaml
areas:
  - id: genomics
    name: Genomics
```

### 2.3 Converter `faq.json` → `faq.yaml`

**Antes** (`faq.json`):
```json
[
  {
    "category": "General",
    "items": [
      { "question": "...", "answer": "..." }
    ]
  }
]
```

**Depois** (`faq.yaml`):
```yaml
categories:
  - name: General
    items:
      - question: ...
        answer: |
          Multi-line answer here
```

### 2.4 Converter `glossary.json` → `glossary.yaml`

**Depois** (`glossary.yaml`):
```yaml
terms:
  - id: alignment
    term: Alignment
    # ...
```

### 2.5 Dividir `formats.json` em Arquivos Individuais

Para cada formato, criar arquivo em `src/data/formats/`:

| Formato | Arquivo |
|---------|---------|
| BAM | `formats/bam.yaml` |
| BED | `formats/bed.yaml` |
| CRAM | `formats/cram.yaml` |
| FASTA | `formats/fasta.yaml` |
| FASTQ | `formats/fastq.yaml` |
| GFF | `formats/gff.yaml` |
| GTF | `formats/gtf.yaml` |
| SAM | `formats/sam.yaml` |
| VCF | `formats/vcf.yaml` |
| WIG | `formats/wig.yaml` |

---

## Fase 3: Implementar Loader

### 3.1 Criar Loader de Formatos

Criar `src/utils/formatLoader.ts`:

```typescript
import type { FileFormat } from '../types';

const formatModules = import.meta.glob('../data/formats/*.yaml', { 
  eager: true,
  import: 'default'
});

export function loadAllFormats(): FileFormat[] {
  const formats: FileFormat[] = [];
  
  for (const path in formatModules) {
    formats.push(formatModules[path] as FileFormat);
  }
  
  return formats.sort((a, b) => a.extension.localeCompare(b.extension));
}
```

### 3.2 Atualizar Tipos

Editar `src/types/index.ts` para adicionar wrappers:

```typescript
export interface AreasYaml {
  areas: BioinformaticsArea[];
}

export interface FaqYaml {
  categories: FaqCategory[];
}

export interface GlossaryYaml {
  terms: GlossaryTerm[];
}
```

---

## Fase 4: Atualizar Componentes

### 4.1 Atualizar `App.tsx`

```typescript
// Antes
import formatsData from './data/formats.json';
import areasData from './data/areas.json';

// Depois
import areasYaml from './data/areas.yaml';
import { loadAllFormats } from './utils/formatLoader';
import type { AreasYaml, FileFormat, BioinformaticsArea } from './types';

function App() {
  const [formats, setFormats] = useState<FileFormat[]>([]);
  const areas = (areasYaml as AreasYaml).areas;

  useEffect(() => {
    setFormats(loadAllFormats());
  }, []);
  
  // ...
}
```

### 4.2 Atualizar `pages/Faq.tsx`

```typescript
// Antes
import faqData from '../data/faq.json';

// Depois
import faqYaml from '../data/faq.yaml';
import type { FaqYaml } from '../types';

const faqData = (faqYaml as FaqYaml).categories;
```

### 4.3 Atualizar `pages/Glossary.tsx`

```typescript
// Antes
import glossaryJSON from "../data/glossary.json";
const glossary = glossaryJSON as GlossaryTerm[];

// Depois
import glossaryYaml from "../data/glossary.yaml";
import type { GlossaryYaml, GlossaryTerm } from "../types";

const glossary = (glossaryYaml as GlossaryYaml).terms;
```

---

## Fase 5: Limpeza

### 5.1 Remover Arquivos JSON Antigos

```bash
rm src/data/formats.json
rm src/data/areas.json
rm src/data/faq.json
rm src/data/glossary.json
```

### 5.2 Atualizar `.gitignore` (se necessário)

Garantir que arquivos YAML não sejam ignorados:

```gitignore
# Não ignorar dados YAML
!src/data/**/*.yaml
```

---

## Fase 6: Validação

### 6.1 Build de Verificação

```bash
npm run build
```

### 6.2 Teste Local

```bash
npm run dev
```

### 6.3 Checklist de Validação

- [ ] Página inicial carrega todos os formatos
- [ ] Busca funciona corretamente
- [ ] Filtro por área funciona
- [ ] Detalhes de cada formato exibem corretamente
- [ ] Página de FAQ renderiza todas as categorias
- [ ] Glossário exibe todos os termos
- [ ] Build de produção completa sem erros

---

## Cronograma Estimado

| Fase | Duração Estimada | Dependências |
|------|------------------|--------------|
| 1. Preparação | 15 min | - |
| 2. Conversão | 45 min | Fase 1 |
| 3. Loader | 20 min | Fase 2 |
| 4. Componentes | 30 min | Fase 3 |
| 5. Limpeza | 5 min | Fase 4 |
| 6. Validação | 15 min | Fase 5 |
| **Total** | **~2h30** | |

---

## Rollback

Caso seja necessário reverter:

1. Restaurar arquivos JSON do Git:
   ```bash
   git checkout HEAD -- src/data/*.json
   ```

2. Reverter `App.tsx`, `Faq.tsx`, `Glossary.tsx`:
   ```bash
   git checkout HEAD -- src/App.tsx src/pages/
   ```

3. Remover plugin YAML do `vite.config.ts`

4. Remover diretório `formats/`:
   ```bash
   rm -rf src/data/formats
   ```

---

## Notas Finais

### Benefícios Pós-Migração

1. **Contribuição facilitada**: Adicionar formato = criar arquivo YAML
2. **Revisão de código**: Diffs mais legíveis
3. **Manutenção**: Comentários no código de dados
4. **Documentação**: YAML é auto-documentado

### Próximos Passos Sugeridos

1. Adicionar validação de schema (Zod ou JSON Schema)
2. Criar script de lint para validar YAML
3. Documentar processo de contribuição de novos formatos
4. Considerar i18n para descrições
