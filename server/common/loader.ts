import Koa from 'koa';

import getRouter from './router';
import globalExceptionHandler from './global-exception';

export default async function load(app: Koa) {
  const router = await getRouter();

  // Global Exception Handler, any un-catched exception will be handled
  // here
  app.use(globalExceptionHandler);

  // Load all routers from routes directory
  app.use(router.routes());
  console.log('Loading plugins done!');
  return true;
}
