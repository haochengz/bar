export default async function globalExceptionHandler(ctx, next) {
  try {
    await next();
  } catch (err) {
    ctx.body = 'Exception thrown in global exception handler';
    console.error('Global Exception Handler:', err);
  }
}
