import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ReferenceList from '../components/ReferenceList';
import ExplanationBlock from '../components/ExplanationBlock';
import WorkflowSection from '../components/WorkflowSection';
import CodeBlock from '../components/CodeBlock';
import { FileFormat } from '../types';
import { FileText, Tag, PenTool as Tool, Info, ArrowLeft } from 'lucide-react';

interface FormatDetailProps {
  formats: FileFormat[];
}

const FormatDetail: React.FC<FormatDetailProps> = ({ formats }) => {
  const { extension } = useParams<{ extension: string }>();
  
  const format = formats.find(f => f.extension === extension);

  if (!format) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Format Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The format ".{extension}" was not found in our database.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
          
          <div className="bg-white rounded-xl p-8 border border-gray-200">
            <div className="flex items-start space-x-4 mb-6">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  .{format.extension}
                </h1>
                <h2 className="text-xl text-gray-700 mb-2">
                  {format.name}
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  {format.description}
                </p>
                <div className="mb-1 text-sm font-semibold text-gray-700">Associated areas</div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {format.area.map((area) => (
                    <span
                      key={area}
                      className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800"
                    >
                      {area}
                    </span>
                  ))}
                </div>
                {format.tools && format.tools.length > 0 && (
                  <>
                    <div className="mb-1 text-sm font-semibold text-gray-700">Associated Tools</div>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {format.tools.map((tool, index) => (
                        <span
                          key={index}
                          className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <p className="text-gray-700 text-lg leading-relaxed">
              {/* ...existing code... */}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">

          {/* File Content Example - Primary Focus */}
          <CodeBlock
            content={format.example_file_content}
            language={format.extension}
            filename={`example.${format.extension}`}
            className="shadow-lg"
          />

          {/* Interpretative Explanation Dropdown */}
          <details className="shadow-xl rounded-xl bg-white border border-gray-200">
            <summary className="cursor-pointer select-none px-6 py-4 text-lg font-semibold text-gray-900 flex items-center justify-between">
              Interpretative Explanation
              <span className="ml-2 text-gray-400">▼</span>
            </summary>
            <div className="px-6 pb-6 pt-2">
              <ExplanationBlock 
                explanations={format.example_file_explanation} 
                className=""
              />
            </div>
          </details>

          {/* Typical Usage Workflows Dropdown */}
          <details className="shadow-lg rounded-xl bg-white border border-gray-200">
            <summary className="cursor-pointer select-none px-6 py-4 text-lg font-semibold text-gray-900 flex items-center justify-between">
              Typical Usage Workflows
              <span className="ml-2 text-gray-400">▼</span>
            </summary>
            <div className="px-6 pb-6 pt-2">
              <WorkflowSection 
                pipelines={format.pipeline_examples}
                className=""
              />
            </div>
          </details>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Additional Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Technical Notes */}
              {format.notes && (
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Info className="h-5 w-5 mr-2 text-gray-600" />
                    Technical Notes
                  </h3>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="text-amber-800 leading-relaxed">
                      {format.notes}
                    </p>
                  </div>
                </div>
              )}
              
              {/* Compact Secondary Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Common Filenames */}
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-gray-500" />
                    Common Filenames
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {format.example_filenames.map((filename, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-mono"
                      >
                        {filename}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Associated Tools */}
                {/* ...existing code... */}
              </div>
            </div>

            {/* References Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <ReferenceList references={format.references} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormatDetail;
