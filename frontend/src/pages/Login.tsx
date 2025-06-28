import React, { useState } from "react";
import { login } from "@/entities/auth/api";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate("/");
    } catch (e: any) {
      setError(e.response?.data?.detail || e.message);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4 max-w-sm mx-auto">
      <h2 className="text-xl font-semibold text-center">Вход</h2>
      {error && <p className="text-red-600">{error}</p>}
      <input
        className="border p-2 w-full rounded"
        placeholder="Логин"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        className="border p-2 w-full rounded"
        placeholder="Пароль"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 w-full"
      >
        Войти
      </button>
    </form>
  );
}
