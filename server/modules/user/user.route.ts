import Router from 'koa-router';

import * as userService from './user.service';
import { ok } from '../../common/utils/respond';

const router = new Router();

router.prefix('/users');

// create a new user

// delete a user

// update a user

// get a user

// get all users

// get all users with pagination

// get all users with filter

// get all users with filter and pagination

// get all users with sorting

// get all users with sorting and pagination

// get all users with search

// get all users with search and pagination

// sending the varification email

// update password

router.get('/', async (ctx, next) => {
  const users = await userService.findAllUsers();
  ctx.body = ok(users);
  await next();
});

router.get('/:username', async (ctx, next) => {
  const username = ctx.params.username;
  const user = await userService.findByUsername(username);
  ctx.body = ok(`Hello, ${user ? user.username : 'Guest'}!`);
  await next();
});

router.post('/', async (ctx, next) => {
  const user = ctx.request.body;
  console.log('User data received:', user);
  const newUser = await userService.createUser(user);
  global.logger.info(`Successfully created user: ${newUser.username}`);
  ctx.body = ok(`Successfully created user: ${newUser.username}`);
  await next();
});

export default router;
