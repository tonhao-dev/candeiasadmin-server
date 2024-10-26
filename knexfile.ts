import path from 'path';
import { Knex } from 'knex';
import { config } from './src/database/connection';

module.exports = {
  ...config,
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname, 'src', 'database', 'seeds'),
  },
} as Knex.Config;
