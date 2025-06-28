export interface LegalCase {
  id: number;
  title: string;
  description: string;
  created_at: string;      // ISO-строка
  category: { id: number; name: string };
}
