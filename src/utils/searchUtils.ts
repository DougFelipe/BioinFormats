import { FileFormat } from '../types';

/**
 * Searches and filters an array of file formats based on a text query and a selected area.
 * The search is now more comprehensive, including areas, tools, encoding type, and repositories.
 * @param formats - The array of FileFormat objects to search.
 * @param query - The search term entered by the user.
 * @param selectedAreaName - The full name of the area to filter by (e.g., "Genomics").
 * @returns A new array of FileFormat objects that match the criteria.
 */
export const searchFormats = (
  formats: FileFormat[],
  query: string,
  selectedAreaName?: string
): FileFormat[] => {
  let filtered = formats;

  // 1. Filter by area name if one is selected.
  if (selectedAreaName) {
    filtered = filtered.filter(format => 
      format.area.includes(selectedAreaName)
    );
  }

  // 2. Filter by the text search query if it's not empty.
  if (query.trim()) {
    const searchTerm = query.toLowerCase().trim();
    
    filtered = filtered.filter(format => {
      // Check standard text fields
      const extensionMatch = format.extension.toLowerCase().includes(searchTerm);
      const nameMatch = format.name.toLowerCase().includes(searchTerm);
      const descriptionMatch = format.description.toLowerCase().includes(searchTerm);

      // --- OPTIMIZATIONS START HERE ---

      // Check the 'tools' array (with safety check)
      const toolsMatch = format.tools?.some(tool => 
        tool.toLowerCase().includes(searchTerm)
      ) || false;

      // NEW: Check the 'area' array (with safety check)
      const areaMatch = format.area?.some(area =>
        area.toLowerCase().includes(searchTerm)
      ) || false;

      // NEW: Check the 'encoding_type' string (with safety check)
      const encodingMatch = format.encoding_type?.toLowerCase().includes(searchTerm) || false;

      // NEW: Check the 'used_in_repositories' array (with safety check)
      const repoMatch = format.used_in_repositories?.some(repo =>
        repo.toLowerCase().includes(searchTerm)
      ) || false;

      // --- OPTIMIZATIONS END HERE ---

      // Return true if any of the fields match the search term
      return extensionMatch || nameMatch || descriptionMatch || toolsMatch || areaMatch || encodingMatch || repoMatch;
    });
  }

  return filtered;
};

/**
 * Extracts a unique list of area names from an array of formats.
 * This function remains unchanged as its logic is correct.
 * @param formats - The array of FileFormat objects.
 * @returns An array of unique area name strings.
 */
export const getUniqueAreas = (formats: FileFormat[]): string[] => {
  const areas = new Set<string>();
  formats.forEach(format => {
    // Safety check to ensure format.area exists
    if (format.area) {
      format.area.forEach(area => areas.add(area));
    }
  });
  return Array.from(areas);
};
