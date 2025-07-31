import { FileFormat, BioinformaticsArea } from '../types';

export const searchFormats = (
  formats: FileFormat[],
  query: string,
  selectedArea?: string
): FileFormat[] => {
  let filtered = formats;

  // Filter by area if selected
  if (selectedArea && selectedArea !== 'all') {
    filtered = filtered.filter(format => 
      format.area.includes(selectedArea)
    );
  }

  // Filter by search query
  if (query.trim()) {
    const searchTerm = query.toLowerCase().trim();
    filtered = filtered.filter(format =>
      format.extension.toLowerCase().includes(searchTerm) ||
      format.name.toLowerCase().includes(searchTerm) ||
      format.description.toLowerCase().includes(searchTerm) ||
      format.tools.some(tool => tool.toLowerCase().includes(searchTerm))
    );
  }

  return filtered;
};

export const getUniqueAreas = (formats: FileFormat[]): string[] => {
  const areas = new Set<string>();
  formats.forEach(format => {
    format.area.forEach(area => areas.add(area));
  });
  return Array.from(areas);
};