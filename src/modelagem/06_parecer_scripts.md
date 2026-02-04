# Parecer: Scripts Deprecated após Migração YAML

> **Data:** 03/02/2026  
> **Contexto:** Avaliação dos scripts em `scripts/` após migração JSON → YAML

---

## Resumo Executivo

**Todos os scripts no diretório `scripts/` estão DEPRECATED** pois foram projetados exclusivamente para manipulação de arquivos `.json` que já não existem mais.

---

## Scripts Analisados

### 📁 Estrutura Atual

```
scripts/
├── organize-data.cjs          ❌ DEPRECATED
├── SCRIPTS_DOCUMENTATION.md   ❌ DEPRECATED
├── validators/
│   ├── area-validator.cjs     ❌ DEPRECATED
│   ├── format-validator.cjs   ❌ DEPRECATED
│   └── glossary-validator.cjs ❌ DEPRECATED
├── sorters/
│   ├── area-sorter.cjs        ❌ DEPRECATED
│   ├── format-sorter.cjs      ❌ DEPRECATED
│   └── glossary-sorter.cjs    ❌ DEPRECATED
└── utils/
    ├── file-handler.cjs       ❌ DEPRECATED
    └── logger.cjs             ⚠️ POTENCIAL REUSO
```

---

## Análise Detalhada

### `organize-data.cjs` (Script Principal)

| Aspecto | Valor |
|---------|-------|
| **Status** | ❌ Deprecated |
| **Motivo** | Carrega `.json` hardcoded (linhas 29-31) |
| **Dependência** | `areas.json`, `formats.json`, `glossary.json` |

```javascript
// Linhas problemáticas:
const AREAS_FILE = path.join(DATA_DIR, 'areas.json');
const FORMATS_FILE = path.join(DATA_DIR, 'formats.json');
const GLOSSARY_FILE = path.join(DATA_DIR, 'glossary.json');
```

### Validators (3 arquivos)

| Arquivo | Propósito | Status |
|---------|-----------|--------|
| `area-validator.cjs` | Valida estrutura do `areas.json` | ❌ Deprecated |
| `format-validator.cjs` | Valida `formats.json` monolítico | ❌ Deprecated |
| `glossary-validator.cjs` | Valida `glossary.json` | ❌ Deprecated |

> **Nota:** Com YAML modular, a validação é feita pelo TypeScript em tempo de compilação.

### Sorters (3 arquivos)

| Arquivo | Propósito | Status |
|---------|-----------|--------|
| `area-sorter.cjs` | Ordena `areas.json` | ❌ Deprecated |
| `format-sorter.cjs` | Ordena `formats.json` | ❌ Deprecated |
| `glossary-sorter.cjs` | Ordena `glossary.json` | ❌ Deprecated |

> **Nota:** Com YAML modular, cada formato é um arquivo separado (ordenação natural por nome de arquivo).

### Utils (2 arquivos)

| Arquivo | Propósito | Status |
|---------|-----------|--------|
| `file-handler.cjs` | `loadJSON()`, `saveJSON()` | ❌ Deprecated |
| `logger.cjs` | Utilitário de logging | ⚠️ Reutilizável |

---

## Recomendação

### Opção 1: Remoção Completa (Recomendada)

Remover todo o diretório `scripts/`:

```bash
rm -rf scripts/
```

**Justificativa:**
- Scripts não funcionam mais (arquivos JSON não existem)
- Validação agora é feita pelo TypeScript
- Ordenação é natural (arquivos individuais em `formats/`)
- Menos código para manter

### Opção 2: Manter para Referência Histórica

Mover para `.archive/`:

```bash
mkdir -p .archive
mv scripts .archive/scripts-deprecated
```

---

## Scripts NPM a Remover do `package.json`

Após remoção dos scripts, atualizar `package.json`:

```diff
- "organize-data": "node scripts/organize-data.cjs",
- "validate-data": "node scripts/organize-data.cjs --validate-only",
- "force-organize": "node scripts/organize-data.cjs --force",
- "prepush": "npm run lint && npm run validate-data",
+ "prepush": "npm run lint",
```

---

## Alternativa Futura

Se validação programática for necessária no futuro, considere:

1. **YAML Schema Validation** via `ajv` ou `yaml-validator`
2. **TypeScript Types** já fazem validação em build-time
3. **ESLint plugin para YAML** (opcional)

---

## Conclusão

| Ação | Arquivos | Impacto |
|------|----------|---------|
| **Remover** | 10 arquivos | Elimina código morto |
| **Atualizar** | `package.json` | Remove 4 scripts |
| **Manter** | Nenhum | Sem utilidade atual |

**Decisão recomendada:** Remoção completa do diretório `scripts/`.
