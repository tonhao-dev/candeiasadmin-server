export interface CenterTable {
  id: string;
  name: string;
  address: string;
  longitude?: number;
  latitude?: number;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
}
