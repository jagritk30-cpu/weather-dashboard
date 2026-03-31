export default function StatCard({ title, value }) {
  return (
    <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-xl p-4 text-center hover:scale-105 transition">
      <p className="text-gray-600">{title}</p>
      <h2 className="text-xl font-bold">{value}</h2>
    </div>
  );
}