/**
 * Sistema de logging simples para os scripts
 */

const LOG_LEVELS = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3
};

class Logger {
  constructor(level = LOG_LEVELS.INFO) {
    this.level = level;
    this.startTime = Date.now();
  }

  setLevel(level) {
    this.level = level;
  }

  _log(level, levelName, message, ...args) {
    if (level <= this.level) {
      const timestamp = new Date().toISOString();
      const elapsed = ((Date.now() - this.startTime) / 1000).toFixed(2);
      console.log(`[${timestamp}] [${elapsed}s] ${levelName}: ${message}`, ...args);
    }
  }

  error(message, ...args) {
    this._log(LOG_LEVELS.ERROR, 'ERROR', message, ...args);
  }

  warn(message, ...args) {
    this._log(LOG_LEVELS.WARN, 'WARN', message, ...args);
  }

  info(message, ...args) {
    this._log(LOG_LEVELS.INFO, 'INFO', message, ...args);
  }

  debug(message, ...args) {
    this._log(LOG_LEVELS.DEBUG, 'DEBUG', message, ...args);
  }

  success(message, ...args) {
    this._log(LOG_LEVELS.INFO, '✓ SUCCESS', message, ...args);
  }

  failure(message, ...args) {
    this._log(LOG_LEVELS.ERROR, '✗ FAILURE', message, ...args);
  }

  section(title) {
    this._log(LOG_LEVELS.INFO, 'SECTION', `=== ${title} ===`);
  }

  subsection(title) {
    this._log(LOG_LEVELS.INFO, 'SUBSECTION', `--- ${title} ---`);
  }
}

// Instância global do logger
const logger = new Logger();

module.exports = { Logger, logger, LOG_LEVELS };
