import { knex } from 'knex';

import { GuardianTable, StudentTable } from './studentTable';

declare module 'knex/types/tables' {
  interface Tables {
    student: StudentTable;
    guardian: GuardianTable;
  }
}
