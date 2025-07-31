import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, FileText, ArrowRight } from 'lucide-react';

interface RecentFormat {
  extension: string;
  name: string;
  dateAdded: string;
  area: string;
}

interface RecentFormatsListProps {
  title: string;
  formats: RecentFormat[];
  className?: string;
}

const RecentFormatsList: React.FC<RecentFormatsListProps> = ({
  title,
  formats,
  className = ""
}) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getAreaColor = (area: string): string => {
    const colors: Record<string, string> = {
      'genomics': 'bg-blue-100 text-blue-800',
      'transcriptomics': 'bg-green-100 text-green-800',
      'proteomics': 'bg-purple-100 text-purple-800',
      'structural-biology': 'bg-orange-100 text-orange-800',
      'big-data-repositories': 'bg-teal-100 text-teal-800',
      'clinical-bioinformatics': 'bg-pink-100 text-pink-800'
    };
    return colors[area] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className={`bg-white rounded-xl p-6 border border-gray-200 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        {title}
      </h3>
      
      <div className="space-y-4">
        {formats.map((format, index) => (
          <Link
            key={format.extension}
            to={`/format/${format.extension}`}
            className="block p-4 rounded-lg border border-gray-100 hover:border-blue-300 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className="inline-flex p-2 rounded-lg bg-gray-100 group-hover:bg-blue-100 transition-colors">
                  <FileText className="h-4 w-4 text-gray-600 group-hover:text-blue-600" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      .{format.extension}
                    </h4>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getAreaColor(format.area)}`}>
                      {format.area}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 truncate">
                    {format.name}
                  </p>
                  
                  <div className="flex items-center space-x-1 mt-2 text-xs text-gray-500">
                    <Calendar className="h-3 w-3" />
                    <span>Adicionado em {formatDate(format.dateAdded)}</span>
                  </div>
                </div>
              </div>
              
              <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 mt-1" />
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <Link
          to="/"
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          Ver todos os formatos
          <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default RecentFormatsList;