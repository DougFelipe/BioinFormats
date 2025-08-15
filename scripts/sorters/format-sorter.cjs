/**
 * Ordena formatos alfabeticamente por extensão
 * @param {Array} formats - Array de formatos para ordenar
 * @returns {Array} Array ordenado
 */
function sortFormats(formats) {
  if (!Array.isArray(formats)) {
    throw new Error('Formats deve ser um array');
  }

  return [...formats].sort((a, b) => {
    // Fallback para casos onde extension pode não existir
    const extA = a.extension || '';
    const extB = b.extension || '';
    
    return extA.localeCompare(extB, 'pt-BR', { 
      sensitivity: 'base',
      numeric: true 
    });
  });
}

/**
 * Verifica se os formatos já estão ordenados
 * @param {Array} formats - Array de formatos para verificar
 * @returns {boolean} True se já estão ordenados
 */
function isFormatsSorted(formats) {
  if (!Array.isArray(formats) || formats.length <= 1) {
    return true;
  }

  for (let i = 1; i < formats.length; i++) {
    const prevExt = formats[i - 1].extension || '';
    const currExt = formats[i].extension || '';
    
    if (prevExt.localeCompare(currExt, 'pt-BR', { sensitivity: 'base' }) > 0) {
      return false;
    }
  }
  
  return true;
}

module.exports = { sortFormats, isFormatsSorted };
