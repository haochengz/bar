import Koa from 'koa';

export default async function requestLogger(ctx: Koa.Context, next: Koa.Next) {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;

  global.logger.info(`${ctx.method} ${ctx.url} - ${ms}ms`);
}
