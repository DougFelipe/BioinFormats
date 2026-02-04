# Implementação do Loader YAML

## Abordagem para Carregamento de Arquivos YAML no React/Vite

Este documento descreve as opções de implementação para carregar arquivos YAML na aplicação BioinFormats.

---

## Opção 1: Plugin Vite para YAML (Recomendada)

### Instalação

```bash
npm install -D @rollup/plugin-yaml
```

### Configuração (`vite.config.ts`)

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

### Uso no Código

```typescript
// Importação direta de YAML (será convertido para JSON em build time)
import areasData from './data/areas.yaml';
import faqData from './data/faq.yaml';
import glossaryData from './data/glossary.yaml';

// Para formatos individuais
import bamFormat from './data/formats/bam.yaml';
import fastaFormat from './data/formats/fasta.yaml';
```

### Declaração de Tipos

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

## Opção 2: Loader Dinâmico para Formatos

Para carregar todos os formatos do diretório `formats/`, é necessário um loader dinâmico.

### Implementação (`src/utils/formatLoader.ts`)

```typescript
import type { FileFormat } from '../types';

// Glob import de todos os arquivos YAML no diretório formats/
// Vite suporta import.meta.glob para dynamic imports
const formatModules = import.meta.glob('../data/formats/*.yaml', { 
  eager: true,
  import: 'default'
});

/**
 * Carrega todos os formatos de arquivo do diretório data/formats/
 * @returns Array de FileFormat
 */
export function loadAllFormats(): FileFormat[] {
  const formats: FileFormat[] = [];
  
  for (const path in formatModules) {
    const formatData = formatModules[path] as FileFormat;
    formats.push(formatData);
  }
  
  // Ordena alfabeticamente por extensão
  return formats.sort((a, b) => a.extension.localeCompare(b.extension));
}

/**
 * Carrega um formato específico por extensão
 * @param extension - Extensão do formato (e.g., 'bam', 'fasta')
 * @returns FileFormat ou undefined
 */
export function loadFormatByExtension(extension: string): FileFormat | undefined {
  const formats = loadAllFormats();
  return formats.find(f => f.extension === extension);
}
```

### Uso no `App.tsx`

```typescript
import React, { useState, useEffect } from 'react';
import { loadAllFormats } from './utils/formatLoader';
import type { FileFormat, BioinformaticsArea } from './types';

// Importações diretas para arquivos únicos
import areasYaml from './data/areas.yaml';
import faqYaml from './data/faq.yaml';
import glossaryYaml from './data/glossary.yaml';

function App() {
  const [formats, setFormats] = useState<FileFormat[]>([]);
  const [areas] = useState<BioinformaticsArea[]>(
    (areasYaml as { areas: BioinformaticsArea[] }).areas
  );

  useEffect(() => {
    // Carrega todos os formatos dinamicamente
    const allFormats = loadAllFormats();
    setFormats(allFormats);
  }, []);

  // ... resto do componente
}
```

---

## Opção 3: Script de Build para Agregar YAML

Se preferir manter a estrutura atual de importação de um único arquivo JSON, pode-se criar um script de build que agrega os YAMLs em JSON.

### Script (`scripts/build-formats.ts`)

```typescript
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

const FORMATS_DIR = './src/data/formats';
const OUTPUT_FILE = './src/data/formats.generated.json';

interface FileFormat {
  extension: string;
  name: string;
  // ... outros campos
}

function buildFormatsJson(): void {
  const formats: FileFormat[] = [];
  
  const files = fs.readdirSync(FORMATS_DIR)
    .filter(f => f.endsWith('.yaml') || f.endsWith('.yml'));
  
  for (const file of files) {
    const filePath = path.join(FORMATS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const format = yaml.load(content) as FileFormat;
    formats.push(format);
  }
  
  // Ordena por extensão
  formats.sort((a, b) => a.extension.localeCompare(b.extension));
  
  // Escreve JSON agregado
  fs.writeFileSync(
    OUTPUT_FILE,
    JSON.stringify(formats, null, 2),
    'utf-8'
  );
  
  console.log(`Generated ${OUTPUT_FILE} with ${formats.length} formats`);
}

buildFormatsJson();
```

### Adição ao `package.json`

```json
{
  "scripts": {
    "prebuild": "tsx scripts/build-formats.ts",
    "predev": "tsx scripts/build-formats.ts",
    "build": "vite build",
    "dev": "vite"
  }
}
```

### Dependências Necessárias

```bash
npm install -D tsx js-yaml @types/js-yaml
```

---

## Comparação das Opções

| Aspecto | Plugin Vite | Loader Dinâmico | Script de Build |
|---------|-------------|-----------------|-----------------|
| Complexidade | Baixa | Média | Média |
| Hot Reload | ✅ Sim | ✅ Sim | ⚠️ Requer rerun |
| Bundle Size | Igual | Igual | Igual |
| Tipagem | Requer .d.ts | Requer cast | JSON nativo |
| Manutenção | Baixa | Média | Média |

---

## Recomendação

Para o projeto BioinFormats, recomendo a **combinação das Opções 1 e 2**:

1. **Plugin Vite YAML** para importação direta de arquivos únicos (`areas.yaml`, `faq.yaml`, `glossary.yaml`)

2. **Loader Dinâmico** (`import.meta.glob`) para agregar os formatos individuais do diretório `formats/`

### Vantagens

- Mantém a estrutura modular de YAML
- Hot reload funciona para todos os arquivos
- Código limpo sem scripts de pré-build
- Tipagem forte com type assertions

---

## Ajustes nos Tipos

### Atualização de `types/index.ts`

```typescript
// Wrapper para arquivos YAML de raiz
export interface AreasYaml {
  areas: BioinformaticsArea[];
}

export interface FaqYaml {
  categories: FaqCategory[];
}

export interface FaqCategory {
  name: string;
  items: FaqItem[];
}

export interface FaqItem {
  question: string;
  answer: string;
  link?: string;
}

export interface GlossaryYaml {
  terms: GlossaryTerm[];
}
```

### Uso com Tipagem

```typescript
import areasYaml from './data/areas.yaml';
import type { AreasYaml, BioinformaticsArea } from './types';

// Type assertion
const areas: BioinformaticsArea[] = (areasYaml as AreasYaml).areas;
```

---

## Validação de Schema (Opcional)

Para garantir integridade dos dados YAML, pode-se adicionar validação com JSON Schema ou Zod:

```typescript
import { z } from 'zod';

const FileFormatSchema = z.object({
  extension: z.string(),
  name: z.string(),
  area: z.array(z.string()),
  description: z.string(),
  example_filenames: z.array(z.string()),
  example_file_content: z.string(),
  example_file_explanation: z.array(z.string()),
  pipeline_examples: z.array(z.object({
    pipeline: z.string(),
    explanation: z.string()
  })),
  tools: z.array(z.string()),
  references: z.array(z.object({
    title: z.string(),
    url: z.string().url(),
    type: z.enum(['documentation', 'paper', 'tool', 'standard'])
  })),
  encoding_type: z.string(),
  used_in_repositories: z.array(z.string()).optional(),
  notes: z.string().optional()
});

export type FileFormat = z.infer<typeof FileFormatSchema>;
```
