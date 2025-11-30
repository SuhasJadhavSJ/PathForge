import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FiArrowRight, FiLoader } from "react-icons/fi";

export default function Dashboard() {
  const navigate = useNavigate();
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRoadmaps = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get(
        "http://localhost:4000/api/user/roadmaps",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setRoadmaps(response.data.roadmaps);
    } catch (error) {
      console.error("Error fetching roadmaps:", error);
      toast.error("Failed to load saved roadmaps.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoadmaps();
  }, []);

  /* LOADING STATE */
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-white">
        <FiLoader className="animate-spin text-4xl mb-3 text-purple-400" />
        <h2 className="text-xl font-semibold">Loading your roadmaps...</h2>
      </div>
    );
  }

  /* EMPTY STATE */
  if (roadmaps.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center p-6 text-white">

        <img
          src="https://illustrations.popsy.co/gray/a-person-using-a-laptop.svg"
          alt="Empty state"
          className="w-64 mb-6 opacity-80"
        />

        <h2 className="text-3xl font-bold mb-3">No Saved Roadmaps Yet</h2>
        <p className="text-slate-400 max-w-md">
          You haven't created any roadmaps. Start your learning journey now!
        </p>

        <button
          onClick={() => navigate("/create")}
          className="mt-6 px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 
                     text-white font-medium hover:opacity-90 transition flex items-center gap-2"
        >
          Create Your First Roadmap <FiArrowRight />
        </button>
      </div>
    );
  }

  /* DASHBOARD UI WITH CARDS */
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-14 px-6 text-white">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <h1 className="text-4xl font-extrabold text-center mb-12 
          bg-gradient-to-r from-purple-500 to-cyan-400 text-transparent bg-clip-text">
          Your Saved Roadmaps
        </h1>

        {/* ROADMAP GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {roadmaps.map((rm, index) => (
            <motion.div
              key={rm._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10
                         shadow-xl hover:scale-[1.02] transition-all cursor-pointer"
            >
              <h2 className="text-xl font-bold text-purple-300">
                {rm.roadmapJSON.title}
              </h2>

              <p className="mt-2 text-slate-300">
                Duration:{" "}
                <span className="font-medium text-white">
                  {rm.roadmapJSON.duration}
                </span>
              </p>

              <p className="text-xs text-slate-500 mt-2">
                Created: {new Date(rm.createdAt).toLocaleDateString()}
              </p>

              <button
                onClick={() =>
                  navigate("/generated", {
                    state: { roadmap: rm.roadmapJSON },
                  })
                }
                className="mt-6 w-full px-4 py-3 rounded-xl bg-gradient-to-r 
                           from-purple-600 to-cyan-500 text-white font-medium 
                           hover:opacity-90 transition flex items-center justify-center gap-2"
              >
                View Roadmap <FiArrowRight />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
