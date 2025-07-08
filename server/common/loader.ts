import Koa from 'koa';

import getRouter from './router';
import globalExceptionHandler from './global-exception';
import respondHandler from './responder';

export default async function load(app: Koa) {
  const router = await getRouter();

  // Register responder methods to the app context
  app.use(respondHandler);

  // Global Exception Handler, any un-catched exception will be handled
  // here
  app.use(globalExceptionHandler);

  // Load all routers from routes directory
  app.use(router.routes());
  console.log('Loading plugins done!');
  return true;
}
