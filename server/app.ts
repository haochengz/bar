import Koa from 'koa';

const PORT = 3002;

const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello, Koa!';
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
