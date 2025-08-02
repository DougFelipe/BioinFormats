import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Este componente deteta mudanças na rota da aplicação e automaticamente
 * rola a janela para a posição (0, 0), garantindo que cada nova
 * página seja exibida a partir do topo.
 */
const ScrollToTop = () => {
  // Obtém o 'pathname' da localização atual.
  const { pathname } = useLocation();

  // Executa um efeito sempre que o 'pathname' muda.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Este componente não renderiza nenhum elemento visual.
  return null;
};

export default ScrollToTop;
