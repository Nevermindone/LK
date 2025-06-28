import axios from "axios";

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE ?? "http://localhost:8000",
  withCredentials: false,          // cookies не нужны, JWT будем класть в header
  timeout: 10_000,
});
