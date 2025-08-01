import React from 'react';
import { Reference } from '../types';
import { ExternalLink, FileText, BookOpen, PenTool as Tool, Award } from 'lucide-react';

interface ReferenceListProps {
  references: Reference[];
  className?: string;
}

const typeIcons: Record<Reference['type'], React.ComponentType<any>> = {
  documentation: FileText,
  paper: BookOpen,
  tool: Tool,
  standard: Award,
};

const typeLabels: Record<Reference['type'], string> = {
  documentation: 'Docs',
  paper: 'Paper',
  tool: 'Tool',
  standard: 'Standard',
};

const typeColors: Record<Reference['type'], string> = {
  documentation: 'bg-blue-100 text-blue-800',
  paper: 'bg-green-100 text-green-800',
  tool: 'bg-purple-100 text-purple-800',
  standard: 'bg-orange-100 text-orange-800',
};

const ReferenceList: React.FC<ReferenceListProps> = ({ references, className = "" }) => {
  if (!references.length) {
    return null;
  }

  return (
    <div className={className}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Reference</h3>
      <div className="space-y-3">
        {references.map((reference, index) => {
          const IconComponent = typeIcons[reference.type];
          
          return (
            <a
              key={index}
              href={reference.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
            >
              <div className="flex-shrink-0">
                <IconComponent className="h-5 w-5 text-gray-500 group-hover:text-gray-700" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${typeColors[reference.type]}`}>
                    {typeLabels[reference.type]}
                  </span>
                </div>
                
                <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  {reference.title}
                </p>
                
                <p className="text-sm text-gray-600 truncate">
                  {reference.url}
                </p>
              </div>
              
              <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-gray-600 flex-shrink-0" />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default ReferenceList;
