import Koa from 'koa';

import logger from '../utils/logger';

export default async function requestLogger(ctx: Koa.Context, next: Koa.Next) {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;

  logger.info(`${ctx.method} ${ctx.url} - ${ms}ms`);
}
