import Koa from 'koa';

export default async function globalExceptionHandler(ctx: Koa.Context, next: Koa.Next) {
  try {
    await next();
  } catch (err) {
    ctx.body = 'Exception thrown in global exception handler';
    console.error('Global Exception Handler:', err);
  }
}
