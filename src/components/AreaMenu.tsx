import React from 'react';
import { BioinformaticsArea } from '../types';

// Interface de props do componente
interface AreaMenuProps {
  areas: BioinformaticsArea[];
  selectedArea?: string;
  onAreaSelect: (areaId: string) => void;
  className?: string;
}

// Componente AreaMenu sem os ícones
const AreaMenu: React.FC<AreaMenuProps> = ({ 
  areas, 
  selectedArea, 
  onAreaSelect, 
  className = "" 
}) => {
  return (
    <div className={`flex overflow-x-auto space-x-4 p-4 ${className}`}>
      {areas.map((area) => {
        const isSelected = selectedArea === area.id;
        
        return (
          <button
            key={area.id}
            onClick={() => onAreaSelect(area.id)}
            className={`flex-shrink-0 w-72 p-6 rounded-xl border-2 text-left transition-all duration-200 hover:shadow-lg hover:scale-105 ${
              isSelected
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-blue-300'
            }`}
          >
            <h3 className={`text-lg font-semibold mb-2 ${
              isSelected ? 'text-blue-900' : 'text-gray-900'
            }`}>
              {area.name}
            </h3>
            
            <p className={`text-sm leading-relaxed ${
              isSelected ? 'text-blue-700' : 'text-gray-600'
            }`}>
              {area.description}
            </p>
          </button>
        );
      })}
    </div>
  );
};

export default AreaMenu;
