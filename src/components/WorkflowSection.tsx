import React from 'react';
import { ArrowRight, Workflow } from 'lucide-react';

// A estrutura dos dados que o componente espera receber foi atualizada.
interface PipelineItem {
  pipeline: string;
  explanation: string;
}

interface WorkflowSectionProps {
  // A propriedade 'pipelines' agora espera um array de PipelineItem.
  pipelines: PipelineItem[];
  className?: string;
}

const WorkflowSection: React.FC<WorkflowSectionProps> = ({ pipelines, className = "" }) => {
  // A verificação de segurança agora é feita na propriedade 'pipelines'.
  if (!pipelines || pipelines.length === 0) {
    return null;
  }

  // A função para dividir o texto do pipeline em passos individuais.
  const parseWorkflow = (pipeline: string) => {
    return pipeline.split(' → ').map(step => step.trim());
  };

  return (
    <div className={`bg-white rounded-xl p-6 border border-gray-200 ${className}`}>
      <div className="space-y-6">
        {/* O map agora itera sobre os 'pipelines' (objetos). */}
        {pipelines.map((item, index) => {
          const steps = parseWorkflow(item.pipeline);
          
          return (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-4 border border-gray-200"
            >
              {/* Representação visual do fluxo de trabalho */}
              {/* AJUSTE: Adicionado 'justify-center' para centralizar os passos do pipeline */}
              <div className="flex items-center justify-center overflow-x-auto pb-2">
                <div className="flex items-center space-x-2">
                  {steps.map((step, stepIndex) => (
                    <React.Fragment key={stepIndex}>
                      <div className="flex-shrink-0 px-3 py-1 bg-gray-200 text-gray-800 rounded-md text-sm font-medium">
                        {step}
                      </div>
                      {stepIndex < steps.length - 1 && (
                        <ArrowRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              
              {/* Explicação do fluxo de trabalho */}
              <p className="mt-3 text-sm text-gray-600 leading-relaxed border-t border-gray-200 pt-3">
                {item.explanation}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkflowSection;
