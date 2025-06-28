import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { http } from "@/shared/api";

interface Category {
  id: number;
  name: string;
}

export default function NewCase() {
  /* ─── state ─────────────────────────────────────────────── */
  const [cats, setCats]              = useState<Category[]>([]);
  const [title, setTitle]            = useState("");
  const [description, setDescription]= useState("");
  const [categoryId, setCategoryId]  = useState<number | "">("");

  const navigate = useNavigate();

  /* ─── fetch categories once ─────────────────────────────── */
  useEffect(() => {
    http.get<Category[]>("/categories")
        .then(r => setCats(r.data))
        .catch(err => console.error("categories error", err));
  }, []);

  /* ─── form submit ───────────────────────────────────────── */
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (categoryId === "") return alert("Выберите категорию");

    await http.post("/cases/", {
      title,
      description,
      category_id: Number(categoryId),
    });

    navigate("/");      // назад к списку дел
  };

  /* ─── UI ────────────────────────────────────────────────── */
  return (
    <form onSubmit={submit} className="space-y-4 max-w-md mx-auto">
      {/* ─ название ─ */}
      <input
        className="border p-2 w-full rounded"
        placeholder="Название дела"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />

      {/* ─ описание ─ */}
      <textarea
        className="border p-2 w-full rounded min-h-[120px]"
        placeholder="Краткое описание (необязательно)"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      {/* ─ категория ─ */}
      <select
        className="border p-2 w-full rounded"
        value={categoryId}
        onChange={e => {
          const val = e.target.value;
          setCategoryId(val === "" ? "" : Number(val));
        }}
        required
      >
        <option value="">— выберите категорию —</option>
        {cats.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      {/* ─ submit ─ */}
      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Создать
      </button>
    </form>
  );
}
