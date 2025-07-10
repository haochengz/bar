import Koa from 'koa';

export default async function globalExceptionHandler(ctx: Koa.Context, next: Koa.Next) {
  try {
    await next();
  } catch (err) {
    global.logger.error('Global Exception Handler:', err);
    ctx.body = ctx.fail('Internal Server Error by Global Exception Handler');
  }
}
