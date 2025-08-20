# BioinFormats -  Bioinformatics File Formats
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/DougFelipe/biorempp)

## 🧬 About the Project

BioinFormats is a platform dedicated to providing detailed information about various file formats used in bioinformatics. 

The application offers complete technical sheets, practical examples, and references for each format, serving as an essential educational and reference tool for students, researchers, and professionals in the field.

## ✨ Features

* **Global Search**: Search system by extension, format name, or tools
* **Area Filter**: Organized navigation by main bioinformatics areas
* **Technical Sheets**: Detailed information including description, examples, and tools
* **Responsive Design**: Optimized interface for mobile, tablets, and desktop


## 🌟 Covered Areas

* Genomics
* Transcriptomics
* Proteomics
* Metagenomics
* Structural Biology
* Epigenomics
* Biological Networks
* Clinical Bioinformatics
* Machine Learning in Bioinformatics
* Big Data & Repositories
* Metabolomics
* Pharmacogenomics
* Systems Biology
* Cheminformatics
* Immunoinformatics
* Phylogenetics
* Population Genetics
* Glycomics
* Lipidomics
* Cancer Genomics
* Viromics
* Drug Discovery
* Single-Cell Omics
* Evolutionary Genomics
* Microbiome Analysis

## 🛠️ Technologies

* **React 18** - Main framework
* **TypeScript** - Static typing
* **Vite** - Build tool and dev server
* **TailwindCSS** - Utility-first CSS framework
* **React Router** - SPA routing
* **Lucide React** - Icon library

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/DougFelipe/BioinFormats

cd BioinFormats

# Install dependencies
npm install

# Validate and organize data
npm run organize-data

# Run development server
npm run dev
```

### Production Build

```bash
# Generate optimized build
npm run build

# Preview the build
npm run preview
```

### Data Management

```bash
# Validate data integrity
npm run validate-data

# Organize data alphabetically
npm run organize-data

# Force organization (even with validation errors)
npm run force-organize
```

## 📁 Project Structure

```
├── .gitignore
├── LICENSE
├── README.md
├── SCRIPTS_DOCUMENTATION.md          # 📖 Scripts documentation
├── validation-report.md               # 📊 Auto-generated data report
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── scripts/                           # 🤖 Data management scripts
│   ├── organize-data.cjs             #    Main organization script
│   ├── validators/                   #    Data validation modules
│   │   ├── area-validator.cjs
│   │   ├── format-validator.cjs
│   │   └── glossary-validator.cjs
│   ├── sorters/                      #    Data sorting modules
│   │   ├── area-sorter.cjs
│   │   ├── format-sorter.cjs
│   │   └── glossary-sorter.cjs
│   └── utils/                        #    Utility modules
│       ├── file-handler.cjs
│       └── logger.cjs
├── src
│   ├── App.tsx
│   ├── components
│   │   ├── CodeBlock.tsx
│   │   ├── ExplanationBlock.tsx
│   │   ├── ExtensionCard.tsx
│   │   ├── FaqItem.tsx
│   │   ├── Footer.tsx
│   │   ├── GlossaryListItem.tsx
│   │   ├── Navigation.tsx
│   │   ├── ReferenceList.tsx
│   │   ├── ScrollToTop.tsx
│   │   ├── SearchBar.tsx
│   │   └── WorkflowSection.tsx
│   ├── data                           # 📊 JSON data files (auto-organized)
│   │   ├── areas.json                #    Bioinformatics areas
│   │   ├── faq.json                  #    FAQ items
│   │   ├── formats.json              #    File formats
│   │   └── glossary.json             #    Glossary terms
│   ├── index.css
│   ├── main.tsx
│   ├── pages
│   │   ├── Faq.tsx
│   │   ├── FormatDetail.tsx
│   │   └── Home.tsx
│   ├── types
│   │   └── index.ts
│   ├── utils
│   │   └── searchUtils.ts
│   └── vite-env.d.ts
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## 📝 Technical Documentation

### Adding New Bioinformatics Areas

To add a new area to the application:

1. **Edit the file `src/data/areas.json`**:

```json
{
  "id": "new-area",
  "name": "New Area"
}
```


2. **Automatic update**: The new area will appear automatically in the menu and filters with no code changes required.

### Adding New Formats/Extensions

To add a new file format:

1. **Edit the file `src/data/formats.json`** using the correct structure.

