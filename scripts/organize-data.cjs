#!/usr/bin/env node

/**
 * Script principal para organização de dados do BioinFormats
 * 
 * Funcionalidades:
 * 1. Validação de integridade dos dados
 * 2. Ordenação alfabética automática
 * 3. Normalização de dados
 * 4. Relatório de inconsistências
 */

const path = require('path');
const { logger } = require('./utils/logger.cjs');
const { loadJSON, saveJSON, createBackup, fileExists } = require('./utils/file-handler.cjs');

// Importar validadores
const { validateAreas } = require('./validators/area-validator.cjs');
const { validateFormats } = require('./validators/format-validator.cjs');
const { validateGlossary } = require('./validators/glossary-validator.cjs');

// Importar ordenadores
const { sortAreas, isAreasSorted } = require('./sorters/area-sorter.cjs');
const { sortFormats, isFormatsSorted } = require('./sorters/format-sorter.cjs');
const { sortGlossary, isGlossarySorted } = require('./sorters/glossary-sorter.cjs');

// Configuração dos caminhos
const DATA_DIR = path.join(__dirname, '..', 'src', 'data');
const AREAS_FILE = path.join(DATA_DIR, 'areas.json');
const FORMATS_FILE = path.join(DATA_DIR, 'formats.json');
const GLOSSARY_FILE = path.join(DATA_DIR, 'glossary.json');

/**
 * Valida todos os arquivos de dados
 */
async function validateAllData() {
  logger.section('VALIDAÇÃO DE DADOS');
  
  let allValid = true;
  const validationResults = {};

  try {
    // Carregar dados
    logger.info('Carregando dados...');
    const areas = loadJSON(AREAS_FILE);
    const formats = loadJSON(FORMATS_FILE);
    const glossary = loadJSON(GLOSSARY_FILE);

    // Validar áreas
    logger.subsection('Validando Áreas');
    const areasResult = validateAreas(areas);
    validationResults.areas = areasResult;
    
    if (!areasResult.valid) {
      allValid = false;
      logger.failure(`Áreas: ${areasResult.errors.length} erros`);
      areasResult.errors.forEach(error => logger.error(`  ${error}`));
    } else {
      logger.success('Áreas validadas com sucesso');
    }
    
    if (areasResult.warnings.length > 0) {
      logger.warn(`Áreas: ${areasResult.warnings.length} avisos`);
      areasResult.warnings.forEach(warning => logger.warn(`  ${warning}`));
    }

    // Validar formatos
    logger.subsection('Validando Formatos');
    const formatsResult = validateFormats(formats, areas);
    validationResults.formats = formatsResult;
    
    if (!formatsResult.valid) {
      allValid = false;
      logger.failure(`Formatos: ${formatsResult.errors.length} erros`);
      formatsResult.errors.forEach(error => logger.error(`  ${error}`));
    } else {
      logger.success('Formatos validados com sucesso');
    }
    
    if (formatsResult.warnings.length > 0) {
      logger.warn(`Formatos: ${formatsResult.warnings.length} avisos`);
      formatsResult.warnings.forEach(warning => logger.warn(`  ${warning}`));
    }

    // Validar glossário
    logger.subsection('Validando Glossário');
    const glossaryResult = validateGlossary(glossary, areas);
    validationResults.glossary = glossaryResult;
    
    if (!glossaryResult.valid) {
      allValid = false;
      logger.failure(`Glossário: ${glossaryResult.errors.length} erros`);
      glossaryResult.errors.forEach(error => logger.error(`  ${error}`));
    } else {
      logger.success('Glossário validado com sucesso');
    }
    
    if (glossaryResult.warnings.length > 0) {
      logger.warn(`Glossário: ${glossaryResult.warnings.length} avisos`);
      glossaryResult.warnings.forEach(warning => logger.warn(`  ${warning}`));
    }

    // Resumo
    logger.subsection('Resumo da Validação');
    const totalErrors = Object.values(validationResults).reduce((sum, result) => sum + result.errors.length, 0);
    const totalWarnings = Object.values(validationResults).reduce((sum, result) => sum + result.warnings.length, 0);
    
    logger.info(`Total de erros: ${totalErrors}`);
    logger.info(`Total de avisos: ${totalWarnings}`);
    
    if (allValid) {
      logger.success('Todos os dados são válidos!');
    } else {
      logger.failure('Existem erros de validação que precisam ser corrigidos');
    }

  } catch (error) {
    logger.error(`Erro durante validação: ${error.message}`);
    allValid = false;
  }

  return { valid: allValid, results: validationResults };
}

