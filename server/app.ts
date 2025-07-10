import Koa from 'koa';

import load from './common/loader/app-loader';

const PORT: number = 3002;
const app = new Koa();

try {
  await load(app); // Load plugins or initialize components
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
} catch (error) {
  console.error('Error loading application components:', error);
}
