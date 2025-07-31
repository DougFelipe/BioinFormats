# BioinFormats - Referência de Formatos em Bioinformática

Uma aplicação web estática moderna para consulta técnica e educativa de formatos e extensões de arquivos utilizados em bioinformática.

## 🧬 Sobre o Projeto

BioinFormats é uma plataforma dedicada a fornecer informações detalhadas sobre os diversos formatos de arquivo utilizados nas áreas da bioinformática. A aplicação oferece fichas técnicas completas, exemplos práticos e referências para cada formato, servindo como uma ferramenta educativa essencial para estudantes, pesquisadores e profissionais da área.

## ✨ Funcionalidades

- **Busca Global**: Sistema de busca por extensão, nome do formato ou ferramentas
- **Filtro por Área**: Navegação organizada pelas principais áreas da bioinformática
- **Fichas Técnicas**: Informações detalhadas incluindo descrição, exemplos e ferramentas
- **Design Responsivo**: Interface otimizada para dispositivos móveis, tablets e desktop
- **Arquitetura Modular**: Sistema expansível baseado em JSON estático
- **Frontend Puro**: 100% estático, sem necessidade de backend

## 🎯 Áreas Cobertas

- Genômica
- Transcriptômica
- Proteômica
- Metagenômica
- Biologia Estrutural
- Epigenômica
- Redes Biológicas
- Bioinformática Clínica
- Machine Learning em Bioinformática
- Big Data & Repositórios

## 🛠️ Tecnologias

- **React 18** - Framework principal
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **TailwindCSS** - Framework CSS utilitário
- **React Router** - Roteamento SPA
- **Lucide React** - Biblioteca de ícones

## 🚀 Início Rápido

### Instalação

```bash
# Clone o repositório
git clone <repository-url>
cd BioinFormats

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev
```

### Build para Produção

```bash
# Gerar build otimizado
npm run build

# Preview do build
npm run preview
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Navigation.tsx   # Barra de navegação
│   ├── SearchBar.tsx    # Componente de busca
│   ├── AreaMenu.tsx     # Menu de áreas da bioinformática
│   ├── ExtensionCard.tsx # Card de resumo do formato
│   └── ReferenceList.tsx # Lista de referências
├── pages/               # Páginas principais
│   ├── Home.tsx         # Página inicial
│   ├── Areas.tsx        # Página de áreas
│   └── FormatDetail.tsx # Página de detalhes do formato
├── data/                # Dados estáticos JSON
│   ├── areas.json       # Definição das áreas
│   └── formats.json     # Banco de dados de formatos
├── types/               # Definições TypeScript
│   └── index.ts
├── utils/               # Utilitários
│   └── searchUtils.ts   # Funções de busca e filtro
└── App.tsx              # Componente raiz
```

## 📝 Documentação Técnica

### Adição de Novas Áreas da Bioinformática

Para adicionar uma nova área à aplicação:

1. **Edite o arquivo `src/data/areas.json`**:
```json
{
  "id": "nova-area",
  "name": "Nova Área",
  "description": "Descrição detalhada da nova área",
  "icon": "icon-name"
}
```

2. **Ícones disponíveis**: Os ícones são provenientes da biblioteca Lucide React. Consulte a documentação para ver todos os ícones disponíveis.

3. **Atualização automática**: A nova área aparecerá automaticamente no menu e nos filtros sem necessidade de alteração do código.

### Adição de Novos Formatos/Extensões

Para adicionar um novo formato de arquivo:

1. **Edite o arquivo `src/data/formats.json`**:
```json
{
  "extension": "nova_ext",
  "name": "Nome do Formato",
  "area": ["genomics", "proteomics"],
  "description": "Descrição detalhada do formato",
  "example_filenames": ["exemplo1.nova_ext", "exemplo2.nova_ext"],
  "example_file_content": "Exemplo do conteúdo do arquivo",
  "tools": ["Ferramenta1", "Ferramenta2"],
  "references": [
    {
      "title": "Documentação Oficial",
      "url": "https://exemplo.com",
      "type": "documentation"
    }
  ],
  "notes": "Observações importantes sobre o formato"
}
```

2. **Novos campos adicionados**:
   - `example_file_explanation`: Array de strings explicando linha por linha o conteúdo do exemplo