/**
 * Organiza todos os arquivos alfabeticamente
 */
async function organizeAllData() {
  logger.section('ORGANIZAÇÃO ALFABÉTICA');
  
  let anyChanges = false;

  try {
    // Carregar dados
    logger.info('Carregando dados...');
    const areas = loadJSON(AREAS_FILE);
    const formats = loadJSON(FORMATS_FILE);
    const glossary = loadJSON(GLOSSARY_FILE);

    // Verificar se já estão ordenados
    logger.subsection('Verificando Estado Atual');
    const areasAlreadySorted = isAreasSorted(areas);
    const formatsAlreadySorted = isFormatsSorted(formats);
    const glossaryAlreadySorted = isGlossarySorted(glossary);

    logger.info(`Áreas ordenadas: ${areasAlreadySorted ? 'SIM' : 'NÃO'}`);
    logger.info(`Formatos ordenados: ${formatsAlreadySorted ? 'SIM' : 'NÃO'}`);
    logger.info(`Glossário ordenado: ${glossaryAlreadySorted ? 'SIM' : 'NÃO'}`);

    // Organizar áreas
    if (!areasAlreadySorted) {
      logger.info('Organizando áreas...');
      const backupPath = createBackup(AREAS_FILE);
      logger.info(`Backup criado: ${backupPath}`);
      
      const sortedAreas = sortAreas(areas);
      saveJSON(AREAS_FILE, sortedAreas);
      logger.success(`${sortedAreas.length} áreas organizadas por nome`);
      anyChanges = true;
    }

    // Organizar formatos
    if (!formatsAlreadySorted) {
      logger.info('Organizando formatos...');
      const backupPath = createBackup(FORMATS_FILE);
      logger.info(`Backup criado: ${backupPath}`);
      
      const sortedFormats = sortFormats(formats);
      saveJSON(FORMATS_FILE, sortedFormats);
      logger.success(`${sortedFormats.length} formatos organizados por extensão`);
      anyChanges = true;
    }

    // Organizar glossário
    if (!glossaryAlreadySorted) {
      logger.info('Organizando glossário...');
      const backupPath = createBackup(GLOSSARY_FILE);
      logger.info(`Backup criado: ${backupPath}`);
      
      const sortedGlossary = sortGlossary(glossary);
      saveJSON(GLOSSARY_FILE, sortedGlossary);
      logger.success(`${sortedGlossary.length} termos organizados por nome`);
      anyChanges = true;
    }

    if (!anyChanges) {
      logger.info('Todos os dados já estão organizados alfabeticamente');
    } else {
      logger.success('Organização concluída com sucesso!');
    }

  } catch (error) {
    logger.error(`Erro durante organização: ${error.message}`);
    throw error;
  }

  return anyChanges;
}

/**
 * Gera relatório de inconsistências
 */
