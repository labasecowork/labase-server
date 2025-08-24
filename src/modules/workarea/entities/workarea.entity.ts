// src/modules/workarea/entities/workarea.entity.ts

export interface WorkAreaEntity {
  id: string;
  name: string;
  description: string | null;
  capacity: number;
  disabled: boolean;
  created_at: Date;
  updated_at: Date;
}

export type WorkAreaStatus = "active" | "disabled";
