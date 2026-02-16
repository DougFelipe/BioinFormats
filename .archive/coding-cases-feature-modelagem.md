# Modelagem da Feature "Coding Cases"

## Data de Criação
15 de Fevereiro de 2026

---

## 1. Visão Geral da Feature

A feature "Coding Cases" adiciona uma nova seção às páginas de detalhes de formatos bioinformáticos, fornecendo comandos shell práticos e úteis para manipular cada tipo de arquivo. Esta funcionalidade permite que usuários aprendam rapidamente como trabalhar com formatos específicos através de exemplos de código real.

### Objetivos
- Fornecer comandos práticos e prontos para uso para cada formato de arquivo
- Organizar comandos por tipo de operação (Reading, Filtering, Conversion, etc.)
- Incluir explicações detalhadas dos parâmetros e casos de uso
- Integrar-se naturalmente ao fluxo existente da página FormatDetail

---

## 2. Estrutura de Componentes

### 2.1 Componente Principal: CodingCasesSection

**Localização:** `src/components/CodingCasesSection.tsx`

**Responsabilidades:**
- Agrupar casos de código por categoria de operação
- Renderizar cards para cada comando com formatação apropriada
- Aplicar cores dinâmicas baseadas no tipo de operação
- Exibir informações adicionais (parâmetros e casos de uso) de forma organizada

**Props:**
```typescript
interface CodingCasesSectionProps {
  cases: CodingCase[];
  className?: string;
}
```

**Estrutura Visual:**
```
CodingCasesSection
├── Para cada categoria (operation)
│   ├── Header com badge colorido + ícone Code
│   ├── Linha divisória
│   └── Cards de casos
│       ├── Título do caso
│       ├── Bloco de comando (fundo escuro, fonte mono)
│       ├── Descrição
│       ├── Explicação de parâmetros (caixa azul com ícone Info)
│       └── Caso de uso (bordado superior, texto itálico)
```

**Mapeamento de Cores por Operação:**
| Operação | Classe CSS |
|----------|------------|
| Reading | `bg-blue-100 text-blue-800` |
| Filtering | `bg-purple-100 text-purple-800` |
| Conversion | `bg-green-100 text-green-800` |
| Statistics | `bg-orange-100 text-orange-800` |
| Manipulation | `bg-pink-100 text-pink-800` |
| Indexing | `bg-indigo-100 text-indigo-800` |
| Quality Control | `bg-yellow-100 text-yellow-800` |
| Sorting | `bg-teal-100 text-teal-800` |

---

## 3. Estrutura de Dados

### 3.1 Interface TypeScript: CodingCase

**Localização:** `src/types/index.ts`

```typescript
export interface CodingCase {
  operation: string;           // Categoria: Reading, Filtering, etc.
  title: string;               // Título descritivo do comando
  command: string;             // Comando shell completo
  description: string;         // O que o comando faz
  parameters_explanation?: string;  // Explicação dos parâmetros (opcional)
  use_case?: string;          // Quando/por que usar (opcional)
}
```

### 3.2 Extensão da Interface FileFormat

```typescript
export interface FileFormat {
  // ... campos existentes
  coding_cases?: CodingCase[];  // Nova propriedade opcional
}
```

---

## 4. Estrutura de Conteúdo YAML

### 4.1 Schema para coding_cases

**Localização nos arquivos:** `src/data/formats/*.yaml`

**Estrutura:**
```yaml
coding_cases:
  - operation: Reading
    title: View BAM file content
    command: samtools view alignment.bam | head
    description: Displays the first 10 alignment records from a BAM file in SAM format.
    parameters_explanation: "view: converts BAM to SAM output; | head: shows only first 10 lines"
    use_case: Quick inspection of BAM file content to verify data integrity or format.
    
  - operation: Filtering
    title: Extract mapped reads only
    command: samtools view -b -F 4 alignment.bam > mapped_only.bam
    description: Filters out unmapped reads, keeping only those that aligned to the reference.
    parameters_explanation: "-b: outputs in BAM format; -F 4: excludes reads with flag 4 (unmapped)"
    use_case: Reduce file size and focus analysis on successfully aligned sequences.
```

### 4.2 Categorias de Operações Recomendadas

1. **Reading** - Visualizar conteúdo do arquivo
2. **Filtering** - Filtrar dados por critérios específicos
3. **Conversion** - Converter entre formatos
4. **Statistics** - Calcular estatísticas e métricas
5. **Manipulation** - Modificar, ordenar, mesclar arquivos
6. **Indexing** - Criar índices para acesso rápido
7. **Sorting** - Ordenar dados
8. **Quality Control** - Avaliação de qualidade

---

## 5. Integração na Página FormatDetail

### 5.1 Localização na Hierarquia

**Arquivo:** `src/pages/FormatDetail.tsx`

**Posição na página:**
```
FormatDetail
├── Header (informações do formato)
├── File Content Example (FormatViewer)
├── Interpretative Explanation (colapsável)
├── Typical Usage Workflows (colapsável)
├── **Coding Cases (colapsável)** ← NOVA SEÇÃO
├── Technical Notes (se existir)
└── References
```

