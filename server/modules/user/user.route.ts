import Router from 'koa-router';

const router = new Router();

router.prefix('/user');

router.get('/:username', async (ctx, next) => {
  const username = ctx.params.username;
  ctx.body = ctx.ok(`Hello, ${username}`);
  await next();
});

router.post('/', async (ctx, next) => {
  const user = ctx.request.body;
  console.log('User data received:', user);
  ctx.body = ctx.ok(`Successfully created user`);
  await next();
});

export default router;
