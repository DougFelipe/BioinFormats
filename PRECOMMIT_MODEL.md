# PRECOMMIT_MODEL.md

## Entrega
Documento de especificação para política de pre-commit do projeto BioinFormats. Contém objetivos, escopo, ferramentas recomendadas, hooks sugeridos, exemplos de configuração (Husky + lint-staged), e recomendações para ajustar o workflow do GitHub Actions que causou o erro.

---

## 1 — Objetivo
Garantir qualidade e consistência do código e dos dados antes de cada commit/push. O objetivo é:

- Evitar que commits quebrem o CI (lint, build, validação de dados).
- Automatizar correções seguras (lint autofix, formatação) quando possível.
- Evitar que artefatos gerados (ex.: `validation-report.md`) provoquem falhas no CI.

## 2 — Escopo

- Código TS/TSX/JS: lint e formatação.
- Arquivos de dados: validação e organização (`src/data/**`).
- Geração de artefatos: `validation-report.md` é gerado no CI — não deve provocar commits falhos.

## 3 — Ferramentas recomendadas

- Husky (hooks Git)
- lint-staged (executar comandos apenas nos arquivos staged)
- eslint (já presente no projeto)
- scripts do projeto: `npm run lint`, `npm run validate-data`, `npm run organize-data`

## 4 — Política de hooks (alto nível)

- pre-commit (rápido, bloqueante):
  - rodar lint nos arquivos staged e aplicar `--fix` quando seguro;
  - rodar validação leve de dados (`npm run validate-data`) quando arquivos de `src/data` estiverem staged;
  - re-add de arquivos modificados (`git add`) para incluir autofixes no commit.

- pre-push (mais custoso):
  - rodar `npm run lint` completo;
  - opcional: rodar `npm run organize-data` localmente para manter `src/data` organizado; se gerar mudanças, preferir bloquear e pedir commit manual em vez de auto-commit.

Observação: preferir não fazer commits automáticos no hook para evitar surpresas no histórico; permitir autofix + re-add é aceitável para formatação/lint.

## 5 — Exemplo de configuração (passo-a-passo)

1) Instalar ferramentas (uma vez por desenvolvedor):

```powershell
npm install -D husky lint-staged
npx husky install
npm set-script prepare "husky install"
```

2) Adicionar hooks Husky:

```powershell
npx husky add .husky/pre-commit "npx --no-install lint-staged"
npx husky add .husky/pre-push "npm run prepush || exit 1"
```

3) Exemplo de scripts e `lint-staged` no `package.json` (trecho):

```json
{
  "scripts": {
    "lint": "eslint .",
    "validate-data": "node scripts/organize-data.cjs --validate-only",
    "organize-data": "node scripts/organize-data.cjs",
    "prepush": "npm run lint && npm run validate-data"
  },
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": [
      "npm run lint -- --fix",
      "git add"
    ],
    "src/data/**/*.json": [
      "npm run validate-data",
      "git add src/data"
    ]
  }
}
```

4) Exemplo do conteúdo de `.husky/pre-commit` (gerado pelo comando do Husky):

```sh
#!/usr/bin/env sh
. "$(dirname "$0")/_/husky.sh"

npx --no-install lint-staged
```

## 6 — Notas sobre `organize-data` e commits automáticos

- `organize-data` pode alterar muitos arquivos em `src/data/`.
- Recomendo NÃO fazer commit automático universal no hook. Em vez disso:
  - permitir que `organize-data` rode em pre-push apenas para checar (e bloquear se houver mudanças), ou
  - rodar `organize-data` em CI e, se houver alterações, que o CI confirme somente arquivos em `src/data/` (com token) — ver seção CI abaixo.

## 7 — Correção sugerida para o erro no workflow do GitHub Actions

Problema observado (fluxo atual):
- job `validate-data` gera `validation-report.md` no repositório de trabalho;
- job `organize-data` faz `git status --porcelain` sem filtro; `validation-report.md` aparece como untracked fazendo a condição ser verdadeira; o passo `Commit organized data` faz `git add src/data/` mas `src/data` pode não ter alterações staged, então `git commit` falha com exit code 1.

Opções de correção (escolha 1):

Opção A — Filtrar `git status` apenas para `src/data/` (recomendada):

Substituir o passo `Check for changes` por:

```yaml
- name: Check for changes
  id: verify-changed-files
  run: |
    if [ -n "$(git status --porcelain src/data)" ]; then
      echo "changed=true" >> $GITHUB_OUTPUT
    else
      echo "changed=false" >> $GITHUB_OUTPUT
    fi
```

Isto garante que apenas alterações em `src/data` disparem o commit.

Opção B — Adicionar `validation-report.md` ao `.gitignore` (se o relatório não precisa ser versionado)

Adicionar no `.gitignore`:

```
validation-report.md
```

Opção C — Incluir o arquivo gerado no `git add` durante o passo de commit (não recomendado na maioria dos casos):

```yaml
git add src/data/ validation-report.md
git commit -m "🤖 Auto-organize data alphabetically [skip ci]"
git push
```

Recomendação: usar Opção A + adicionar `validation-report.md` ao `.gitignore` se o relatório for puramente artifact.

## 8 — Critérios de sucesso para a política

- Hooks bloqueiam commits com erros críticos de lint ou falhas de validação de dados.
- Hooks são rápidos (pre-commit) e apenas o pre-push roda tarefas mais custosas.
- CI não quebra por causa de artefatos gerados que não estejam sob `src/data/`.

## 9 — Próximos passos (implementação)

Se você aprovar o modelo eu implemento as mudanças:

- Adicionar `husky` + `lint-staged` no `package.json` e criar `.husky/*` (pre-commit, pre-push);
- Ajustar `data-validation.yml` para a Opção A (filtrar `git status` para `src/data`);
- Opcional: adicionar `validation-report.md` ao `.gitignore` (se desejar);
- Testar localmente e rodar lint para verificar que os hooks funcionam.

---

Se concordar com esse modelo, diga qual opção de CI prefere (A: filtrar `git status` — recomendado; B: adicionar `validation-report.md` ao git; C: adicionar ao `.gitignore`) e se quer que eu implemente agora.
