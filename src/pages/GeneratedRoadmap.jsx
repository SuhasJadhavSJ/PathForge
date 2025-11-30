import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FiArrowLeft, FiSave, FiExternalLink } from "react-icons/fi";

export default function GeneratedRoadmap() {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ FIX #1 — correctly extract both objects
  const { roadmap, formInput } = location.state || {};

  const [saving, setSaving] = useState(false);

  // If user refreshes or no roadmap passed
  if (!roadmap) {
    return (
      <div className="min-h-screen flex justify-center items-center text-center p-6 text-white bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-md">
          <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-purple-500 to-cyan-400 text-transparent bg-clip-text">
            No Roadmap Found
          </h2>
          <p className="text-slate-400">You need to generate a roadmap first.</p>

          <button
            onClick={() => navigate("/create")}
            className="mt-6 px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium hover:opacity-90 transition flex items-center gap-2 mx-auto"
          >
            <FiArrowLeft /> Go Back
          </button>
        </div>
      </div>
    );
  }

  // SAVE Roadmap
  const handleSave = async () => {
    try {
      setSaving(true);

      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to save your roadmap.");
        navigate("/login");
        return;
      }

      // ✅ FIX #2 — send correct data to backend
      await axios.post(
        "http://localhost:4000/api/roadmap/save",
        { roadmap, formInput },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Roadmap saved successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save roadmap.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-14 px-6 text-white">
      <div className="max-w-4xl mx-auto">

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold text-center mb-4 
                     bg-gradient-to-r from-purple-500 to-cyan-400 text-transparent bg-clip-text"
        >
          {roadmap.title}
        </motion.h1>

        {/* DURATION */}
        <p className="text-center text-slate-300 mb-12 text-lg">
          Estimated Duration:{" "}
          <span className="font-semibold text-white">{roadmap.duration}</span>
        </p>

        {/* TIMELINE MODULES */}
        <div className="relative border-l border-purple-500/40 pl-6 space-y-12">
          {roadmap.modules?.map((module, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
              className="relative p-6 rounded-2xl bg-white/10 backdrop-blur-xl 
                         border border-white/10 shadow-lg"
            >
              <div className="absolute -left-3 top-6 w-6 h-6 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full shadow-lg"></div>

              <h2 className="text-2xl font-bold text-purple-300 mb-1">
                {index + 1}. {module.name}
              </h2>

              <p className="text-slate-300 mb-4">
                Duration:{" "}
                <span className="font-medium text-white">{module.duration}</span>
              </p>

              <div className="mb-4">
                <h3 className="font-semibold text-cyan-300 mb-2">
                  Topics Covered:
                </h3>
                <ul className="list-disc ml-6 text-slate-200 space-y-1">
                  {module.topics?.map((topic, i) => (
                    <li key={i}>{topic}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-cyan-300 mb-2">
                  Recommended Resources:
                </h3>
                <div className="space-y-3">
                  {module.resources?.map((res, i) => (
                    <div
                      key={i}
                      className="border border-white/10 bg-white/5 p-4 rounded-xl"
                    >
                      <p className="font-semibold text-white">{res.title}</p>
                      <p className="text-sm text-slate-400 mb-1">{res.type}</p>
                      <a
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 flex items-center gap-1 hover:text-cyan-400 transition text-sm"
                      >
                        <FiExternalLink /> Visit Resource
                      </a>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* SAVE BUTTON */}
        <div className="text-center mt-14">
          <button
            onClick={handleSave}
            disabled={saving}
            className={`px-10 py-4 rounded-xl text-lg font-semibold transition flex justify-center items-center gap-3 mx-auto
              ${
                saving
                  ? "bg-gray-500/40 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-90"
              }
            `}
          >
            {saving ? (
              <>
                <FiSave className="animate-pulse" /> Saving...
              </>
            ) : (
              <>
                <FiSave /> Save Roadmap
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
