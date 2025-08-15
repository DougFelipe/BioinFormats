const { logger } = require('../utils/logger.cjs');

/**
 * Valida a estrutura das áreas
 * @param {Array} areas - Array de áreas para validar
 * @returns {Object} Resultado da validação
 */
function validateAreas(areas) {
  const errors = [];
  const warnings = [];
  const duplicateIds = new Set();
  const duplicateNames = new Set();
  const seenIds = new Set();
  const seenNames = new Set();

  if (!Array.isArray(areas)) {
    errors.push('Areas deve ser um array');
    return { valid: false, errors, warnings };
  }

  areas.forEach((area, index) => {
    const prefix = `Área ${index}`;

    // Validar campos obrigatórios
    if (!area.id) {
      errors.push(`${prefix}: campo 'id' é obrigatório`);
    } else {
      // Validar formato do ID (kebab-case)
      if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(area.id)) {
        warnings.push(`${prefix}: ID '${area.id}' não segue o padrão kebab-case`);
      }

      // Verificar duplicatas de ID
      if (seenIds.has(area.id)) {
        duplicateIds.add(area.id);
        errors.push(`${prefix}: ID '${area.id}' é duplicado`);
      } else {
        seenIds.add(area.id);
      }
    }

    if (!area.name) {
      errors.push(`${prefix}: campo 'name' é obrigatório`);
    } else {
      // Verificar duplicatas de nome
      if (seenNames.has(area.name)) {
        duplicateNames.add(area.name);
        errors.push(`${prefix}: Nome '${area.name}' é duplicado`);
      } else {
        seenNames.add(area.name);
      }
    }

    // Validar tipos
    if (area.id && typeof area.id !== 'string') {
      errors.push(`${prefix}: 'id' deve ser string`);
    }
    if (area.name && typeof area.name !== 'string') {
      errors.push(`${prefix}: 'name' deve ser string`);
    }

    // Verificar campos extras não esperados
    const allowedFields = ['id', 'name'];
    Object.keys(area).forEach(key => {
      if (!allowedFields.includes(key)) {
        warnings.push(`${prefix}: campo '${key}' não é esperado na interface`);
      }
    });
  });

  const valid = errors.length === 0;
  
  logger.info(`Validação de áreas: ${valid ? 'PASSOU' : 'FALHOU'}`);
  logger.info(`Erros: ${errors.length}, Avisos: ${warnings.length}`);

  return {
    valid,
    errors,
    warnings,
    stats: {
      total: areas.length,
      duplicateIds: duplicateIds.size,
      duplicateNames: duplicateNames.size
    }
  };
}

module.exports = { validateAreas };
