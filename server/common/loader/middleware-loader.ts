import Koa from 'koa';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const MIDDLEWARES = [
  // Add your middlewares here
  'request',
  'global-responder',
  'global-exception',
];

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const middlewaresDir = path.join(__dirname, '../middlewares');

export default async function MiddlewareLoader(app: Koa) {
  const files = fs.readdirSync(middlewaresDir);
  (globalThis as any).logger.info('Loading middlewares...');
  (globalThis as any).logger.debug(`Found middlewares: ${files.join(', ')}`);

  for (const file of MIDDLEWARES) {
    const filePath = path.join(middlewaresDir, `${file}.ts`);
    const fileUrl = pathToFileURL(filePath).href;

    (globalThis as any).logger.info(`Loading middleware from ${fileUrl}`);

    try {
      const module = await import(fileUrl);
      const middleware = module.default || module;
      app.use(middleware);
    } catch (error) {
      (globalThis as any).logger.fatal(`Failed to load middleware ${file}:`, error);
      process.exit(1); // Exit the process if middleware loading fails
    }
  }
}
