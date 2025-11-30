import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiClock, FiUser } from "react-icons/fi";

export default function RoadmapCard({ roadmap, meta }) {
  const navigate = useNavigate();

  const title = roadmap.title || "Untitled Roadmap";
  const duration = roadmap.duration || "N/A";
  const desc =
    roadmap.description ||
    roadmap.modules?.slice(0, 3).map((m) => m.name).join(" • ") ||
    "Roadmap summary";
    console.log("CARD META:", meta);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="p-5 rounded-2xl bg-white/5 border border-white/10 shadow-lg"
    >
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <div className="text-sm text-slate-300">
          {meta.popularity || 0} ⭐
        </div>
      </div>

      <p className="text-slate-300 mt-2 text-sm">{desc}</p>

      <div className="mt-4 flex items-center justify-between text-slate-400">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-sm">
            <FiClock /> <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <FiUser /> <span>{meta.userId || "Community"}</span>
          </div>
        </div>

        <button
  onClick={() => navigate(`/roadmap/${meta._id}`)}
  className="px-3 py-1 rounded bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-sm"
>
  View
</button>

      </div>
    </motion.div>
  );
}
