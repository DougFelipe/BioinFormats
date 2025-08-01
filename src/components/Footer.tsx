import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Link para a página de FAQ */}
          <Link
            to="/faq"
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <HelpCircle className="h-5 w-5" />
            <span className="font-medium text-sm">FAQ</span>
          </Link>
          
          {/* Texto sobre o projeto ser open-source */}
          <p className="text-sm text-gray-500">
            An open-source project
          </p>
          
          {/* Link para o repositório no GitHub */}
          <a
            href="https://github.com/DougFelipe/BioinFormats" // O link do seu repositório
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-500 hover:text-gray-900 transition-colors"
          >
            <Github className="h-5 w-5" />
            <span className="text-sm">Contribute on GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
