import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-cyan-50 dark:from-slate-900 dark:to-slate-800 pt-10">
      
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between">
        
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight">
            Forge Your <span className="bg-gradient-to-r from-purple-600 to-cyan-500 text-transparent bg-clip-text">AI-Powered</span> Learning Path
          </h1>

          <p className="mt-6 text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
            PathForge builds perfectly personalized learning roadmaps — powered by advanced AI — based on your goals, level, time, and learning preferences.
          </p>

          <Link
            to="/create"
            className="inline-block mt-8 px-8 py-4 text-lg font-medium text-white rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 shadow-lg hover:opacity-90 transition"
          >
            Create My Roadmap
          </Link>
        </motion.div>

        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="mt-12 md:mt-0"
        >
          <img
            src="https://cdn3d.iconscout.com/3d/premium/thumb/ai-brain-3d-illustration-download-in-png-blend-fbx-gltf-obj-formats--machine-learning-artificial-intelligence-innovation-pack-science-technology-illustrations-5329051.png?f=webp"
            className="w-80 md:w-[480px] drop-shadow-2xl"
          />
        </motion.div>

      </section>

      {/* FEATURES */}
      <section className="py-20 bg-white/60 dark:bg-slate-900/50 backdrop-blur-xl">
        <h2 className="text-4xl font-bold text-center text-slate-900 dark:text-white mb-14">
          Why Choose PathForge?
        </h2>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

          <motion.div
            whileHover={{ y: -5 }}
            className="p-6 rounded-2xl shadow-lg bg-white dark:bg-slate-800"
          >
            <h3 className="text-xl font-semibold text-purple-600 dark:text-cyan-400">AI-Generated Roadmaps</h3>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              Every roadmap is crafted by AI to match your goals, pace, and preferred learning style.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="p-6 rounded-2xl shadow-lg bg-white dark:bg-slate-800"
          >
            <h3 className="text-xl font-semibold text-purple-600 dark:text-cyan-400">Smart Multi-Step Form</h3>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              Provide precise inputs through a smooth, guided experience to get the perfect roadmap.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="p-6 rounded-2xl shadow-lg bg-white dark:bg-slate-800"
          >
            <h3 className="text-xl font-semibold text-purple-600 dark:text-cyan-400">Save & Track Progress</h3>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              Access your dashboard anytime to revisit saved roadmaps and continue your journey.
            </p>
          </motion.div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center text-slate-600 dark:text-slate-300 text-sm">
        © {new Date().getFullYear()} PathForge — Powered by AI
      </footer>
    </div>
  );
}
