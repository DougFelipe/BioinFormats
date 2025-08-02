import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop'; // Importa o componente ScrollToTop
import Home from './pages/Home';
import FormatDetail from './pages/FormatDetail';
import FaqPage from './pages/Faq';
import { FileFormat, BioinformaticsArea } from './types';

// Import data
import areasData from './data/areas.json';
import formatsData from './data/formats.json'; // Corrige a importação para o ficheiro .js

function App() {
  const [areas] = useState<BioinformaticsArea[]>(areasData);
  const [formats] = useState<FileFormat[]>(formatsData);

  return (
    <Router>
      <ScrollToTop /> {/* Adiciona o componente para rolar para o topo */}
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navigation />
        <main className="flex-grow">
          <Routes>
            <Route 
              path="/" 
              element={<Home formats={formats} areas={areas} />} 
            />
            <Route 
              path="/format/:extension" 
              element={<FormatDetail formats={formats} />} 
            />
            <Route 
              path="/faq" 
              element={<FaqPage />} 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
