import { knex } from 'knex';

import { GuardianTable, StudentTable } from './table';

declare module 'knex/types/tables' {
  interface Tables {
    student: StudentTable;
    guardian: GuardianTable;
  }
}