```json
{
  "extension": "new_ext",
  "name": "Name of the Format",
  "area": ["Genomics", "Transcriptomics", "Proteomics"],
  "description": "Detailed description of the format and its purpose within bioinformatics workflows.",
  "example_filenames": ["example1.new_ext", "example2.new_ext"],
  "example_file_content": "Example content of the file format goes here.",
  "example_file_explanation": [
    "Line 1: Explanation of the first line in the example file content.",
    "Line 2: Explanation of the second line.",
    "Line 3: Continue explaining content as needed."
  ],
  "pipeline_examples": [
    {
      "pipeline": "Format → Tool → Output",
      "explanation": "Describe how the format is used in this pipeline step-by-step."
    },
    {
      "pipeline": "Format → Another Tool → Processed Output",
      "explanation": "Another example of how this format fits into a bioinformatics workflow."
    }
  ],
  "tools": ["Tool1", "Tool2", "Tool3"],
  "references": [
    {
      "title": "Reference Title",
      "url": "https://example.com",
      "type": "documentation"
    }
  ],
  "encoding_type": "ASCII / UTF-8",
  "used_in_repositories": [
    "Repository Name 1",
    "Repository Name 2"
  ],
  "notes": "Important considerations or historical context about the format."
}

```

2. **Reference types**: `documentation`, `paper`, `tool`, `standard`

### Feature Expansion

#### Suggested Future Implementations

2. **Statistical Dashboard**

   * Distribution charts by area
   * Most popular formats
   * Usage statistics

3. **Favorites System**

   * Mark formats as favorites
   * Sync via localStorage
   * Export favorite list

4. **External API**

   * REST endpoint for data
   * Integration with external repositories
   * Community contribution system

#### Implementing New Features

To implement new functionalities:

1. **Keep modularity**: Create reusable components
2. **Use TypeScript**: Maintain strong typing
3. **Follow conventions**: Use existing code style
4. **Test responsiveness**: Ensure compatibility across devices
5. **Optimize performance**: Use lazy loading when needed

## 🤝 Contributing

1. Fork the project
2. Create a branch for your feature (`git checkout -b feature/NewFeature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/NewFeature`)
5. Open a Pull Request

## 🛡️ Pre-commit and Pre-push (local checks)

This project uses Husky and lint-staged to run quick, local checks before commits and pushes to keep the codebase clean.

What runs locally:

- pre-commit: runs `lint-staged` which executes ESLint `--fix` on staged JS/TS files and a lightweight validation for `src/data` JSON files.
- pre-push: runs a `prepush` script (`npm run prepush`) that performs a full lint and a data validation (`npm run lint && npm run validate-data`).

How to set up locally (one-time):

```powershell
npm install
npm run prepare
# or: npx husky install
```

How to test hooks:

1. Modify a source file or a `src/data` JSON file.
2. Stage the change: `git add <file>`
3. Commit: `git commit -m "test: hooks"` — pre-commit will run automatically.
4. Push: `git push` — pre-push will run automatically.

If a hook auto-fixes changes (ESLint --fix), the hook will re-add fixed files to the commit.

CI behavior and important notes

- The GitHub workflow `Data Validation and Organization` runs in CI and validates data and organizes it. It now only commits organized data if files under `src/data/` changed (prevents false positives from artifacts like `validation-report.md`).
- The CI also uploads `validation-report.md` as an artifact. The file remains ignored locally via `.gitignore`.

## 🧾 Updated Contributing Guide (detailed)

Follow these steps to contribute:

1. Fork the repository
2. Create a branch for your feature: `git checkout -b feature/your-feature`
3. Install dependencies and prepare hooks:

```powershell
npm install
npm run prepare
```

4. Make your changes in a focused commit(s). Keep commits small and descriptive.

5. Before committing, run lint and validation locally (optional but recommended):

```powershell
npm run lint
npm run validate-data
```

6. Stage and commit your changes. The pre-commit hook will lint staged files and may autofix issues.

7. Push to your branch: `git push origin feature/your-feature`

8. Open a Pull Request against `main`. In the PR description, explain the change and any manual validation steps.

9. Respond to CI and review feedback. If CI suggests fixes (lint/data), apply them locally and push a new commit.

Thanks for contributing!



## 📄 License

This project is licensed under the AGPL-3.0 License. See the [LICENSE](LICENSE) file for more details.

## 🚨 Support

For questions or suggestions:

* Open an issue on GitHub

---

Developed with ❤️ for the bioinformatics community.
