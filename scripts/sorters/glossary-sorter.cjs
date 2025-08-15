/**
 * Ordena termos do glossário alfabeticamente por term
 * @param {Array} glossary - Array de termos para ordenar
 * @returns {Array} Array ordenado
 */
function sortGlossary(glossary) {
  if (!Array.isArray(glossary)) {
    throw new Error('Glossary deve ser um array');
  }

  return [...glossary].sort((a, b) => {
    // Fallback para casos onde term pode não existir
    const termA = a.term || '';
    const termB = b.term || '';
    
    return termA.localeCompare(termB, 'pt-BR', { 
      sensitivity: 'base',
      numeric: true 
    });
  });
}

/**
 * Verifica se o glossário já está ordenado
 * @param {Array} glossary - Array de termos para verificar
 * @returns {boolean} True se já estão ordenados
 */
function isGlossarySorted(glossary) {
  if (!Array.isArray(glossary) || glossary.length <= 1) {
    return true;
  }

  for (let i = 1; i < glossary.length; i++) {
    const prevTerm = glossary[i - 1].term || '';
    const currTerm = glossary[i].term || '';
    
    if (prevTerm.localeCompare(currTerm, 'pt-BR', { sensitivity: 'base' }) > 0) {
      return false;
    }
  }
  
  return true;
}

module.exports = { sortGlossary, isGlossarySorted };
