const { logger } = require('../utils/logger.cjs');

/**
 * Valida a estrutura do glossário
 * @param {Array} glossary - Array de termos do glossário para validar
 * @param {Array} validAreas - Array de áreas válidas para referência
 * @returns {Object} Resultado da validação
 */
function validateGlossary(glossary, validAreas = []) {
  const errors = [];
  const warnings = [];
  const duplicateIds = new Set();
  const duplicateTerms = new Set();
  const duplicateSlugs = new Set();
  const seenIds = new Set();
  const seenTerms = new Set();
  const seenSlugs = new Set();
  const validAreaIds = new Set(validAreas.map(a => a.id));

  if (!Array.isArray(glossary)) {
    errors.push('Glossary deve ser um array');
    return { valid: false, errors, warnings };
  }

  glossary.forEach((term, index) => {
    const prefix = `Termo ${index}`;

    // Validar campos obrigatórios
    const requiredFields = ['id', 'term', 'slug', 'definition', 'area_ids'];

    requiredFields.forEach(field => {
      if (!term[field]) {
        errors.push(`${prefix}: campo '${field}' é obrigatório`);
      }
    });

    // Validar id
    if (term.id) {
      if (typeof term.id !== 'string') {
        errors.push(`${prefix}: 'id' deve ser string`);
      } else {
        // Validar formato do ID (kebab-case)
        if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(term.id)) {
          warnings.push(`${prefix}: ID '${term.id}' não segue o padrão kebab-case`);
        }

        // Verificar duplicatas
        if (seenIds.has(term.id)) {
          duplicateIds.add(term.id);
          errors.push(`${prefix}: ID '${term.id}' é duplicado`);
        } else {
          seenIds.add(term.id);
        }
      }
    }

    // Validar term
    if (term.term) {
      if (typeof term.term !== 'string') {
        errors.push(`${prefix}: 'term' deve ser string`);
      } else {
        // Verificar duplicatas
        if (seenTerms.has(term.term)) {
          duplicateTerms.add(term.term);
          errors.push(`${prefix}: termo '${term.term}' é duplicado`);
        } else {
          seenTerms.add(term.term);
        }
      }
    }

    // Validar slug
    if (term.slug) {
      if (typeof term.slug !== 'string') {
        errors.push(`${prefix}: 'slug' deve ser string`);
      } else {
        // Validar formato do slug (kebab-case)
        if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(term.slug)) {
          warnings.push(`${prefix}: slug '${term.slug}' não segue o padrão kebab-case`);
        }

        // Verificar duplicatas
        if (seenSlugs.has(term.slug)) {
          duplicateSlugs.add(term.slug);
          errors.push(`${prefix}: slug '${term.slug}' é duplicado`);
        } else {
          seenSlugs.add(term.slug);
        }
      }
    }

    // Validar definition
    if (term.definition && typeof term.definition !== 'string') {
      errors.push(`${prefix}: 'definition' deve ser string`);
    }

    // Validar area_ids
    if (term.area_ids) {
      if (!Array.isArray(term.area_ids)) {
        errors.push(`${prefix}: 'area_ids' deve ser array`);
      } else {
        term.area_ids.forEach((areaId, areaIndex) => {
          if (typeof areaId !== 'string') {
            errors.push(`${prefix}: area_ids[${areaIndex}] deve ser string`);
          } else if (validAreaIds.size > 0 && !validAreaIds.has(areaId)) {
            warnings.push(`${prefix}: area_id '${areaId}' não encontrado nas áreas válidas`);
          }
        });
      }
    }

    // Validar campos opcionais
    if (term.aliases && !Array.isArray(term.aliases)) {
      errors.push(`${prefix}: 'aliases' deve ser array quando presente`);
    }

    if (term.related_terms && !Array.isArray(term.related_terms)) {
      errors.push(`${prefix}: 'related_terms' deve ser array quando presente`);
    }

    // Validar references (array de objetos com title e url)
    if (term.references) {
      if (!Array.isArray(term.references)) {
        errors.push(`${prefix}: 'references' deve ser array quando presente`);
      } else {
        term.references.forEach((ref, refIndex) => {
          if (typeof ref !== 'object' || ref === null) {
            errors.push(`${prefix}: references[${refIndex}] deve ser objeto`);
          } else {
            if (!ref.title) {
              errors.push(`${prefix}: references[${refIndex}] deve ter campo 'title'`);
            }
            if (!ref.url) {
              errors.push(`${prefix}: references[${refIndex}] deve ter campo 'url'`);
            } else {
              // Validar URL básica
              try {
                new URL(ref.url);
              } catch {
                warnings.push(`${prefix}: references[${refIndex}] URL '${ref.url}' parece inválida`);
              }
            }
          }
        });
      }
    }

    // Verificar campos extras não esperados
    const allowedFields = ['id', 'term', 'slug', 'definition', 'area_ids', 'aliases', 'related_terms', 'references'];
    Object.keys(term).forEach(key => {
      if (!allowedFields.includes(key)) {
        warnings.push(`${prefix}: campo '${key}' não é esperado na interface`);
      }
    });
  });

  const valid = errors.length === 0;
  
  logger.info(`Validação do glossário: ${valid ? 'PASSOU' : 'FALHOU'}`);
  logger.info(`Erros: ${errors.length}, Avisos: ${warnings.length}`);

  return {
    valid,
    errors,
    warnings,
    stats: {
      total: glossary.length,
      duplicateIds: duplicateIds.size,
      duplicateTerms: duplicateTerms.size,
      duplicateSlugs: duplicateSlugs.size
    }
  };
}

module.exports = { validateGlossary };
