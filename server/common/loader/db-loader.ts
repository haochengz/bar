import { sequelize } from '../db';

export default async function load(): Promise<boolean> {
  console.log('Loading database connection...');

  try {
    // Test the database connection
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    await sequelize.sync({ alter: true });
    console.log('Database synchronized successfully.');

    return true;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return false;
  }
}
