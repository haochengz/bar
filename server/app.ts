import Koa from 'koa';
import Router from 'koa-router';
import { koaBody } from 'koa-body';

import userRouter from './routes/user';

const PORT: number = 3002;

const app = new Koa();
const router = new Router();

app.use(router.routes());

router.prefix('/api');
router.use(koaBody());
router.use(userRouter.routes(), userRouter.allowedMethods());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
