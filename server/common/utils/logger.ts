import path from 'node:path';
import log4js from 'log4js';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

// 计算 __dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logDir = path.join(__dirname, '../../logs');

// 确保日志目录存在
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

log4js.configure({
  appenders: {
    // 控制台输出
    console: { type: 'console' },

    // info 级别及以下写入 info.log（按天分文件）
    infoFile: {
      type: 'dateFile',
      filename: path.join(logDir, 'info.log'),
      pattern: 'yyyy-MM-dd',
      numBackups: 7,
      keepFileExt: true,
      alwaysIncludePattern: true,
    },

    // error 和 fatal 写入 error.log（按天分文件）
    errorFile: {
      type: 'dateFile',
      filename: path.join(logDir, 'error.log'),
      pattern: 'yyyy-MM-dd',
      numBackups: 7,
      keepFileExt: true,
      alwaysIncludePattern: true,
    },

    // 使用 logLevelFilter 控制 errorFile 的过滤级别
    errorFilter: {
      type: 'logLevelFilter',
      appender: 'errorFile',
      level: 'error',
    },

    // 控制台过滤器，只打印 fatal, error, debug
    consoleFilter: {
      type: 'logLevelFilter',
      appender: 'console',
      level: 'debug',
      maxLevel: 'error',
    },
  },

  categories: {
    default: {
      appenders: ['infoFile', 'errorFilter', 'consoleFilter'],
      level: 'debug',
    },
  },
});

const logger = log4js.getLogger();

// 挂载到全局，现在有类型支持
global.logger = logger;

export default logger;
