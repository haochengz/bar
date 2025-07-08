import Koa from 'koa';

import getRouter from './router';

export default async function load(app: Koa) {
  const router = await getRouter();

  app.use(router.routes());
  console.log('Loading plugins done!');
  return true;
}
