import { http, setToken } from "@/shared/api";

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export async function login(username: string, password: string): Promise<void> {
  const data = new URLSearchParams();
  data.append("username", username);
  data.append("password", password);
  const res = await http.post<TokenResponse>("/auth/login", data, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  setToken(res.data.access_token);
  localStorage.setItem("token", res.data.access_token);
}
