import Router from 'koa-router';

import * as userService from './user.service';

const router = new Router();

router.prefix('/users');

router.get('/', async (ctx, next) => {
  const users = await userService.findAllUsers();
  ctx.body = ctx.ok(users);
  await next();
});

router.get('/:username', async (ctx, next) => {
  const username = ctx.params.username;
  const user = await userService.findByUsername(username);
  ctx.body = ctx.ok(`Hello, ${user ? user.username : 'Guest'}!`);
  await next();
});

router.post('/', async (ctx, next) => {
  const user = ctx.request.body;
  console.log('User data received:', user);
  const newUser = await userService.createUser(user);
  global.logger.info(`Successfully create user: ${newUser.username}`);
  ctx.body = ctx.ok(`Successfully created user: ${newUser.username}`);
  await next();
});

export default router;
