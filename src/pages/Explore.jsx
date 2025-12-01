// client/src/pages/Explore.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import RoadmapCard from "../components/RoadmapCard";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";

export default function Explore() {
  const [roadmaps, setRoadmaps] = useState([]);
  const [q, setQ] = useState("");
  const [domain, setDomain] = useState("");
  const [duration, setDuration] = useState("");
  const [sort, setSort] = useState("popular"); // options: popular, newest
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const perPage = 9;

  const load = async () => {
    try {
      setLoading(true);
      const params = {
        q,
        domain,
        duration,
        sort,
        page,
        perPage,
      };
      const { data } = await axios.get("https://pathforge-backend-zn5j.onrender.com/api/roadmap/explore", { params });
      setRoadmaps(data.roadmaps);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error("Failed to load explore:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // load on mount and whenever filters change
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, domain, duration, sort, page]);

  const resetFilters = () => {
    setQ("");
    setDomain("");
    setDuration("");
    setSort("popular");
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <motion.h1 initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-4xl font-extrabold text-center mb-6 bg-gradient-to-r from-purple-500 to-cyan-400 text-transparent bg-clip-text">
          Explore Roadmaps
        </motion.h1>

        {/* Controls */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8 backdrop-blur-md">
          <div className="flex flex-col md:flex-row gap-3 md:items-center">
            <div className="flex items-center gap-2 flex-1">
              <FiSearch className="text-slate-300" />
              <input
                value={q}
                onChange={(e) => { setQ(e.target.value); setPage(1); }}
                placeholder="Search by title, topic or resource..."
                className="flex-1 bg-transparent outline-none px-2 py-2 text-slate-200"
              />
            </div>

            <select value={domain} onChange={(e) => { setDomain(e.target.value); setPage(1); }} className="bg-slate-800 border border-slate-700 px-3 py-2 rounded text-slate-200">
              <option value="">All domains</option>
              <option value="MERN">MERN</option>
              <option value="AI / Machine Learning">AI / Machine Learning</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Data Science">Data Science</option>
              <option value="Web Development">Web Development</option>
              <option value="Python Programming">Python Programming</option>
            </select>

            <select value={duration} onChange={(e) => { setDuration(e.target.value); setPage(1); }} className="bg-slate-800 border border-slate-700 px-3 py-2 rounded text-slate-200">
              <option value="">Any duration</option>
              <option value="1 Month">1 Month</option>
              <option value="3 Months">3 Months</option>
              <option value="6 Months">6 Months</option>
              <option value="12 Months">12 Months</option>
            </select>

            <select value={sort} onChange={(e) => setSort(e.target.value)} className="bg-slate-800 border border-slate-700 px-3 py-2 rounded text-slate-200">
              <option value="popular">Most Popular</option>
              <option value="newest">Newest</option>
            </select>

            <button onClick={resetFilters} className="ml-auto px-4 py-2 bg-slate-700 rounded hover:bg-slate-600 transition">
              Reset
            </button>
          </div>
        </div>

        {/* Grid */}
        <div>
          {loading ? (
            <div className="text-center py-20 text-slate-400">Loading...</div>
          ) : roadmaps.length === 0 ? (
            <div className="text-center py-20 text-slate-400">No roadmaps found.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {roadmaps.map((r) => (
                <RoadmapCard key={r._id} roadmap={r.roadmapJSON || r} meta={r} />
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center items-center gap-3">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1 bg-slate-800 rounded">Prev</button>
          <span className="text-slate-300">Page {page} / {totalPages}</span>
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1 bg-slate-800 rounded">Next</button>
        </div>
      </div>
    </div>
  );
}
