/**
 * FormatViewer - Smart router that selects the appropriate viewer
 * based on the format's viewer_type or file extension
 */

import { FileFormat } from '../../types';
import TabularViewer from './TabularViewer';
import SequenceViewer from './SequenceViewer';
import CodeViewer from './CodeViewer';

interface FormatViewerProps {
    format: FileFormat;
    className?: string;
}

// Extensions that should use tabular viewer by default
const TABULAR_EXTENSIONS = ['gff', 'gtf', 'bed', 'vcf', 'sam'];

// Extensions that should use sequence viewer by default
const SEQUENCE_EXTENSIONS = ['fasta', 'fa', 'fna', 'faa', 'fastq', 'fq'];

/**
 * Determines the viewer type based on format configuration or extension
 */
function getViewerType(format: FileFormat): 'tabular' | 'sequence' | 'text' {
    // Explicit viewer_type takes priority
    if (format.viewer_type) {
        return format.viewer_type;
    }

    // Fallback to extension-based detection
    const ext = format.extension.toLowerCase();

    if (TABULAR_EXTENSIONS.includes(ext)) {
        return 'tabular';
    }

    if (SEQUENCE_EXTENSIONS.includes(ext)) {
        return 'sequence';
    }

    return 'text';
}

const FormatViewer: React.FC<FormatViewerProps> = ({ format, className = '' }) => {
    const viewerType = getViewerType(format);
    const filename = `example.${format.extension}`;

    switch (viewerType) {
        case 'tabular':
            return (
                <TabularViewer
                    content={format.example_file_content}
                    columns={format.column_definitions}
                    filename={filename}
                    language={format.extension.toUpperCase()}
                    className={className}
                />
            );

        case 'sequence':
            return (
                <SequenceViewer
                    content={format.example_file_content}
                    filename={filename}
                    language={format.extension.toUpperCase()}
                    className={className}
                />
            );

        default:
            return (
                <CodeViewer
                    content={format.example_file_content}
                    filename={filename}
                    language={format.extension.toUpperCase()}
                    className={className}
                />
            );
    }
};

export default FormatViewer;
