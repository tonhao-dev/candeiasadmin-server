import { knex } from 'knex';

import { GuardianTable, StudentTable } from './studentTable';
import { BeltTypeTable } from './beltTypeTable';
import { BeltTable } from './beltTable';
import { CenterTable } from './centerTable';

declare module 'knex/types/tables' {
  interface Tables {
    student: StudentTable;
    guardian: GuardianTable;
    beltType: BeltTypeTable;
    belt: BeltTable;
    center: CenterTable;
  }
}
