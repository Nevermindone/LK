import { http } from "@/shared/api";
import type { LegalCase, CaseDocument } from "./types";

export async function fetchAllCases(): Promise<LegalCase[]> {
  const { data } = await http.get<LegalCase[]>("/cases");
  return data;
}

export async function fetchCase(id: number): Promise<LegalCase> {
  const { data } = await http.get<LegalCase>(`/cases/${id}`);
  return data;
}

export async function fetchCaseDocuments(id: number): Promise<CaseDocument[]> {
  const { data } = await http.get<CaseDocument[]>(`/cases/${id}/documents`);
  return data;
}
