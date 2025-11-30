import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white px-6 py-16">
      <div className="max-w-6xl mx-auto">

        {/* PAGE HEADER */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-4xl md:text-5xl font-extrabold text-center 
                     bg-gradient-to-r from-purple-500 to-cyan-400 text-transparent bg-clip-text"
        >
          About PathForge
        </motion.h1>

        <p className="text-center text-slate-400 mt-4 max-w-2xl mx-auto">
          PathForge helps learners build personalized, AI-crafted roadmaps 
          tailored to their career goals, experience level, and learning style.
        </p>

        {/* SECTION: OUR MISSION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 bg-white/10 backdrop-blur-xl rounded-2xl p-10 border border-white/10 shadow-lg"
        >
          <h2 className="text-3xl font-bold text-purple-300">Our Mission</h2>
          <p className="text-slate-300 mt-4 leading-relaxed">
            The internet is filled with resources — but scattered, unstructured, 
            and overwhelming. PathForge organizes your learning into a clean, 
            personalized roadmap powered by AI.  
            It adapts to <span className="text-white font-semibold">
            your level, goals, constraints, and preferences.
            </span>
          </p>
        </motion.div>

        {/* SECTION: FEATURES */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h2 className="text-3xl font-bold text-center text-purple-300">
            What Makes PathForge Special?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {[
              "AI-generated learning roadmaps",
              "Smart multi-step personalization",
              "Hand-picked resources (YouTube, Docs, GitHub)",
              "Dark-mode optimized premium UI",
              "Beginner → Advanced structured progression",
              "Save & revisit your roadmaps anytime",
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="p-6 bg-white/5 rounded-xl border border-white/10 shadow hover:bg-white/10 transition"
              >
                <div className="flex items-start gap-3">
                  <FiCheckCircle className="text-purple-400 text-xl mt-1" />
                  <p className="text-slate-200">{item}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* SECTION: WHO BUILT PATHFORGE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 bg-white/10 backdrop-blur-xl rounded-2xl p-10 border border-white/10 shadow"
        >
          <h2 className="text-3xl font-bold text-purple-300">Who Built PathForge?</h2>
          <p className="text-slate-300 mt-4">
            PathForge is built by passionate developers who believe:
          </p>
          <ul className="list-disc ml-6 text-slate-300 mt-4 space-y-2">
            <li>Learning should be structured, not chaotic.</li>
            <li>AI can boost your learning speed and clarity.</li>
            <li>Your goals are unique — your roadmap should be too.</li>
          </ul>
        </motion.div>

        {/* CTA SECTION */}
        <div className="text-center mt-20">
          <Link
            to="/create"
            className="px-10 py-4 text-lg rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-90 transition font-semibold"
          >
            Create Your Roadmap
          </Link>
        </div>

      </div>
    </div>
  );
}
