import axios from "axios";

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE ?? "http://localhost:8000",
  withCredentials: false,
  timeout: 10_000,
});

let token: string | null = localStorage.getItem("token");
export function setToken(t: string | null) {
  token = t;
  if (t) localStorage.setItem("token", t);
  else localStorage.removeItem("token");
}

http.interceptors.request.use((config) => {
  if (token) {
    config.headers = config.headers || {};
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});
