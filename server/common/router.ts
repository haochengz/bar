import { koaBody } from 'koa-body';
import Router from 'koa-router';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const routesDir = path.join(__dirname, '../routes');

export default async function getRouter() {
  const rootRouter = new Router();
  const files = fs.readdirSync(routesDir);
  console.log('Find route files: ', files);

  rootRouter.use(koaBody());
  rootRouter.prefix('/api');

  for (const file of files) {
    if (!file.endsWith('.ts') && !file.endsWith('.js')) continue;
    // fullPaht: /home/user/project/foo.ts
    // which is the absolute path to the file
    const fullPath = path.join(routesDir, file);
    // fileUrl: file:///home/user/project/foo.ts
    // which is the url to the file for esm import
    const fileUrl = pathToFileURL(fullPath).href;
    const mudule = await import(fileUrl);
    const router = mudule.default || mudule;

    if (router instanceof Router) {
      console.log(`Registering route from ${file}`);
      rootRouter.use(router.routes(), router.allowedMethods());
    } else {
      console.warn(`File ${file} does not export a valid Router instance.`);
    }
  }

  // router.use()

  return rootRouter;
}
