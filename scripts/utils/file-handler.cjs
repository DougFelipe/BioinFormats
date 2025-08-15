const fs = require('fs');
const path = require('path');

/**
 * Carrega um arquivo JSON
 * @param {string} filePath - Caminho para o arquivo JSON
 * @returns {any} Dados do JSON
 */
function loadJSON(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error(`Arquivo não encontrado: ${filePath}`);
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    throw new Error(`Erro ao carregar ${filePath}: ${error.message}`);
  }
}

/**
 * Salva dados em um arquivo JSON formatado
 * @param {string} filePath - Caminho para salvar o arquivo
 * @param {any} data - Dados para salvar
 * @param {Object} options - Opções de formatação
 */
function saveJSON(filePath, data, options = {}) {
  const { indent = 2, addNewline = true } = options;
  
  try {
    // Criar diretório se não existir
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    let content = JSON.stringify(data, null, indent);
    if (addNewline) {
      content += '\n';
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
  } catch (error) {
    throw new Error(`Erro ao salvar ${filePath}: ${error.message}`);
  }
}

/**
 * Cria backup de um arquivo
 * @param {string} filePath - Caminho do arquivo original
 * @returns {string} Caminho do backup criado
 */
function createBackup(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Arquivo não encontrado para backup: ${filePath}`);
  }
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = `${filePath}.backup.${timestamp}`;
  
  fs.copyFileSync(filePath, backupPath);
  return backupPath;
}

/**
 * Verifica se um arquivo existe
 * @param {string} filePath - Caminho do arquivo
 * @returns {boolean} True se o arquivo existe
 */
function fileExists(filePath) {
  return fs.existsSync(filePath);
}

/**
 * Obtém informações sobre um arquivo
 * @param {string} filePath - Caminho do arquivo
 * @returns {Object} Informações do arquivo
 */
function getFileInfo(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const stats = fs.statSync(filePath);
  return {
    path: filePath,
    size: stats.size,
    modified: stats.mtime,
    created: stats.birthtime
  };
}

module.exports = {
  loadJSON,
  saveJSON,
  createBackup,
  fileExists,
  getFileInfo
};
