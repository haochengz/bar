import path from 'node:path';
import log4js from 'log4js';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logDir = path.join(__dirname, '../../logs');

log4js.configure({
  appenders: {
    console: { type: 'console' },
    info: {
      type: 'file',
      filename: path.join(logDir, 'info.log'),
      maxLogSize: 10485760, // 10MB
      backups: 3,
      compress: true,
    },
    error: {
      type: 'file',
      filename: path.join(logDir, 'error.log'),
      maxLogSize: 10485760, // 10MB
      backups: 3,
      compress: true,
    },
    errorFilter: {
      type: 'logLevelFilter',
      level: 'error',
      appender: 'error',
    },
  },
  categories: {
    default: { appenders: ['console'], level: 'info' },
    file: { appenders: ['info'], level: 'debug' },
    error: { appenders: ['errorFilter'], level: 'error' },
  },
});

const logger = log4js.getLogger('file');

export default logger;
