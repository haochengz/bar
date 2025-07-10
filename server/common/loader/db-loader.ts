import { sequelize } from '../db';

export default async function load(): Promise<boolean> {
  (globalThis as any).logger.info('Loading database connection...');

  try {
    // Test the database connection
    await sequelize.authenticate();
    (globalThis as any).logger.info('Database connection established successfully.');

    await sequelize.sync({ alter: true });
    (globalThis as any).logger.info('Database synchronized successfully.');

    return true;
  } catch (error) {
    (globalThis as any).logger.fatal('Database connection failed:', error);
    process.exit(1); // Exit the process if the database connection fails
  }
}