async function generateReport(validationResults) {
  logger.section('RELATÓRIO DE INCONSISTÊNCIAS');
  
  const reportLines = [];
  reportLines.push('# Relatório de Inconsistências - BioinFormats');
  reportLines.push('');
  reportLines.push(`Gerado em: ${new Date().toISOString()}`);
  reportLines.push('');

  // Resumo
  const totalErrors = Object.values(validationResults.results).reduce((sum, result) => sum + result.errors.length, 0);
  const totalWarnings = Object.values(validationResults.results).reduce((sum, result) => sum + result.warnings.length, 0);
  
  reportLines.push('## Resumo');
  reportLines.push('');
  reportLines.push(`- **Status Geral**: ${validationResults.valid ? '✅ VÁLIDO' : '❌ COM ERROS'}`);
  reportLines.push(`- **Total de Erros**: ${totalErrors}`);
  reportLines.push(`- **Total de Avisos**: ${totalWarnings}`);
  reportLines.push('');

  // Detalhes por arquivo
  ['areas', 'formats', 'glossary'].forEach(type => {
    const result = validationResults.results[type];
    const typeName = type === 'areas' ? 'Áreas' : type === 'formats' ? 'Formatos' : 'Glossário';
    
    reportLines.push(`## ${typeName}`);
    reportLines.push('');
    reportLines.push(`- **Status**: ${result.valid ? '✅ VÁLIDO' : '❌ COM ERROS'}`);
    reportLines.push(`- **Total de Registros**: ${result.stats.total}`);
    reportLines.push(`- **Erros**: ${result.errors.length}`);
    reportLines.push(`- **Avisos**: ${result.warnings.length}`);
    reportLines.push('');

    if (result.errors.length > 0) {
      reportLines.push('### Erros');
      reportLines.push('');
      result.errors.forEach(error => {
        reportLines.push(`- ${error}`);
      });
      reportLines.push('');
    }

    if (result.warnings.length > 0) {
      reportLines.push('### Avisos');
      reportLines.push('');
      result.warnings.forEach(warning => {
        reportLines.push(`- ${warning}`);
      });
      reportLines.push('');
    }
  });

  // Sugestões
  if (totalErrors > 0 || totalWarnings > 0) {
    reportLines.push('## Sugestões de Correção');
    reportLines.push('');
    
    if (totalErrors > 0) {
      reportLines.push('### Erros Críticos');
      reportLines.push('');
      reportLines.push('1. Corrija todos os campos obrigatórios faltantes');
      reportLines.push('2. Resolva duplicatas de IDs, nomes e extensões');
      reportLines.push('3. Verifique tipos de dados incorretos');
      reportLines.push('');
    }
    
    if (totalWarnings > 0) {
      reportLines.push('### Melhorias Recomendadas');
      reportLines.push('');
      reportLines.push('1. Padronize IDs para formato kebab-case');
      reportLines.push('2. Valide URLs de referências');
      reportLines.push('3. Remova campos não esperados');
      reportLines.push('');
    }
  }

  // Salvar relatório
  const reportPath = path.join(__dirname, '..', 'validation-report.md');
  const reportContent = reportLines.join('\n');
  
  require('fs').writeFileSync(reportPath, reportContent, 'utf8');
  logger.success(`Relatório salvo em: ${reportPath}`);
  
  return reportPath;
}

/**
 * Função principal
 */
async function main() {
  try {
    logger.info('🚀 Iniciando script de organização de dados');
    logger.info(`Diretório de dados: ${DATA_DIR}`);
    
    // Verificar se os arquivos existem
    const files = [AREAS_FILE, FORMATS_FILE, GLOSSARY_FILE];
    for (const file of files) {
      if (!fileExists(file)) {
        throw new Error(`Arquivo não encontrado: ${file}`);
      }
    }

    // 1. Validar dados
    const validationResults = await validateAllData();
    
    // 2. Organizar dados (mesmo com avisos)
    if (!process.argv.includes('--validate-only')) {
      if (validationResults.valid || process.argv.includes('--force')) {
        await organizeAllData();
      } else {
        logger.warn('Organização pulada devido a erros de validação. Use --force para forçar.');
      }
    } else {
      logger.info('Apenas validação executada (--validate-only)');
    }
    
    // 3. Gerar relatório
    const reportPath = await generateReport(validationResults);
    
    logger.section('CONCLUSÃO');
    if (validationResults.valid) {
      logger.success('✅ Script executado com sucesso!');
    } else {
      logger.failure('❌ Script concluído com erros. Verifique o relatório.');
    }
    
    process.exit(validationResults.valid ? 0 : 1);
    
  } catch (error) {
    logger.error(`💥 Erro fatal: ${error.message}`);
    process.exit(1);
  }
}

// Executar se for chamado diretamente
if (require.main === module) {
  main();
}

module.exports = { validateAllData, organizeAllData, generateReport };
