import Koa from 'koa';

import routerLoader from './router-loader';
import MiddlewareLoader from './middleware-loader';
import '../env'; // Load environment variables
import dbConnect from './db-loader';

export default async function laod(app: Koa): Promise<boolean> {
  console.log('Loading application components...');

  // Connect to database if needed
  await dbConnect();

  // Load middlewares
  await MiddlewareLoader(app);

  // Load all routers from routes directory
  await routerLoader(app);
  return true;
}
