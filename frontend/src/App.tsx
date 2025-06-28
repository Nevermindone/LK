// src/App.tsx
import React, { Suspense } from "react";
import { Routes, Route, Navigate, Outlet, Link } from "react-router-dom";

/* --- lazy-pages (код-сплит) --- */
const Dashboard = React.lazy(() => import("@/pages/Dashboard"));
const NewCase   = React.lazy(() => import("@/pages/NewCase"));
const CaseView  = React.lazy(() => import("@/pages/CaseView"));

/* --- простейший шапка + контейнер --- */
function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="shrink-0 border-b bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Личный кабинет</h1>
          <Link
            to="/new"
            className="text-sm text-indigo-600 hover:underline"
          >
            Создать дело
          </Link>
        </div>
      </header>

      <main className="grow bg-gray-50 p-6">
        {/* дочерние маршруты рендерятся сюда */}
        <Suspense fallback={<p>Загрузка…</p>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* главный экран со списком дел */}
        <Route index element={<Dashboard />} />

        {/* создание нового дела */}
        <Route path="new" element={<NewCase />} />

        {/* просмотр одного дела */}
        <Route path="cases/:id" element={<CaseView />} />

        {/* редирект со старого пути, если был */}
        <Route path="create" element={<Navigate to="/new" replace />} />

        {/* 404 */}
        <Route path="*" element={<p className="text-center mt-10">Страница не найдена</p>} />
      </Route>
    </Routes>
  );
}
