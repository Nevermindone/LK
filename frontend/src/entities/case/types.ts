export interface LegalCase {
  id: number;
  title: string;
  description: string;
  created_at: string;      // ISO-строка
  category: { id: number; name: string };
}

export interface CaseDocument {
  id: number;
  case_id: number;
  filename: string;
  uploaded_at: string;
}
