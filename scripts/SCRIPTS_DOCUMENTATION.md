# Script de Organização de Dados - BioinFormats

Este documento descreve como usar o sistema de scripts para validação e organização dos dados do projeto BioinFormats.

## 📋 Visão Geral

O sistema de scripts automatiza:
- ✅ **Validação de integridade** dos dados
- 📝 **Ordenação alfabética** automática
- 🔍 **Detecção de inconsistências**
- 📊 **Geração de relatórios**

## 🚀 Comandos Disponíveis

### Comando Principal
```bash
npm run organize-data
```
Executa validação completa + organização alfabética (se não houver erros)

### Apenas Validação
```bash
npm run validate-data
```
Executa apenas a validação sem modificar os arquivos

### Forçar Organização
```bash
npm run force-organize
```
Força a organização mesmo se houver erros de validação

## 📁 Estrutura do Sistema

```
scripts/
├── organize-data.cjs          # Script principal
├── validators/               # Validadores por tipo
│   ├── area-validator.cjs
│   ├── format-validator.cjs
│   └── glossary-validator.cjs
├── sorters/                  # Ordenadores por tipo
│   ├── area-sorter.cjs
│   ├── format-sorter.cjs
│   └── glossary-sorter.cjs
└── utils/                    # Utilitários
    ├── file-handler.cjs
    └── logger.cjs
```

## 🔍 Validações Realizadas

### Areas.json
- ✅ Campos obrigatórios: `id`, `name`
- ✅ Tipos corretos (strings)
- ✅ IDs únicos e em formato kebab-case
- ✅ Nomes únicos

### Formats.json
- ✅ Todos os campos obrigatórios presentes
- ✅ Extensões únicas (sem ponto inicial)
- ✅ Arrays válidos para campos como `area`, `tools`, etc.
- ✅ Estrutura correta para `pipeline_examples` e `references`
- ✅ URLs válidas nas referências
- ✅ Consistência entre áreas referenciadas

### Glossary.json
- ✅ Campos obrigatórios: `id`, `term`, `slug`, `definition`, `area_ids`
- ✅ IDs, termos e slugs únicos
- ✅ Formato kebab-case para IDs e slugs
- ✅ Referências válidas para `area_ids`
- ✅ Estrutura correta para referências opcionais

## 📊 Ordenação Aplicada

| Arquivo | Campo de Ordenação | Critério |
|---------|-------------------|----------|
| `areas.json` | `name` | Alfabético (A-Z) |
| `formats.json` | `extension` | Alfabético (A-Z) |
| `glossary.json` | `term` | Alfabético (A-Z) |

## 🛡️ Recursos de Segurança

### Backups Automáticos
- Criados antes de qualquer modificação
- Formato: `arquivo.json.backup.YYYY-MM-DDTHH-mm-ss-sssZ`
- Localizados no mesmo diretório dos originais

### Validação Prévia
- Nenhum arquivo é modificado se houver erros críticos
- Use `--force` apenas se necessário

## 📋 Relatórios Gerados

### validation-report.md
Relatório detalhado gerado a cada execução contendo:
- ✅ Status geral da validação
- 📊 Estatísticas por arquivo
- ❌ Lista de erros encontrados
- ⚠️ Lista de avisos
- 💡 Sugestões de correção

## 🔧 Exemplos de Uso

### Desenvolvimento Diário
```bash
# Antes de commit
npm run validate-data

# Se tudo estiver ok, organize
npm run organize-data
```

### Adicionando Novos Dados
```bash
# 1. Edite os arquivos JSON manualmente
# 2. Execute validação
npm run validate-data

# 3. Se houver erros, corrija e repita
# 4. Organize automaticamente
npm run organize-data
```

### Cenários de Erro
```bash
# Se houver erros mas precisar organizar urgentemente
npm run force-organize

# Para debug detalhado, verifique:
# - validation-report.md
# - Logs no terminal
```

## ⚙️ Configuração Avançada

### Modificar Critérios de Ordenação
Edite os arquivos em `scripts/sorters/` para alterar:
- Critérios de ordenação
- Locale de comparação
- Tratamento de casos especiais

### Adicionar Novas Validações
1. Edite os validadores em `scripts/validators/`
2. Adicione novas regras conforme necessário
3. Teste com `npm run validate-data`

### Personalizar Logs
No arquivo `scripts/utils/logger.cjs`:
- Ajuste níveis de log
- Modifique formato de saída
- Adicione novos tipos de log

## 🐛 Solução de Problemas

### Erro: "Arquivo não encontrado"
- Verifique se está executando na raiz do projeto
- Confirme que os arquivos `src/data/*.json` existem

### Erro: "JSON inválido"
- Verifique sintaxe JSON nos arquivos
- Use um validador JSON online
- Verifique vírgulas e aspas

### Backup não criado
- Verifique permissões de escrita
- Confirme espaço em disco disponível

### Script não executa
- Confirme que Node.js está instalado
- Execute: `node --version` (requer v14+)

## 📝 Contribuindo

### Para Adicionar Nova Validação
1. Edite o validador apropriado
2. Adicione testes se possível
3. Documente a nova regra
4. Teste com dados reais

### Para Reportar Bugs
1. Execute `npm run validate-data`
2. Inclua o `validation-report.md`
3. Descreva o comportamento esperado
4. Forneça dados de exemplo se possível

## 🎯 Roadmap Futuro

- [ ] Testes automatizados para validadores
- [ ] Integração com CI/CD
- [ ] Validação de URLs em tempo real
- [ ] Sugestões automáticas de correção
- [ ] Interface web para edição
- [ ] API REST para automação externa

---

**Última atualização**: Agosto 2025