### 5.2 Implementação do Dropdown

```tsx
{/* Coding Cases Dropdown */}
{format.coding_cases && format.coding_cases.length > 0 && (
  <details className="shadow-lg rounded-xl bg-white border border-gray-200">
    <summary className="cursor-pointer select-none px-6 py-4 text-lg font-semibold text-gray-900 flex items-center justify-between">
      <span className="flex items-center">
        <Code className="h-5 w-5 mr-2 text-gray-600" />
        Coding Cases
      </span>
      <span className="ml-2 text-gray-400">▼</span>
    </summary>
    <div className="px-6 pb-6 pt-2">
      <CodingCasesSection
        cases={format.coding_cases}
        className=""
      />
    </div>
  </details>
)}
```

### 5.3 Renderização Condicional

A seção só é exibida se:
- `format.coding_cases` existe (não é undefined)
- `format.coding_cases.length > 0` (tem pelo menos um caso)

---

## 6. Exemplos de Conteúdo por Formato

### 6.1 BAM Format (14 casos de código)

**Categorias implementadas:**
- **Reading** (2 casos): visualizar conteúdo e header
- **Indexing** (1 caso): criar índice .bai
- **Sorting** (1 caso): ordenar por coordenadas
- **Filtering** (4 casos): filtrar por mapeamento, região, qualidade, PASS
- **Statistics** (2 casos): flagstat, depth de cobertura
- **Conversion** (2 casos): BAM→SAM, BAM→FASTQ
- **Manipulation** (2 casos): merge, remover duplicatas

**Ferramentas utilizadas:** samtools

### 6.2 VCF Format (14 casos de código)

**Categorias implementadas:**
- **Reading** (2 casos): visualizar header e variantes
- **Filtering** (6 casos): região, qualidade, SNPs, frequência alélica, PASS
- **Statistics** (2 casos): contar variantes, calcular AF
- **Conversion** (2 casos): tab-delimited, compress+index
- **Manipulation** (2 casos): merge, normalizar, remover duplicatas

**Ferramentas utilizadas:** bcftools, bgzip, tabix

### 6.3 FASTA Format (15 casos de código)

**Categorias implementadas:**
- **Reading** (2 casos): visualizar, contar sequências
- **Statistics** (2 casos): estatísticas gerais, GC content
- **Filtering** (4 casos): por tamanho, por ID, duplicatas, GC range
- **Manipulation** (6 casos): single-line, rev-comp, translate, sort, subseq, concat
- **Conversion** (1 caso): FASTA→TSV

**Ferramentas utilizadas:** seqkit, grep, head, cat, awk

---

## 7. Padrões de Design e Estilização

### 7.1 Padrões Visuais Aplicados

**Cards de Casos:**
```css
bg-gray-50 rounded-lg p-5 border border-gray-200 
hover:border-gray-300 transition-colors
```

**Blocos de Comando:**
```css
bg-gray-900 text-gray-100 p-4 rounded-md 
overflow-x-auto text-sm font-mono shadow-inner
```

**Caixa de Parâmetros:**
```css
bg-blue-50 border border-blue-200 rounded-md p-3
```

**Badges de Categoria:**
```css
inline-flex items-center px-3 py-1 rounded-full 
text-sm font-semibold
```

### 7.2 Hierarquia de Informações

1. **Categoria/Operação** (badge + divisória horizontal)
2. **Título** (semibold, text-base)
3. **Comando** (bloco escuro destacado)
4. **Descrição** (texto normal)
5. **Parâmetros** (caixa azul opcional)
6. **Caso de Uso** (itálico, bordado superior, opcional)

### 7.3 Responsividade

- Comandos longos: `overflow-x-auto` permite scroll horizontal
- Layout flex: adapta-se a diferentes tamanhos de tela
- Cards: mantêm padding consistente em mobile e desktop

---

## 8. Fluxo de Dados

### 8.1 Carregamento dos Dados

```
1. Vite carrega YAML files via import.meta.glob
2. formatLoader.ts processa arquivos YAML
3. Dados são tipados como FileFormat[]
4. FormatDetail recebe array de formatos via props
5. Busca formato específico por extension
6. Passa format.coding_cases para CodingCasesSection
```

### 8.2 Renderização do Componente

```
1. CodingCasesSection recebe array de CodingCase
2. Agrupa casos por .operation usando reduce
3. Para cada categoria:
   - Renderiza header com badge colorido
   - Itera sobre casos da categoria
   - Renderiza card com comando e informações
4. Aplica condicionalmente blocos opcionais (parâmetros, caso de uso)
```

---

## 9. Decisões de Design

### 9.1 Linguagens Suportadas
**Decisão:** Shell/Bash apenas  
**Justificativa:** Foco em ferramentas CLI bioinformáticas padrão (samtools, bcftools, seqkit) que são amplamente adotadas na comunidade.

### 9.2 Organização de Comandos
**Decisão:** Por operação (Reading, Filtering, etc.)  
**Justificativa:** Facilita encontrar solução para tarefa específica sem precisar conhecer a ferramenta. Mais intuitivo para iniciantes.

