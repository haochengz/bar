import Router from 'koa-router';
import Koa from 'koa';

import { User } from '../common/db/models';

const router = new Router();

router.prefix('/user');

router.get('/:username', async (ctx: Koa.Context, next: Koa.Next) => {
  const username = ctx.params.username;
  ctx.body = ctx.ok(`Hello, ${username}`);
  await next();
});

router.post('/', async (ctx, next) => {
  const user = ctx.request.body;
  console.log('User data received:', user);
  const newU = await User.create(user);
  ctx.body = ctx.ok(`Successfully created user: ${JSON.stringify(newU)}`);
  await next();
});

export default router;
