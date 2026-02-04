/**
 * SequenceViewer - Displays FASTA/FASTQ sequences with header highlighting
 */

import { Dna } from 'lucide-react';

interface SequenceViewerProps {
    content: string;
    filename?: string;
    language?: string;
    className?: string;
}

/**
 * Determines line type for sequence formats
 */
function getLineType(line: string, format: string): 'header' | 'sequence' | 'separator' | 'quality' | 'text' {
    if (format === 'FASTA' || format === 'FA' || format === 'FNA' || format === 'FAA') {
        return line.startsWith('>') ? 'header' : 'sequence';
    }

    if (format === 'FASTQ' || format === 'FQ') {
        if (line.startsWith('@')) return 'header';
        if (line === '+') return 'separator';
        // Simple heuristic: quality lines have special characters
        if (/^[!-~]+$/.test(line) && !line.startsWith('>')) return 'quality';
        return 'sequence';
    }

    return 'text';
}

/**
 * Returns styling for different line types
 */
function getLineStyle(type: 'header' | 'sequence' | 'separator' | 'quality' | 'text'): string {
    switch (type) {
        case 'header':
            return 'text-blue-600 font-semibold';
        case 'sequence':
            return 'text-gray-800';
        case 'separator':
            return 'text-gray-400';
        case 'quality':
            return 'text-amber-600';
        default:
            return 'text-gray-800';
    }
}

/**
 * Returns label for line type
 */
function getLineLabel(type: 'header' | 'sequence' | 'separator' | 'quality' | 'text'): string | null {
    switch (type) {
        case 'header':
            return 'HEADER';
        case 'sequence':
            return 'SEQ';
        case 'quality':
            return 'QUAL';
        default:
            return null;
    }
}

const SequenceViewer: React.FC<SequenceViewerProps> = ({
    content,
    filename,
    language = 'TEXT',
    className = ''
}) => {
    const lines = content.split('\n');

    return (
        <div className={`bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm ${className}`}>
            {/* Header */}
            <div className="flex items-center px-4 py-3 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                    <div className="inline-flex p-1.5 rounded-md bg-purple-100">
                        <Dna className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-gray-900">
                            {filename || 'File Content Example'}
                        </h4>
                        <p className="text-xs text-gray-500">
                            {lines.length} line{lines.length !== 1 ? 's' : ''} • {language} • Sequence
                        </p>
                    </div>
                </div>
            </div>

            {/* Sequence Content */}
            <div className="bg-gray-50 overflow-x-auto">
                <div className="min-w-full font-mono text-sm">
                    {lines.map((line, idx) => {
                        const lineType = getLineType(line, language);
                        const style = getLineStyle(lineType);
                        const label = getLineLabel(lineType);

                        return (
                            <div
                                key={idx}
                                className={`flex ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'}`}
                            >
                                {/* Line Number */}
                                <div className="px-3 py-0.5 text-xs text-gray-400 text-right border-r border-gray-200 select-none min-w-[2.5rem]">
                                    {idx + 1}
                                </div>
                                {/* Content */}
                                <div className={`flex-1 px-3 py-0.5 ${style}`} style={{ whiteSpace: 'pre' }}>
                                    {line || '\u00A0'}
                                </div>
                                {/* Type Label */}
                                {label && (
                                    <div className="px-2 py-0.5 text-xs text-gray-400 border-l border-gray-200">
                                        {label}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SequenceViewer;
