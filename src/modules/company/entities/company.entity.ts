// src/modules/company/entities/company.entity.ts

export interface CompanyEntity {
  id: string;
  name: string;
  description: string | null;
  created_at: Date;
  updated_at: Date;
}
