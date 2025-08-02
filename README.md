# BioinFormats -  Bioinformatics File Formats

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

## 📁 Project Structure

```
├── .gitignore
├── LICENSE
├── README.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── src
│   ├── App.tsx
│   ├── components
│   │   ├── CodeBlock.tsx
│   │   ├── ExplanationBlock.tsx
│   │   ├── ExtensionCard.tsx
│   │   ├── FaqItem.tsx
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx
│   │   ├── ReferenceList.tsx
│   │   ├── ScrollToTop.tsx
│   │   ├── SearchBar.tsx
│   │   └── WorkflowSection.tsx
│   ├── data
│   │   ├── areas.json
│   │   ├── faq.json
│   │   └── formats.json
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

2. **Available icons**: Icons are from the Lucide React library. Refer to its documentation to browse all icons.

3. **Automatic update**: The new area will appear automatically in the menu and filters with no code changes required.

### Adding New Formats/Extensions

To add a new file format:

1. **Edit the file `src/data/formats.json`** using the correct structure (see example in previous version).

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

## 📄 License

This project is licensed under the AGPL-3.0 License. See the [LICENSE](LICENSE) file for more details.

## 🚨 Support

For questions or suggestions:

* Open an issue on GitHub

---

Developed with ❤️ for the bioinformatics community.
