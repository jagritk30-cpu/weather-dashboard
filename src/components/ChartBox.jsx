import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ChartBox({ title, data, dataKey }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md mt-6 overflow-x-auto">
      <h2 className="font-bold mb-3">{title}</h2>

      <div style={{ width: "1000px" }}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="time" hide />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey={dataKey} stroke="#3b82f6" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}