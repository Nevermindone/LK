import { http } from "@/shared/api";
import type { LegalCase } from "./types";

export async function fetchAllCases(): Promise<LegalCase[]> {
  const { data } = await http.get<LegalCase[]>("/cases");
  return data;
}
