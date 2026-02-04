/**
 * CodeViewer - Generic code/text viewer (fallback)
 * Based on the original CodeBlock component
 */

import { Code } from 'lucide-react';

interface CodeViewerProps {
    content: string;
    filename?: string;
    language?: string;
    className?: string;
}

const CodeViewer: React.FC<CodeViewerProps> = ({
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
                    <div className="inline-flex p-1.5 rounded-md bg-blue-100">
                        <Code className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-gray-900">
                            {filename || 'File Content Example'}
                        </h4>
                        <p className="text-xs text-gray-500">
                            {lines.length} line{lines.length !== 1 ? 's' : ''} • {language}
                        </p>
                    </div>
                </div>
            </div>

            {/* Code Content */}
            <div className="bg-gray-50 overflow-x-auto">
                <div className="min-w-full font-mono text-sm">
                    {lines.map((line, idx) => (
                        <div
                            key={idx}
                            className={`flex ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'}`}
                        >
                            {/* Line Number */}
                            <div className="px-3 py-0.5 text-xs text-gray-400 text-right border-r border-gray-200 select-none min-w-[2.5rem]">
                                {idx + 1}
                            </div>
                            {/* Content */}
                            <div className="flex-1 px-3 py-0.5 text-gray-800" style={{ whiteSpace: 'pre' }}>
                                {line || '\u00A0'}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CodeViewer;
