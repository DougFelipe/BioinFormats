import React from 'react';
import { BioinformaticsArea } from '../types';
import { 
  Dna, Activity, Shapes, Globe, Box, Layers, 
  Network, Heart, Brain, Database 
} from 'lucide-react';

interface AreaMenuProps {
  areas: BioinformaticsArea[];
  selectedArea?: string;
  onAreaSelect: (areaId: string) => void;
  className?: string;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  dna: Dna,
  activity: Activity,
  shapes: Shapes,
  globe: Globe,
  box: Box,
  layers: Layers,
  network: Network,
  heart: Heart,
  brain: Brain,
  database: Database,
};

const AreaMenu: React.FC<AreaMenuProps> = ({ 
  areas, 
  selectedArea, 
  onAreaSelect, 
  className = "" 
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ${className}`}>
      {areas.map((area) => {
        const IconComponent = iconMap[area.icon] || Box;
        const isSelected = selectedArea === area.id;
        
        return (
          <button
            key={area.id}
            onClick={() => onAreaSelect(area.id)}
            className={`p-6 rounded-xl border-2 text-left transition-all duration-200 hover:shadow-lg hover:scale-105 ${
              isSelected
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-blue-300'
            }`}
          >
            <div className={`inline-flex p-3 rounded-lg mb-4 ${
              isSelected ? 'bg-blue-100' : 'bg-gray-100'
            }`}>
              <IconComponent className={`h-6 w-6 ${
                isSelected ? 'text-blue-600' : 'text-gray-600'
              }`} />
            </div>
            
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
