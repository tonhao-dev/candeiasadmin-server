import knex, { Knex } from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const config: Knex.Config = {
  client: 'pg',
  connection: {
    database: process.env.DATA_API_DB_NAME,
    host: process.env.DATA_API_DB_SERVICE_HOST,
    port: parseInt(process.env.DATA_API_DB_SERVICE_PORT || '5432', 10),
    user: process.env.DATA_API_DB_USER || 'postgres',
    password: process.env.DATA_API_DB_PASSWORD || 'postgres',
  },
};

const connection = knex(config);

export { config };
export default connection;
