export interface BioinformaticsArea {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Reference {
  title: string;
  url: string;
  type: 'documentation' | 'paper' | 'tool' | 'standard';
}

export interface FileFormat {
  extension: string;
  name: string;
  area: string[];
  description: string;
  example_filenames: string[];
  example_file_content: string;
  example_file_explanation: string[];
  pipeline_examples: string[];
  tools: string[];
  references: Reference[];
  notes: string;
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
