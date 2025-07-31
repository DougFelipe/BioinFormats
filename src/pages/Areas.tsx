import React, { useState, useMemo } from 'react';
import AreaMenu from '../components/AreaMenu';
import ExtensionCard from '../components/ExtensionCard';
import SearchBar from '../components/SearchBar';
import { BioinformaticsArea, FileFormat } from '../types';
import { searchFormats } from '../utils/searchUtils';
import { Grid3X3 } from 'lucide-react';

interface AreasProps {
  areas: BioinformaticsArea[];
  formats: FileFormat[];
}

const Areas: React.FC<AreasProps> = ({ areas, formats }) => {
  const [selectedArea, setSelectedArea] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFormats = useMemo(() => {
    return searchFormats(formats, searchQuery, selectedArea || undefined);
  }, [formats, searchQuery, selectedArea]);

  const selectedAreaInfo = areas.find(area => area.id === selectedArea);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex p-3 rounded-full bg-blue-100 mb-4">
            <Grid3X3 className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Bioinformatics Areas
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore the main areas of bioinformatics and discover the specific file formats 
            used in each of them.
          </p>
        </div>

        <AreaMenu
          areas={areas}
          selectedArea={selectedArea}
          onAreaSelect={(areaId) => setSelectedArea(areaId === selectedArea ? '' : areaId)}
          className="mb-12"
        />

        {selectedArea && selectedAreaInfo && (
          <div className="bg-white rounded-xl p-8 mb-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {selectedAreaInfo.name}
            </h2>
            <p className="text-gray-700 text-lg mb-6">
              {selectedAreaInfo.description}
            </p>
            
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={`Search formats in ${selectedAreaInfo.name}...`}
              className="mb-6"
            />
            
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Related formats ({filteredFormats.length})
              </h3>
              
              {filteredFormats.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredFormats.map((format) => (
                    <ExtensionCard key={format.extension} format={format} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600">
                    {searchQuery 
                      ? 'No formats found matching the search criteria.'
                      : 'No formats found for this area.'
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {!selectedArea && (
          <div className="text-center text-gray-600">
            <p className="text-lg">
              Select an area above to see related formats
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Areas;
