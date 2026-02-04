# Refatoração da Estrutura de Dados: JSON → YAML

## Visão Geral

Este documento descreve a proposta de refatoração da estrutura de dados do projeto **BioinFormats**, migrando de arquivos JSON para YAML com o objetivo de melhorar a manutenibilidade, legibilidade e escalabilidade do catálogo de formatos de bioinformática.

---

## Arquivos JSON Atuais

O diretório `src/data/` contém 4 arquivos JSON:

| Arquivo | Tamanho | Descrição |
|---------|---------|-----------|
| `formats.json` | ~20KB | Catálogo principal com 10 formatos de bioinformática |
| `areas.json` | ~876B | Lista de 12 áreas de bioinformática |
| `faq.json` | ~8KB | FAQ organizado em 4 categorias |
| `glossary.json` | ~5KB | Glossário com 12 termos técnicos |

---

## Motivação para Refatoração

### Problemas com a Estrutura Atual

1. **Arquivo `formats.json` monolítico**: Um único arquivo com todos os formatos torna difícil:
   - Edição colaborativa (conflitos de merge)
   - Revisão de código
   - Adição de novos formatos

2. **Sintaxe JSON verbosa**: Requer aspas em todas as chaves, não suporta comentários, strings multi-linha são difíceis

3. **Escalabilidade limitada**: À medida que mais formatos são adicionados, o arquivo cresce exponencialmente

### Benefícios do YAML

- **Legibilidade humana** superior
- Suporte a **comentários** (`#`)
- **Strings multi-linha** naturais (`|`, `>`)
- Menos ruído visual (sem aspas obrigatórias)
- Estrutura hierárquica mais clara

---

## Documentação Modular

A documentação desta refatoração está organizada em arquivos numerados para facilitar a navegação:

| # | Arquivo | Conteúdo |
|---|---------|----------|
| 00 | `00_visao_geral.md` | Este documento - visão geral da refatoração |
| 01 | `01_estrutura_atual.md` | Análise detalhada da estrutura JSON atual |
| 02 | `02_implementacao_formats.md` | Proposta de estrutura YAML para `formats/` |
| 03 | `03_implementacao_auxiliares.md` | Proposta YAML para `areas`, `faq`, `glossary` |
| 04 | `04_loader_yaml.md` | Implementação do loader TypeScript para YAML |
| 05 | `05_plano_migracao.md` | Plano de migração e checklist de implementação |

---

## Estrutura Proposta

```
src/data/
├── formats/           # Diretório com arquivos YAML individuais
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
├── faq.yaml           # FAQ categorizado
└── glossary.yaml      # Termos do glossário
```

---

## Próximos Passos

1. Revisar documento `01_estrutura_atual.md` para compreender a estrutura de dados
2. Avaliar propostas de modelagem YAML nos documentos 02-03
3. Implementar loader YAML conforme documento 04
4. Seguir plano de migração do documento 05