3. **Campos obrigatórios**:
   - `extension`: Extensão sem o ponto (ex: "fasta")
   - `name`: Nome completo do formato
   - `area`: Array com IDs das áreas relacionadas
   - `description`: Descrição técnica detalhada
   - `example_file_explanation`: Explicações interpretativas do exemplo

4. **Tipos de referência**: `documentation`, `paper`, `tool`, `standard`

### Estrutura Modular do Código

A aplicação segue uma arquitetura modular com separação clara de responsabilidades:

#### Componentes (src/components/)

- **Navigation.tsx**: Barra de navegação responsiva com links ativos
- **SearchBar.tsx**: Componente de busca reutilizável com funcionalidade de limpeza
- **AreaMenu.tsx**: Menu dinâmico de áreas com seleção visual
- **ExtensionCard.tsx**: Card de preview dos formatos com informações resumidas
- **ReferenceList.tsx**: Lista formatada de referências externas

#### Páginas (src/pages/)

- **Home.tsx**: Página inicial com hero section, busca e formatos em destaque
- **Areas.tsx**: Página de exploração por áreas da bioinformática
- **FormatDetail.tsx**: Página de detalhes completos de cada formato

#### Utilitários (src/utils/)

- **searchUtils.ts**: Funções para busca e filtro de formatos

### Utilização do TailwindCSS

A aplicação utiliza TailwindCSS para estilização rápida e consistente:

#### Sistema de Cores
```css
/* Cores principais */
Blue: #3B82F6 (primary)
Purple: #8B5CF6 (accent)
Teal: #14B8A6 (secondary)

/* Estados */
Success: #10B981
Warning: #F59E0B
Error: #EF4444
```

#### Classes Utilitárias Comuns
```html
<!-- Cards -->
<div class="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all">

<!-- Botões -->
<button class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">

<!-- Grid responsivo -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

#### Customização
Para personalizar o design, edite o arquivo `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        }
      }
    }
  }
}
```

### Deploy Estático

A aplicação é otimizada para hospedagem estática:

#### Build Local
```bash
npm run build
```

#### Deploy para Netlify
1. Conecte seu repositório no Netlify
2. Configure:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Deploy automático a cada push

#### Deploy para Vercel
```bash
npm install -g vercel
vercel --prod
```

#### Deploy para GitHub Pages
1. Instale o gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Adicione no package.json:
```json
{
  "scripts": {
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://username.github.io/repository-name"
}
```

3. Deploy:
```bash
npm run build
npm run deploy
```

### Expansão de Funcionalidades

#### Sugestões para Futuras Implementações

1. **Sistema de Filtros Avançados**
   - Filtro por múltiplas áreas
   - Filtro por ferramentas específicas
   - Ordenação por popularidade

2. **Dashboard Estatístico**
   - Gráficos de distribuição por área
   - Formatos mais populares
   - Estatísticas de uso

3. **Funcionalidades de Busca Avançada**
   - Busca por conteúdo de exemplo
   - Busca fuzzy (tolerante a erros)
   - Histórico de buscas

4. **Sistema de Favoritos**
   - Marcação de formatos favoritos
   - Sincronização via localStorage
   - Exportação de lista de favoritos

5. **Comparação de Formatos**
   - Comparação lado a lado
   - Tabela comparativa
   - Recomendações de conversão

6. **API Externa (Opcional)**
   - Endpoint REST para dados
   - Integração com repositórios externos
   - Sistema de contribuição comunitária

7. **Modo Offline**
   - Service Worker
   - Cache de dados
   - Funcionamento sem conexão

8. **Internacionalização**
   - Suporte a múltiplos idiomas
   - Tradução automática de descrições
   - Contexto cultural específico

#### Implementação de Novas Features

Para implementar novas funcionalidades:

1. **Mantenha a modularidade**: Crie componentes reutilizáveis
2. **Use TypeScript**: Mantenha tipagem forte
3. **Siga o padrão**: Use as convenções existentes
4. **Teste responsividade**: Garanta funcionamento em todos os dispositivos
5. **Otimize performance**: Use lazy loading quando necessário

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🆘 Suporte

Para dúvidas ou sugestões:
- Abra uma issue no GitHub
- Entre em contato através do email: [seu-email@exemplo.com]

---

Desenvolvido com ❤️ para a comunidade de bioinformática
