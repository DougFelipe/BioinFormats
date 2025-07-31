import React from 'react';
import { BookOpen, ChevronRight } from 'lucide-react';

interface ExplanationBlockProps {
  explanations: string[];
  className?: string;
}

const ExplanationBlock: React.FC<ExplanationBlockProps> = ({ explanations, className = "" }) => {
  if (!explanations.length) {
    return null;
  }

  return (
    <div className={`bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200 ${className}`}>

      
      <div className="space-y-4">
        {explanations.map((explanation, index) => (
          <div
            key={index}
            className="flex items-start space-x-4 p-4 bg-white rounded-lg border border-blue-100 hover:border-blue-200 transition-colors"
          >
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                {index + 1}
              </div>
            </div>
            
            <div className="flex-1">
              <p className="text-gray-800 leading-relaxed">
                {explanation}
              </p>
            </div>
            
            <ChevronRight className="h-4 w-4 text-blue-400 flex-shrink-0 mt-1" />
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default ExplanationBlock;
