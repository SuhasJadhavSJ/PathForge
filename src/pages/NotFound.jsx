import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-950 text-white text-center px-6">
      <h1 className="text-6xl font-extrabold bg-gradient-to-r from-purple-500 to-cyan-400 text-transparent bg-clip-text">
        404
      </h1>
      <p className="text-slate-400 mt-2 text-lg">Page not found</p>

      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-xl flex items-center gap-2 hover:opacity-90 transition"
      >
        <FiArrowLeft /> Go Home
      </Link>
    </div>
  );
}
