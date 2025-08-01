import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Grid3X3, HelpCircle } from 'lucide-react';

const Navigation: React.FC = () => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive 
        ? 'bg-blue-100 text-blue-700' 
        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
    }`;

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Esquerda: Logo e links principais */}
          <div className="flex items-center space-x-8">
            <Link 
              to="/" 
              className="flex items-center text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              <span>BioinFormats</span>
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              {/* Aqui você pode adicionar mais links no futuro */}
              {/* Exemplo: <NavLink to="/formats" className={navLinkClass}>Formats</NavLink> */}
            </div>
          </div>

          {/* Direita: FAQ */}
          <div className="flex items-center">
            <NavLink to="/faq" className={navLinkClass}>
              <HelpCircle className="h-4 w-4" />
              <span>FAQ</span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
