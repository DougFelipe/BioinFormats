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