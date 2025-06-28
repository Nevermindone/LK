import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { http } from "@/shared/api";
import type { LegalCase, CaseDocument } from "@/entities/case/types";

export default function CaseView() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<LegalCase | null>(null);
  const [docs, setDocs] = useState<CaseDocument[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    http.get<LegalCase>(`/cases/${id}`)
      .then(r => setData(r.data))
      .catch(e => setErr(e.message));
    http.get<CaseDocument[]>(`/cases/${id}/documents`)
      .then(r => setDocs(r.data))
      .catch(() => {});
  }, [id]);

  if (err) return <p className="text-red-600">Ошибка: {err}</p>;
  if (!data) return <p>Загрузка…</p>;

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold">{data.title}</h2>
      {data.description && <p>{data.description}</p>}
      <p className="text-sm text-gray-600">Категория: {data.category.name}</p>
      <p className="text-sm text-gray-500">Создано: {new Date(data.created_at).toLocaleString()}</p>

      <div>
        <h3 className="font-semibold mb-1">Документы</h3>
        {docs.length ? (
          <ul className="list-disc pl-5 space-y-1">
            {docs.map(d => (
              <li key={d.id}>
                <a
                  href={`/cases/${data.id}/documents/${d.id}`}
                  className="text-indigo-600 hover:underline"
                >
                  {d.filename}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Документов нет</p>
        )}
      </div>

      <Link to="/" className="text-indigo-600 hover:underline">Назад к списку</Link>
    </div>
  );
}
