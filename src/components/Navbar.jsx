import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-blue-600 text-white">
      <h1 className="font-bold text-xl">Weather Dashboard</h1>
      <div className="space-x-4">
        <Link to="/">Current</Link>
        <Link to="/historical">Historical</Link>
      </div>
    </div>
  );
}