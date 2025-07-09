import Koa from 'koa';

import load from './common/loader/app-loader';

const PORT: number = 3002;
const app = new Koa();

const status = await load(app); // Load plugins or initialize components

if (status) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
} else {
  console.error('Failed to load the application components.');
  process.exit(1);
}
