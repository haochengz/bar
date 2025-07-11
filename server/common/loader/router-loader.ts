import Koa from 'koa';
import { koaBody } from 'koa-body';
import Router from 'koa-router';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import findBySuffix from '../utils/findBySuffix';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const routesDir = path.join(__dirname, '../../modules');

export default async function routerLoader(app: Koa) {
  const rootRouter = new Router();
  const files = findBySuffix(routesDir, 'route.ts');
  global.logger.info('Find route files: ', files);

  rootRouter.use(koaBody());
  rootRouter.prefix('/api');

  for (const file of files) {
    if (!file.endsWith('route.ts') && !file.endsWith('route.js')) continue;
    // path of file is fullpath like: /home/user/project/foo.ts
    // which is the absolute path to the file

    // fileUrl: file:///home/user/project/foo.ts
    // which is the url to the file for esm import
    const fileUrl = pathToFileURL(file).href;
    const mudule = await import(fileUrl);
    const router = mudule.default || mudule;

    if (router instanceof Router) {
      global.logger.info(`Registering route from ${file}`);
      rootRouter.use(router.routes(), router.allowedMethods());
    } else {
      global.logger.error(`File ${file} does not export a valid Router instance.`);
      global.logger.error(`Please check the middleware: ${file}`);
    }
  }

  app.use(rootRouter.routes());
}
