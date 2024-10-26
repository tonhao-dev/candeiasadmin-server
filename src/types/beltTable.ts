export interface BeltTable {
  id: string;
  name: string;
  title: string;
  colorHexCode: string; // #000000 or #000000,#ffffff using comma to separate
  belt_type_code?: string | null;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
}
