/**
 * Format Loader - Dynamic YAML loader for bioinformatics formats
 * Uses Vite's import.meta.glob for eager loading of all format files
 */

import type { FileFormat } from '../types';

// Glob import all YAML files from formats directory
// Using eager: true for synchronous access at runtime
const formatModules = import.meta.glob<{ default: FileFormat }>(
    '../data/formats/*.yaml',
    { eager: true, import: 'default' }
);

/**
 * Loads all bioinformatics file formats from the formats/ directory
 * @returns Array of FileFormat objects sorted alphabetically by extension
 */
export function loadAllFormats(): FileFormat[] {
    const formats: FileFormat[] = [];

    for (const path in formatModules) {
        const formatData = formatModules[path] as unknown as FileFormat;
        if (formatData && formatData.extension) {
            formats.push(formatData);
        }
    }

    // Sort alphabetically by extension
    return formats.sort((a, b) => a.extension.localeCompare(b.extension));
}

/**
 * Loads a specific format by its file extension
 * @param extension - The file extension to search for (e.g., 'bam', 'fasta')
 * @returns The FileFormat object or undefined if not found
 */
export function loadFormatByExtension(extension: string): FileFormat | undefined {
    const formats = loadAllFormats();
    const normalizedExt = extension.toLowerCase().replace(/^\./, '');
    return formats.find(f => f.extension.toLowerCase() === normalizedExt);
}

/**
 * Gets all unique area names from loaded formats
 * @returns Array of unique area names sorted alphabetically
 */
export function getAreasFromFormats(): string[] {
    const formats = loadAllFormats();
    const areaSet = new Set<string>();

    formats.forEach(format => {
        (format.area || []).forEach(area => areaSet.add(area));
    });

    return Array.from(areaSet).sort((a, b) => a.localeCompare(b));
}
