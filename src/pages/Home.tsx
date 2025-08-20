import React, { useState, useMemo } from 'react';
// ...existing code...
import SearchBar from '../components/SearchBar';
import ExtensionCard from '../components/ExtensionCard';
import { FileFormat, BioinformaticsArea } from '../types';
import { searchFormats } from '../utils/searchUtils';
import { FileText } from 'lucide-react';

interface HomeProps {
  formats: FileFormat[];
  areas: BioinformaticsArea[];
}

const Home: React.FC<HomeProps> = ({ formats, areas }) => {
  const [searchQuery, setSearchQuery] = useState('');
  // O estado agora armazena o ID da área, ou null se nenhuma estiver selecionada.
  const [selectedAreaId, setSelectedAreaId] = useState<string | null>(null);

  // Lógica de filtro atualizada
  const filteredFormats = useMemo(() => {
    // 1. Encontra o objeto da área selecionada usando o ID.
    const selectedAreaObject = areas.find(area => area.id === selectedAreaId);
    // 2. Obtém o nome da área para usar no filtro (ex: "Genomics").
    const areaNameToFilter = selectedAreaObject ? selectedAreaObject.name : undefined;

    // 3. A função de busca agora usa o nome da área para filtrar.
    return searchFormats(formats, searchQuery, areaNameToFilter);
  }, [formats, searchQuery, selectedAreaId, areas]);

  // Função para lidar com a seleção de área, permite selecionar e desmarcar.
  const handleAreaSelect = (areaId: string) => {
    setSelectedAreaId(prevId => (prevId === areaId ? null : areaId));
  };

  const featuredFormats = formats.slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative bg-white/30 backdrop-blur-md text-gray-900 overflow-hidden">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Bioinformatics Files{' '}
                <span className="text-gray-800 hover:text-blue-600 transition-colors duration-300 cursor-pointer">
                  Formats
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                Platform for consulting file extensions and formats 
                used across various Bioinformatics fields
              </p>

              {/* Métricas: Formats e Areas */}
              <div className="flex items-center justify-center space-x-12 text-gray-700 mb-6">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-extrabold">{formats.length}+</div>
                  <div className="text-lg md:text-xl font-medium">Formats</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-extrabold">{areas.length}</div>
                  <div className="text-lg md:text-xl font-medium">Areas</div>
                </div>
              </div>

              {/* Link DOI abaixo das métricas */}
              <div className="text-center">
                <a
                  href="https://doi.org/10.0000/example"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl md:text-2xl text-gray-600 hover:text-blue-600 transition-colors leading-relaxed"
                >
                  View Related Article (DOI)
                </a>
              </div>
            </div>
          </div>
        </div>




      {/* Search Section */}
      <div id="search" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Search File Formats
            </h2>
            <p className="text-lg text-gray-600">
              Enter the extension, format name, or tool to find detailed information
            </p>
          </div>
          
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            className="mb-6"
          />
          
          <div className="flex flex-wrap gap-2 justify-center">
            {areas.map((area) => (
              <button
                key={area.id}
                onClick={() => handleAreaSelect(area.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedAreaId === area.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {area.name}
              </button>
            ))}
          </div>
          
        {(searchQuery || selectedAreaId) && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Search results ({filteredFormats.length})
            </h3>
            
            {filteredFormats.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {/* A lista de formatos é ordenada por ordem alfabética antes de ser renderizada */}
                {[...filteredFormats]
                  .sort((a, b) => a.extension.localeCompare(b.extension))
                  .map((format) => (
                    <ExtensionCard key={format.extension} format={format} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No formats found matching the search criteria.</p>
              </div>
            )}
          </div>
        )}
        </div>
      </div>

      {/* Featured Formats */}
      {!searchQuery && !selectedAreaId && (
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Most Used Formats
              </h2>
              <p className="text-lg text-gray-600">
                Discover the most common file formats in bioinformatics
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-6 mb-8">
              {featuredFormats.map((format) => (
                <ExtensionCard key={format.extension} format={format} />
              ))}
            </div>
            
            <div className="text-center">

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
