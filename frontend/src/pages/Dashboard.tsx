import React, { useEffect, useState } from "react";
import { fetchAllCases } from "@/entities/case/api";
import type { LegalCase } from "@/entities/case/types";
import { Link } from "react-router-dom";

/* --- вспомогательная карта категорий в цветовые бейджи --- */
const categoryColor: Record<string, string> = {
  "договора поставки": "bg-blue-100 text-blue-800",
  "наследование":      "bg-green-100 text-green-800",
};

export default function Dashboard() {
  const [cases, setCases] = useState<LegalCase[] | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    fetchAllCases()
      .then(setCases)
      .catch((e) => setErr(e.message));
  }, []);

  if (err) return <p className="text-red-600">Ошибка: {err}</p>;
  if (cases === null) return <p>Загрузка…</p>;
  if (!cases.length) {
    return (
      <div className="text-center space-y-4 mt-10">
        <p>Пока нет ни одного дела.</p>
        <Link to="/new"
              className="inline-block rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
          Создать новое
        </Link>
      </div>
    );
  }

  /* группировка по категориям */
  const grouped = cases.reduce<Record<string, LegalCase[]>>((acc, c) => {
    (acc[c.category.name] ||= []).push(c);
    return acc;
  }, {});

  return (
    <div className="space-y-10">
      {Object.entries(grouped).map(([cat, list]) => (
        <section key={cat}>
          <h2 className="mb-2 text-lg font-semibold capitalize">{cat}</h2>
          <ul className="space-y-1">
            {list.map((c) => (
              <li key={c.id}
                  className="flex items-center justify-between rounded border px-4 py-2 bg-white shadow-sm">
                <span>{c.title}</span>

                <span className={`ml-3 rounded px-2 py-0.5 text-xs ${categoryColor[cat] ?? "bg-gray-200"}`}>
                  {cat}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
