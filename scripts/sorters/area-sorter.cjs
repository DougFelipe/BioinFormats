/**
 * Ordena áreas alfabeticamente por nome
 * @param {Array} areas - Array de áreas para ordenar
 * @returns {Array} Array ordenado
 */
function sortAreas(areas) {
  if (!Array.isArray(areas)) {
    throw new Error('Areas deve ser um array');
  }

  return [...areas].sort((a, b) => {
    // Fallback para casos onde name pode não existir
    const nameA = a.name || '';
    const nameB = b.name || '';
    
    return nameA.localeCompare(nameB, 'pt-BR', { 
      sensitivity: 'base',
      numeric: true 
    });
  });
}

/**
 * Verifica se as áreas já estão ordenadas
 * @param {Array} areas - Array de áreas para verificar
 * @returns {boolean} True se já estão ordenadas
 */
function isAreasSorted(areas) {
  if (!Array.isArray(areas) || areas.length <= 1) {
    return true;
  }

  for (let i = 1; i < areas.length; i++) {
    const prevName = areas[i - 1].name || '';
    const currName = areas[i].name || '';
    
    if (prevName.localeCompare(currName, 'pt-BR', { sensitivity: 'base' }) > 0) {
      return false;
    }
  }
  
  return true;
}

module.exports = { sortAreas, isAreasSorted };
