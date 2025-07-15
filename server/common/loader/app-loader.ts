import Koa from 'koa';

import routerLoader from './router-loader';
import MiddlewareLoader from './middleware-loader';

import './env-loader'; // Load environment variables
import '../utils/logger'; // Initialize logger

import dbConnect from './db-loader';

export default async function laod(app: Koa) {
  global.logger.info('Loading application components...');

  await dbConnect();

  // Load middlewares, auto load
  await MiddlewareLoader(app);

  // Load all routers from routes directory, auto load
  await routerLoader(app);
}
