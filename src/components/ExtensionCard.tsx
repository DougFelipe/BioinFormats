import React from 'react';
import { Link } from 'react-router-dom';
import { FileFormat } from '../types';
import { FileText, Tag, PenTool as Tool } from 'lucide-react';

interface ExtensionCardProps {
  format: FileFormat;
  className?: string;
}

const ExtensionCard: React.FC<ExtensionCardProps> = ({ format, className = "" }) => {
  return (
    <Link
      to={`/format/${format.extension}`}
      className={`block bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-200 hover:scale-105 ${className}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="inline-flex p-2 rounded-lg bg-blue-100">
            <FileText className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              .{format.extension}
            </h3>
            <p className="text-sm text-gray-600">{format.name}</p>
          </div>
        </div>
      </div>
      
      <p className="text-gray-700 text-sm mb-4 line-clamp-3">
        {format.description}
      </p>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Tag className="h-4 w-4 text-gray-400" />
          <div className="flex flex-wrap gap-1">
            {format.area.slice(0, 3).map((area) => (
              <span
                key={area}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
              >
                {area}
              </span>
            ))}
            {format.area.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                +{format.area.length - 3}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Tool className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            {format.tools.length} ferramenta{format.tools.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ExtensionCard;