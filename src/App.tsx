import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import FormatDetail from './pages/FormatDetail';
import FaqPage from './pages/Faq';
import { FileFormat, BioinformaticsArea } from './types';

// Import JSON data
import areasData from './data/areas.json';
import formatsData from './data/formats.json';

function App() {
  const [areas] = useState<BioinformaticsArea[]>(areasData);
  const [formats] = useState<FileFormat[]>(formatsData);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main>
          <Routes>
            <Route 
              path="/" 
              element={<Home formats={formats} areas={areas} />} 
            />
            <Route 
              path="/format/:extension" 
              element={<FormatDetail formats={formats} />} 
            />
            {/* Rota para a página de FAQ adicionada */}
            <Route 
              path="/faq" 
              element={<FaqPage />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
