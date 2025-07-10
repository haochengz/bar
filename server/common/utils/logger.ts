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

// Level: Trace < Debug < Info < Warn < Error < Fatal
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
      level: 'error', // error 以上的日志输出到 errorFile
    },

    // 控制台过滤器，只打印 fatal, error, debug
    consoleFilter: {
      type: 'logLevelFilter',
      appender: 'console',
      level: 'debug', // debug以上, error以下的日志输出到console
      maxLevel: 'error',
    },
  },

  categories: {
    default: {
      // 日志首先采用infoFile的方式输出, 接着流经errorFilter, 符合条件的输出到errorFile配置,
      // 接着流经consoleFilter, 符合条件的输出到console配置
      appenders: ['infoFile', 'errorFilter', 'consoleFilter'],
      // 记录的最低级别
      level: 'debug',
    },
  },
});

// 这里以后可以创建多个categories, 分别对应调式, 开发, 生产等, 实例化logger对象时, 现在上面的default是
// 唯一一个category, 有了多个之后就可以传入 category 名称, 比如 log4js.getLogger('development');
const logger = log4js.getLogger();

// 挂载到全局，现在有类型支持
global.logger = logger;

export default logger;
