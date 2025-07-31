import React from 'react';
import { Code } from 'lucide-react';

interface CodeBlockProps {
  content: string;
  language?: string;
  filename?: string;
  className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ content, language = 'text', filename, className = "" }) => {
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
              {lines.length} line{lines.length !== 1 ? 's' : ''} • {language.toUpperCase()}
            </p>
          </div>
        </div>
      </div>
      {/* Code Content */}
      <div className="bg-gray-50 p-0 w-full overflow-x-auto">
        <div className="min-w-full" style={{fontFamily: 'monospace'}}>
          {lines.map((line, idx) => (
            <div key={idx} className="flex" style={{background: idx % 2 === 0 ? '#F9FAFB' : '#F3F4F6'}}>
              <div className="border-r border-gray-200 select-none py-0 px-4 text-xs text-gray-500 text-right flex items-center" style={{minHeight: '1.5em'}}>{idx + 1}</div>
              <div className="py-0 px-4 text-gray-800 text-sm flex-1 flex items-center" style={{minHeight: '1.5em', whiteSpace: 'pre'}}>{line || '\u00A0'}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CodeBlock;
