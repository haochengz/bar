import { Sequelize } from 'sequelize-typescript';

export const sequelize = new Sequelize({
  database: process.env.DB_DATABASE,
  username: process.env.DB_USER,
  password: process.env.DB_PWD,
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  logging: false, // Disable logging for production
  pool: {
    max: process.env.DB_POOL_MAX ? Number(process.env.DB_POOL_MAX) : 100, // Maximum number of connections in the pool
    min: process.env.DB_POOL_MIN ? Number(process.env.DB_POOL_MIN) : 5, // Minimum number of connections in the pool
    acquire: process.env.DB_POOL_ACQUIRE ? Number(process.env.DB_POOL_ACQUIRE) : 30000, // Maximum time, in milliseconds, that pool will try to get a connection before throwing an error
    idle: process.env.DB_POOL_IDLE ? Number(process.env.DB_POOL_IDLE) : 10000, // Maximum time, in milliseconds, that a connection can be idle before being released
  },
});
