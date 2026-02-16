export interface BioinformaticsArea {
  id: string;
  name: string;
}

export interface Reference {
  title: string;
  url: string;
  type: 'documentation' | 'paper' | 'tool' | 'standard';
}

export interface PipelineExample {
  pipeline: string;
  explanation: string;
}

export interface ColumnDefinition {
  name: string;
  tooltip: string;
}

export interface CodingCase {
  operation: string;
  title: string;
  command: string;
  description: string;
  parameters_explanation?: string;
  use_case?: string;
}

export interface FileFormat {
  extension: string;
  name: string;
  area: string[];
  description: string;
  example_filenames: string[];
  example_file_content: string;
  example_file_explanation: string[];
  pipeline_examples: PipelineExample[];
  tools: string[];
  references: Reference[];
  encoding_type: string;
  used_in_repositories?: string[];
  notes?: string;
  // Viewer configuration
  viewer_type?: 'tabular' | 'sequence' | 'text';
  column_definitions?: ColumnDefinition[];
  // Coding cases
  coding_cases?: CodingCase[];
}

export type Area = {
  id: string;
  name: string;
};

export type ReferenceLink = { title: string; url: string };

export type GlossaryTerm = {
  id: string;
  term: string;
  slug: string;
  definition: string;
  area_ids: string[];        // deve casar com Area.id de areas.json
  aliases?: string[];
  related_terms?: string[];  // pode referenciar slugs de outros termos
  references?: ReferenceLink[];
};

// YAML file wrapper types
export interface AreasYaml {
  areas: BioinformaticsArea[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqCategory {
  name: string;
  items: FaqItem[];
}

export interface FaqYaml {
  categories: FaqCategory[];
}

export interface GlossaryYaml {
  terms: GlossaryTerm[];
}

