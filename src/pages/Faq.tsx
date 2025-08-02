import React from 'react';
import FaqItem from '../components/FaqItem';
import faqData from '../data/faq.json';
import { HelpCircle } from 'lucide-react';

const FaqPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <HelpCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* O mapeamento agora itera sobre as categorias primeiro */}
        <div className="space-y-12">
          {faqData.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                {category.category}
              </h2>
              <div className="space-y-4">
                {/* Em seguida, itera sobre os itens (perguntas) dentro de cada categoria */}
                {category.items.map((faq, itemIndex) => (
                  <FaqItem 
                    key={itemIndex} 
                    question={faq.question} 
                    answer={faq.answer} 
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
