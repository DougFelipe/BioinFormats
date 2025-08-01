import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer'; // 1. Importe o novo componente Footer
import Home from './pages/Home';
import FormatDetail from './pages/FormatDetail';
import FaqPage from './pages/Faq';
import { FileFormat, BioinformaticsArea } from './types';

// Import JSON data
import areasData from './data/areas.json';
import formatsData from './data/formats.json'; // Lembre-se que este ficheiro agora é .js

function App() {
  const [areas] = useState<BioinformaticsArea[]>(areasData);
  const [formats] = useState<FileFormat[]>(formatsData);

  return (
    <Router>
      {/* 2. Use flexbox para garantir que o rodapé fique no fundo */}
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navigation />
        <main className="flex-grow"> {/* 3. A área de conteúdo principal cresce para preencher o espaço */}
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
        <Footer /> {/* 4. Adicione o componente Footer aqui */}
      </div>
    </Router>
  );
}

export default App;
