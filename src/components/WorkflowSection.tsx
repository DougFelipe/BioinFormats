import React from 'react';
import { ArrowRight, Workflow } from 'lucide-react';

interface WorkflowSectionProps {
  pipelines: string[];
  className?: string;
}

const WorkflowSection: React.FC<WorkflowSectionProps> = ({ pipelines, className = "" }) => {
  if (!pipelines.length) {
    return null;
  }

  const parseWorkflow = (pipeline: string) => {
    return pipeline.split(' → ').map(step => step.trim());
  };

  return (
    <div className={`bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-200 ${className}`}>

      
      <div className="space-y-4">
        {pipelines.map((pipeline, index) => {
          const steps = parseWorkflow(pipeline);
          
          return (
            <div
              key={index}
              className="bg-white rounded-lg p-4 border border-indigo-100 hover:border-indigo-200 transition-colors"
            >
              <div className="flex items-center justify-center">
                <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                  {steps.map((step, stepIndex) => (
                    <React.Fragment key={stepIndex}>
                      <div className="flex-shrink-0 px-3 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg text-sm font-medium shadow-sm">
                        {step}
                      </div>
                      {stepIndex < steps.length - 1 && (
                        <ArrowRight className="h-4 w-4 text-indigo-400 flex-shrink-0" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkflowSection;