### 9.3 Localização na Página
**Decisão:** Após "Workflows", antes de "Technical Notes"  
**Justificativa:** Sequência lógica: entender formato → ver workflows → aprender comandos práticos → consultar referências.

### 9.4 Campos Opcionais
**Decisão:** `parameters_explanation` e `use_case` opcionais  
**Justificativa:** Flexibilidade para comandos simples vs complexos. Permite adicionar detalhes onde necessário sem tornar verboso comandos óbvios.

---

## 10. Extensibilidade Futura

### 10.1 Novos Formatos
Para adicionar coding cases a um novo formato:
1. Adicionar seção `coding_cases:` ao arquivo YAML do formato
2. Seguir schema definido (operation, title, command, description)
3. Usar categorias de operação padronizadas
4. Garantir comandos funcionais e testados

### 10.2 Novas Categorias
Para adicionar nova categoria de operação:
1. Definir cor no `operationColors` em CodingCasesSection.tsx
2. Usar a nova categoria nos YAMLs
3. Documentar categoria neste arquivo

### 10.3 Funcionalidades Adicionais
Possíveis melhorias futuras:
- Botão "Copy to clipboard" para comandos
- Sintaxe highlighting mais sofisticado com biblioteca
- Links para documentação das ferramentas
- Badge indicando dependências (ferramentas necessárias)
- Filtro/busca dentro dos coding cases
- Suporte a múltiplas linguagens (Python, R) com tabs

---

## 11. Checklist de Verificação

### 11.1 Implementação Completa
- [x] Interface `CodingCase` criada em types/index.ts
- [x] Campo `coding_cases` adicionado a `FileFormat`
- [x] Componente `CodingCasesSection` implementado
- [x] Integração em `FormatDetail.tsx`
- [x] Import do ícone `Code` de lucide-react
- [x] Dados populados em bam.yaml (14 casos)
- [x] Dados populados em vcf.yaml (14 casos)
- [x] Dados populados em fasta.yaml (15 casos)
- [x] Renderização condicional implementada
- [x] Sem erros TypeScript
- [x] Servidor dev rodando sem erros

### 11.2 Qualidade dos Dados
- [x] Comandos testados e funcionais
- [x] Descrições claras e concisas
- [x] Parâmetros explicados quando relevante
- [x] Casos de uso contextualizados
- [x] Categorias apropriadas por operação
- [x] Diversidade de operações cobertas

### 11.3 Padrões Visuais
- [x] Cores consistentes por categoria
- [x] Estilo de código seguindo padrão do projeto
- [x] Responsividade testada
- [x] Hierarquia visual clara
- [x] Alinhamento com componentes existentes

---

## 12. Manutenção e Atualização

### 12.1 Adicionando Novos Comandos
1. Editar arquivo YAML do formato em `src/data/formats/`
2. Adicionar novo objeto no array `coding_cases:`
3. Preencher todos os campos obrigatórios
4. Testar comando antes de documentar
5. Verificar no navegador após salvar

### 12.2 Modificando Estilos
Principais arquivos:
- `src/components/CodingCasesSection.tsx` (estilos inline com Tailwind)
- Classes CSS relevantes definidas inline no JSX

### 12.3 Debugging
Áreas comuns de problemas:
- YAML syntax: verificar indentação e aspas
- TypeScript types: checar se campos obrigatórios estão presentes
- Renderização condicional: verificar se `coding_cases` não está undefined

---

## 13. Referências Técnicas

### 13.1 Tecnologias Utilizadas
- **React 18** - Framework de UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Vite** - Build tool
- **lucide-react** - Biblioteca de ícones
- **YAML** - Formato de dados

### 13.2 Ferramentas Bioinformáticas Documentadas
- **samtools** - Manipulação de BAM/SAM
- **bcftools** - Manipulação de VCF/BCF
- **seqkit** - Manipulação de FASTA/FASTQ
- **bgzip/tabix** - Compressão e indexação
- **grep/awk/cat** - Utilitários Unix padrão

---

## 14. Métricas da Implementação

### 14.1 Linhas de Código Adicionadas
- **CodingCasesSection.tsx**: ~125 linhas
- **types/index.ts**: ~8 linhas
- **FormatDetail.tsx**: ~18 linhas
- **bam.yaml**: ~80 linhas
- **vcf.yaml**: ~90 linhas
- **fasta.yaml**: ~95 linhas

**Total:** ~416 linhas de código

### 14.2 Casos de Código Criados
- BAM: 14 casos
- VCF: 14 casos
- FASTA: 15 casos

**Total:** 43 casos de código documentados

### 14.3 Categorias Cobertas
8 categorias distintas de operação implementadas

---

## Conclusão

A feature "Coding Cases" foi implementada com sucesso, fornecendo uma biblioteca rica de comandos práticos para formatos bioinformáticos. A estrutura é extensível, bem documentada e integra-se naturalmente ao design existente da aplicação BioinFormats.

O sistema permite que usuários, desde iniciantes até experientes, encontrem rapidamente comandos shell úteis para trabalhar com seus arquivos bioinformáticos, acelerando o aprendizado e a produtividade na análise de dados biológicos.
