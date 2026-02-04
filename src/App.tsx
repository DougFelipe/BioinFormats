import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import FormatDetail from './pages/FormatDetail';
import FaqPage from './pages/Faq';
import { FileFormat, BioinformaticsArea, AreasYaml } from './types';
import Glossary from "./pages/Glossary";

// Import YAML data
import areasYaml from './data/areas.yaml';

// Import format loader
import { loadAllFormats } from './utils/formatLoader';

function App() {
  // Load areas from YAML
  const [areas] = useState<BioinformaticsArea[]>((areasYaml as AreasYaml).areas);

  // Load formats dynamically from YAML files
  const [formats, setFormats] = useState<FileFormat[]>([]);

  useEffect(() => {
    const allFormats = loadAllFormats();
    setFormats(allFormats);
  }, []);

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
            <Route path="/glossary" element={<Glossary />} />


          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
