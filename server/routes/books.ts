import Router from 'koa-router';
import Koa from 'koa';

const router = new Router();

router.prefix('/book');

router.get('/:bookid', async (ctx: Koa.Context, next: Koa.Next) => {
  const username = ctx.params.username;
  ctx.body = ctx.g.ok(`Hello, ${username}`);
  await next();
});

router.post('/', async (ctx, next) => {
  const user = ctx.request.body;
  console.log('User data received:', user);
  ctx.body = `You are trying to add a new user with data: ${user.username}`;
  await next();
});

export default router;
