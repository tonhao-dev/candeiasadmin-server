export interface BeltTypeTable {
  id: string;
  code: string;
  name: string;
  rangeStartInYears: number;
  rangeEndInYears: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}
