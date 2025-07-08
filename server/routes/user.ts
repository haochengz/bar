import Router from 'koa-router';

const router = new Router();

router.prefix('/user');

router.get('/:username', async (ctx, next) => {
  const username = ctx.params.username;
  ctx.body = `Hello, ${username}`;
  await next();
});

router.post('/', async (ctx, next) => {
  const user = ctx.request.body;
  console.log('User data received:', user);
  ctx.body = `You are trying to add a new user with data: ${user.username}`;
  await next();
});

export default router;
