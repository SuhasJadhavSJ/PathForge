import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FiArrowLeft, FiExternalLink } from "react-icons/fi";

export default function ViewRoadmap() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRoadmap();
  }, []);

const loadRoadmap = async () => {
  try {
    const res = await axios.get(`http://localhost:4000/api/roadmap/view/${id}`);
    console.log("VIEW RESPONSE:", res.data);

    console.log("VIEW RAW DATA:", res.data);

    // Correct — backend returns the entire roadmap doc
    setRoadmap(res.data.roadmap.roadmapJSON);
  } catch (err) {
    navigate("/not-found");
  } finally {
    setLoading(false);
  }
};


  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white">
        Loading roadmap...
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white">
        Roadmap not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-14 px-6 text-white">
      <div className="max-w-4xl mx-auto">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-slate-300 hover:text-white"
        >
          <FiArrowLeft /> Back
        </button>

        {/* TITLE */}
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-purple-500 to-cyan-400 text-transparent bg-clip-text mb-4">
          {roadmap.title}
        </h1>

        <p className="text-center text-slate-300 mb-10 text-lg">
          Estimated Duration:{" "}
          <span className="text-white font-semibold">{roadmap.duration}</span>
        </p>

        {/* MODULES */}
        <div className="relative border-l border-purple-500/40 pl-6 space-y-12">
          {roadmap.modules?.map((module, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
              className="relative p-6 rounded-2xl bg-white/10 backdrop-blur-xl 
                border border-white/10 shadow-md"
            >
              {/* Dot */}
              <div className="absolute -left-3 top-6 w-6 h-6 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full shadow" />

              <h2 className="text-2xl font-bold text-purple-300 mb-2">
                {index + 1}. {module.name}
              </h2>

              <p className="text-slate-300 mb-4">
                Duration:{" "}
                <span className="font-medium text-white">{module.duration}</span>
              </p>

              <div className="mb-4">
                <h3 className="text-cyan-300 font-semibold mb-2">Topics:</h3>
                <ul className="list-disc ml-6 space-y-1 text-slate-200">
                  {module.topics?.map((topic, i) => (
                    <li key={i}>{topic}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-cyan-300 font-semibold mb-2">
                  Recommended Resources:
                </h3>
                {module.resources?.map((r, i) => (
                  <div key={i} className="p-4 mb-3 bg-white/5 rounded-lg border border-white/10">
                    <p className="font-semibold">{r.title}</p>
                    <p className="text-sm text-slate-400">{r.type}</p>
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-purple-400 hover:text-cyan-400 text-sm mt-2"
                    >
                      <FiExternalLink /> Visit Resource
                    </a>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
