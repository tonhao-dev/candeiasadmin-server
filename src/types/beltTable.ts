export interface BeltTable {
  id: string;
  name: string;
  title: string;
  color_hex_code: string; // #000000 or #000000,#ffffff using comma to separate
  belt_type_code?: string | null;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
}
