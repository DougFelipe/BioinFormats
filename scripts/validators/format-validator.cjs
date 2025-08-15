const { logger } = require('../utils/logger.cjs');

/**
 * Valida a estrutura dos formatos
 * @param {Array} formats - Array de formatos para validar
 * @param {Array} validAreas - Array de áreas válidas para referência
 * @returns {Object} Resultado da validação
 */
function validateFormats(formats, validAreas = []) {
  const errors = [];
  const warnings = [];
  const duplicateExtensions = new Set();
  const seenExtensions = new Set();
  const validAreaNames = new Set(validAreas.map(a => a.name));

  if (!Array.isArray(formats)) {
    errors.push('Formats deve ser um array');
    return { valid: false, errors, warnings };
  }

  formats.forEach((format, index) => {
    const prefix = `Formato ${index}`;

    // Validar campos obrigatórios
    const requiredFields = ['extension', 'name', 'area', 'description', 'example_filenames', 
                           'example_file_content', 'example_file_explanation', 'pipeline_examples', 
                           'tools', 'references', 'encoding_type'];

    requiredFields.forEach(field => {
      if (!format[field]) {
        errors.push(`${prefix}: campo '${field}' é obrigatório`);
      }
    });

    // Validar extension
    if (format.extension) {
      if (typeof format.extension !== 'string') {
        errors.push(`${prefix}: 'extension' deve ser string`);
      } else {
        // Verificar duplicatas
        if (seenExtensions.has(format.extension)) {
          duplicateExtensions.add(format.extension);
          errors.push(`${prefix}: extensão '${format.extension}' é duplicada`);
        } else {
          seenExtensions.add(format.extension);
        }

        // Validar formato da extensão (sem ponto inicial)
        if (format.extension.startsWith('.')) {
          warnings.push(`${prefix}: extensão '${format.extension}' não deve começar com ponto`);
        }
      }
    }

    // Validar name
    if (format.name && typeof format.name !== 'string') {
      errors.push(`${prefix}: 'name' deve ser string`);
    }

    // Validar area (array de strings)
    if (format.area) {
      if (!Array.isArray(format.area)) {
        errors.push(`${prefix}: 'area' deve ser array`);
      } else {
        format.area.forEach((areaName, areaIndex) => {
          if (typeof areaName !== 'string') {
            errors.push(`${prefix}: área ${areaIndex} deve ser string`);
          } else if (validAreaNames.size > 0 && !validAreaNames.has(areaName)) {
            warnings.push(`${prefix}: área '${areaName}' não encontrada nas áreas válidas`);
          }
        });
      }
    }

    // Validar arrays obrigatórios
    ['example_filenames', 'example_file_explanation', 'pipeline_examples', 'tools', 'references'].forEach(field => {
      if (format[field] && !Array.isArray(format[field])) {
        errors.push(`${prefix}: '${field}' deve ser array`);
      }
    });

    // Validar pipeline_examples (deve ser array de objetos com pipeline e explanation)
    if (format.pipeline_examples && Array.isArray(format.pipeline_examples)) {
      format.pipeline_examples.forEach((pipeline, pipelineIndex) => {
        if (typeof pipeline !== 'object' || pipeline === null) {
          errors.push(`${prefix}: pipeline_examples[${pipelineIndex}] deve ser objeto`);
        } else {
          if (!pipeline.pipeline) {
            errors.push(`${prefix}: pipeline_examples[${pipelineIndex}] deve ter campo 'pipeline'`);
          }
          if (!pipeline.explanation) {
            errors.push(`${prefix}: pipeline_examples[${pipelineIndex}] deve ter campo 'explanation'`);
          }
        }
      });
    }

    // Validar references (array de objetos com title, url, type)
    if (format.references && Array.isArray(format.references)) {
      format.references.forEach((ref, refIndex) => {
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
          if (!ref.type) {
            errors.push(`${prefix}: references[${refIndex}] deve ter campo 'type'`);
          } else {
            const validTypes = ['documentation', 'paper', 'tool', 'standard'];
            if (!validTypes.includes(ref.type)) {
              errors.push(`${prefix}: references[${refIndex}] tipo '${ref.type}' deve ser um de: ${validTypes.join(', ')}`);
            }
          }
        }
      });
    }

    // Validar campos opcionais
    if (format.used_in_repositories && !Array.isArray(format.used_in_repositories)) {
      errors.push(`${prefix}: 'used_in_repositories' deve ser array quando presente`);
    }

    if (format.notes && typeof format.notes !== 'string') {
      errors.push(`${prefix}: 'notes' deve ser string quando presente`);
    }

    // Verificar campos extras não esperados
    const allowedFields = ['extension', 'name', 'area', 'description', 'example_filenames', 
                          'example_file_content', 'example_file_explanation', 'pipeline_examples', 
                          'tools', 'references', 'encoding_type', 'used_in_repositories', 'notes'];
    Object.keys(format).forEach(key => {
      if (!allowedFields.includes(key)) {
        warnings.push(`${prefix}: campo '${key}' não é esperado na interface`);
      }
    });
  });

  const valid = errors.length === 0;
  
  logger.info(`Validação de formatos: ${valid ? 'PASSOU' : 'FALHOU'}`);
  logger.info(`Erros: ${errors.length}, Avisos: ${warnings.length}`);

  return {
    valid,
    errors,
    warnings,
    stats: {
      total: formats.length,
      duplicateExtensions: duplicateExtensions.size
    }
  };
}

module.exports = { validateFormats };
