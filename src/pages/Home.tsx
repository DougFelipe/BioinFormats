import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import ExtensionCard from '../components/ExtensionCard';
import { FileFormat, BioinformaticsArea } from '../types';
import { searchFormats } from '../utils/searchUtils';
import { Search, Grid3X3, FileText, ArrowRight } from 'lucide-react';

interface HomeProps {
  formats: FileFormat[];
  areas: BioinformaticsArea[];
}

const Home: React.FC<HomeProps> = ({ formats, areas }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState<string>('all');

  const filteredFormats = useMemo(() => {
    return searchFormats(formats, searchQuery, selectedArea === 'all' ? undefined : selectedArea);
  }, [formats, searchQuery, selectedArea]);

  const featuredFormats = formats.slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Bioinformatics File Formats
              <span className="text-blue-200"> Reference</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Technical and educational platform for consulting file extensions and formats 
              used across various bioinformatics fields.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                to="#search"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('search')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Search className="h-5 w-5 mr-2" />
                Search Format
              </Link>
              
              <Link
                to="/areas"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-700 transition-all duration-200"
              >
                <Grid3X3 className="h-5 w-5 mr-2" />
                Browse by Area
              </Link>
            </div>
            
            <div className="flex items-center justify-center space-x-8 text-blue-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{formats.length}+</div>
                <div className="text-sm">Formats</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{areas.length}</div>
                <div className="text-sm">Areas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-sm">Free</div>
              </div>
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
            <button
              onClick={() => setSelectedArea('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedArea === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All areas
            </button>
            {areas.slice(0, 5).map((area) => (
              <button
                key={area.id}
                onClick={() => setSelectedArea(area.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedArea === area.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {area.name}
              </button>
            ))}
          </div>
          
          {(searchQuery || selectedArea !== 'all') && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Search results ({filteredFormats.length})
              </h3>
              
              {filteredFormats.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                  {filteredFormats.map((format) => (
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
      {!searchQuery && selectedArea === 'all' && (
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
              <Link
                to="/areas"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200"
              >
                View all formats
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
