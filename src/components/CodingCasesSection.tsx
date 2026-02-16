import React from 'react';
import { Code, Info } from 'lucide-react';
import { CodingCase } from '../types';

interface CodingCasesSectionProps {
  cases: CodingCase[];
  className?: string;
}

// Define as cores para cada categoria de operação
const operationColors: Record<string, string> = {
  'Reading': 'bg-blue-100 text-blue-800',
  'Filtering': 'bg-purple-100 text-purple-800',
  'Conversion': 'bg-green-100 text-green-800',
  'Statistics': 'bg-orange-100 text-orange-800',
  'Manipulation': 'bg-pink-100 text-pink-800',
  'Indexing': 'bg-indigo-100 text-indigo-800',
  'Quality Control': 'bg-yellow-100 text-yellow-800',
  'Sorting': 'bg-teal-100 text-teal-800',
};

const CodingCasesSection: React.FC<CodingCasesSectionProps> = ({ cases, className = "" }) => {
  if (!cases || cases.length === 0) {
    return null;
  }

  // Agrupa os casos por operação
  const groupedCases = cases.reduce((acc, caseItem) => {
    const operation = caseItem.operation || 'Other';
    if (!acc[operation]) {
      acc[operation] = [];
    }
    acc[operation].push(caseItem);
    return acc;
  }, {} as Record<string, CodingCase[]>);

  // Obtém a cor da badge para uma operação específica
  const getOperationColor = (operation: string): string => {
    return operationColors[operation] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className={`bg-white rounded-xl p-6 border border-gray-200 ${className}`}>
      <div className="space-y-8">
        {Object.entries(groupedCases).map(([operation, operationCases]) => (
          <div key={operation}>
            {/* Header da categoria */}
            <div className="flex items-center space-x-3 mb-4">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getOperationColor(operation)}`}>
                <Code className="h-3.5 w-3.5 mr-1.5" />
                {operation}
              </div>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Acordeões de casos */}
            <div className="space-y-3">
              {operationCases.map((caseItem, index) => (
                <details
                  key={index}
                  className="bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors group"
                >
                  <summary className="cursor-pointer select-none px-4 py-3 font-semibold text-gray-900 flex items-center justify-between list-none">
                    <span className="text-sm">{caseItem.title}</span>
                    <span className="ml-2 text-gray-400 text-xs group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  
                  <div className="px-4 pb-4 pt-2">
                    {/* Bloco de comando */}
                    <div className="mb-3">
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm font-mono shadow-inner">
                        <code>{caseItem.command}</code>
                      </pre>
                    </div>

                    {/* Descrição */}
                    <p className="text-gray-700 text-sm leading-relaxed mb-3">
                      {caseItem.description}
                    </p>

                    {/* Explicação dos parâmetros (se existir) */}
                    {caseItem.parameters_explanation && (
                      <div className="flex items-start space-x-2 bg-blue-50 border border-blue-200 rounded-md p-3 mb-3">
                        <Info className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-blue-900 mb-1">Parâmetros:</p>
                          <p className="text-xs text-blue-800 leading-relaxed">
                            {caseItem.parameters_explanation}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Caso de uso (se existir) */}
                    {caseItem.use_case && (
                      <div className="border-t border-gray-200 pt-3 mt-3">
                        <p className="text-xs text-gray-600 italic">
                          <span className="font-semibold not-italic">Caso de uso:</span> {caseItem.use_case}
                        </p>
                      </div>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CodingCasesSection;
