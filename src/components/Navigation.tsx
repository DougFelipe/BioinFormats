import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FileText, Home, Grid3X3, HelpCircle } from 'lucide-react';

const Navigation: React.FC = () => {
  // Função para determinar a classe do link, simplificando a repetição
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive 
        ? 'bg-blue-100 text-blue-700' 
        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
    }`;

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              <FileText className="h-6 w-6 text-blue-600" />
              <span>BioinFormats</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-6">
              <NavLink to="/" className={navLinkClass}>
                <Home className="h-4 w-4" />
                <span>Home</span>
              </NavLink>
              
              {/* Link para a página de Áreas adicionado */}
              <NavLink to="/areas" className={navLinkClass}>
                <Grid3X3 className="h-4 w-4" />
                <span>Areas</span>
              </NavLink>
              
              {/* Link para a página de FAQ adicionado */}
              <NavLink to="/faq" className={navLinkClass}>
                <HelpCircle className="h-4 w-4" />
                <span>FAQ</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
