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
  console.log('Find middleware files: ', files);

  for (const file of MIDDLEWARES) {
    const filePath = path.join(middlewaresDir, `${file}.ts`);
    const fileUrl = pathToFileURL(filePath).href;

    console.log(`Loading middleware from ${fileUrl}`);

    const module = await import(fileUrl);
    const middleware = module.default || module;

    app.use(middleware);
  }
}
