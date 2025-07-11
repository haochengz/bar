import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { sequelize } from '../db';

import findBySuffix from '../utils/findBySuffix';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const modelsDir = path.join(__dirname, '../../modules');

export default async function load(): Promise<boolean> {
  global.logger.info('Loading database connection...');

  try {
    // Test the database connection
    await sequelize.authenticate();
    global.logger.info('Database connection established successfully.');

    await loadModels();
    global.logger.info('Models loaded successfully.');

    await sequelize.sync({ alter: true });
    global.logger.info('Database synchronized successfully.');

    return true;
  } catch (error) {
    global.logger.fatal('Database connection failed:', error);
    process.exit(1); // Exit the process if the database connection fails
  }
}

async function loadModels() {
  const files = findBySuffix(modelsDir, 'model.ts');
  global.logger.info('Find model files: ', files);

  for (const file of files) {
    if (!file.endsWith('model.ts') && !file.endsWith('model.js')) continue;

    // fileUrl: file:///home/user/project/foo.model.ts
    // which is the url to the file for esm import
    const fileUrl = pathToFileURL(file).href;
    const module = await import(fileUrl);
    const model = module.default || module;

    if (typeof model === 'function') {
      global.logger.info(`Registering model from ${file}`);
      sequelize.addModels([model]);
    } else {
      global.logger.error(`File ${file} does not export a valid model.`);
      global.logger.error(`Please check the model: ${file}`);
    }
  }
}
