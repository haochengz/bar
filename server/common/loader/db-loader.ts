import { sequelize } from '../db';

export default async function load(): Promise<boolean> {
  global.logger.info('Loading database connection...');

  try {
    // Test the database connection
    await sequelize.authenticate();
    global.logger.info('Database connection established successfully.');

    await sequelize.sync({ alter: true });
    global.logger.info('Database synchronized successfully.');

    return true;
  } catch (error) {
    global.logger.fatal('Database connection failed:', error);
    process.exit(1); // Exit the process if the database connection fails
  }
}
