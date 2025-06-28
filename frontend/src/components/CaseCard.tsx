export default function CaseCard({ data }) {
  return (
    <div className="border rounded-xl p-4 shadow-sm">
      <h2 className="font-semibold">{data.title}</h2>
      <p className="text-sm text-gray-600">{data.category.name}</p>
      <p className="text-xs mt-2">{new Date(data.created_at).toLocaleDateString()}</p>
    </div>
  );
}