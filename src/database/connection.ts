import knex, { Knex } from 'knex';
import { env } from '../env';

const config: Knex.Config = {
  client: 'pg',
  connection: {
    database: env.DATA_API_DB_NAME,
    host: env.DATA_API_DB_SERVICE_HOST,
    port: env.DATA_API_DB_SERVICE_PORT,
    user: env.DATA_API_DB_USER,
    password: env.DATA_API_DB_PASSWORD,
  },
};

const connection = knex(config);

export { config };
export default connection;
