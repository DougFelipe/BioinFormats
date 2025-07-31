import React from 'react';
import { Link } from 'react-router-dom';
import { FileFormat } from '../types';
import { FileText } from 'lucide-react';

interface ExtensionCardProps {
  format: FileFormat;
  className?: string;
}

const ExtensionCard: React.FC<ExtensionCardProps> = ({ format, className = "" }) => {
  return (
    <Link
      to={`/format/${format.extension}`}
      className={`block bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-200 flex flex-col h-full ${className}`}
    >
      {/* Header with extension and name */}
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
      
      {/* Description */}
      <p className="text-gray-700 text-sm mb-4 line-clamp-3 flex-grow">
        {format.description}
      </p>
      
      {/* Metadata as Tags, each on its own line with a label */}
      <div className="space-y-2 mt-auto pt-4 border-t border-gray-100 text-sm">
        {/* Areas */}
        {format.area && format.area.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-2">
            <span className="font-semibold text-gray-600">Areas:</span>
            {format.area.slice(0, 3).map((area) => (
              <span key={area} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                {area}
              </span>
            ))}
            {format.area.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                +{format.area.length - 3} more
              </span>
            )}
          </div>
        )}
        
        {/* Tools */}
        {format.tools && format.tools.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-2">
            <span className="font-semibold text-gray-600">Tools:</span>
            {format.tools.slice(0, 3).map((tool) => (
              <span key={tool} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {tool}
              </span>
            ))}
            {format.tools.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                +{format.tools.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Repositories */}
        {format.used_in_repositories && format.used_in_repositories.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-2">
            <span className="font-semibold text-gray-600">Repositories:</span>
            {format.used_in_repositories.slice(0, 2).map((repo) => (
              <span key={repo} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {repo}
              </span>
            ))}
            {format.used_in_repositories.length > 2 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                +{format.used_in_repositories.length - 2} more
              </span>
            )}
          </div>
        )}

        {/* Encoding Type */}
        {format.encoding_type && (
          <div className="flex flex-wrap items-center gap-x-2">
            <span className="font-semibold text-gray-600">Encoding:</span>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                {format.encoding_type}
            </span>
          </div>
        )}


      </div>
    </Link>
  );
};

export default ExtensionCard;
