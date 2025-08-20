# PRECOMMIT_ROLLOUT.md

Este documento descreve passos adicionais para testar, validar e fazer rollout da política de pre-commit que foi modelada em `PRECOMMIT_MODEL.md`.

## Objetivo
Descrever passos práticos para validar localmente, testar no CI e fazer rollout seguro da nova política de pre-commit (Husky + lint-staged) e da correção no workflow CI (filtro em `git status src/data`).

## Passos locais (desenvolvedor)

1. Atualize dependências:

```powershell
npm install
```

2. Execute o script `prepare` para instalar hooks (ou `npx husky install`):

```powershell
npm run prepare
# ou
npx husky install
```

3. Simule um commit com arquivos staged para ver os hooks em ação:

```powershell
# Modifique algum arquivo de código ou dados
git add src/pages/Home.tsx
git commit -m "test: pre-commit hook"
```

4. Para testar pre-push (lint + validate-data):

```powershell
git push origin HEAD
# o hook pre-push vai rodar 'npm run prepush'
```

## Testes automatizados (CI)

1. Abra um branch de teste e faça um PR para `main` com mudanças em `src/data` e rode o workflow `Data Validation and Organization` no GitHub.
2. Verifique que o job `organize-data` apenas tenta commitar quando `src/data` realmente mudou (graças ao filtro `git status --porcelain src/data`).
3. Confirme que `validation-report.md` não faz o job acionar falsamente o commit.

## Rollout (recomendado)

1. Merge das mudanças em branch `main` somente após revisão.
2. Notifique a equipe para executar `npm install` e `npm run prepare` localmente.
3. Monitorar os primeiros pushes/PRs para ajustar velocidade dos hooks, se necessário.

## Rollback

- Para reverter rapidamente, revert commit com as mudanças no `package.json`, `.husky/` e no workflow.

## Observações adicionais

- O `.gitignore` já contém `validation-report.md` (confirmado) — portanto o artifact não deve aparecer no `git status` local.
- Se for necessário rastrear `validation-report.md`, ajustar o workflow para adicionar o arquivo explicitamente ao commit.

---

Fim do documento.
