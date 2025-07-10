import 'dotenv/config';

if (process.env.ENV === 'development') {
  process.env.DB_HOST = process.env.DEV_DB_HOST;
  process.env.DB_PORT = process.env.DEV_DB_PORT;
  process.env.DB_USER = process.env.DEV_DB_USER;
  process.env.DB_PWD = process.env.DEV_DB_PWD;
  process.env.DB_DATABASE = process.env.DEV_DB_DATABASE;
} else if (process.env.ENV === 'production') {
  process.env.DB_HOST = process.env.PROD_DB_HOST;
  process.env.DB_PORT = process.env.PROD_DB_PORT;
  process.env.DB_USER = process.env.PROD_DB_USER;
  process.env.DB_PWD = process.env.PROD_DB_PWD;
  process.env.DB_DATABASE = process.env.PROD_DB_DATABASE;
}
