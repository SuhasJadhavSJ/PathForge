import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div className="max-w-6xl mx-auto">

        {/* PAGE HEADER */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="
            text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
            font-extrabold text-center 
            bg-gradient-to-r from-purple-500 to-cyan-400 text-transparent bg-clip-text
            leading-tight
          "
        >
          About PathForge
        </motion.h1>

        <p className="text-center text-slate-400 mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed">
          PathForge helps learners build personalized, AI-crafted roadmaps 
          tailored to their career goals, experience level, and learning style.
        </p>

        {/* SECTION: OUR MISSION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="
            mt-8 sm:mt-12 lg:mt-16 
            bg-white/10 backdrop-blur-xl 
            rounded-xl sm:rounded-2xl 
            p-5 sm:p-8 md:p-10 lg:p-14 
            border border-white/10 shadow-lg
          "
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-purple-300">
            Our Mission
          </h2>

          <p className="text-slate-300 mt-3 sm:mt-4 leading-relaxed text-sm sm:text-base md:text-lg">
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
          className="mt-10 sm:mt-14 lg:mt-20"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-purple-300 px-4">
            What Makes PathForge Special?
          </h2>

          <div className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            lg:grid-cols-3 
            gap-4 sm:gap-6 lg:gap-8 
            mt-6 sm:mt-8 lg:mt-12
          ">
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
                className="
                  p-4 sm:p-5 md:p-6 lg:p-8 
                  bg-white/5 
                  rounded-lg sm:rounded-xl 
                  border border-white/10 
                  shadow 
                  hover:bg-white/10 
                  transition-colors duration-200
                "
              >
                <div className="flex items-start gap-3">
                  <FiCheckCircle className="text-purple-400 text-lg sm:text-xl flex-shrink-0 mt-0.5" />
                  <p className="text-slate-200 text-sm sm:text-base md:text-lg leading-snug">
                    {item}
                  </p>
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
          className="
            mt-10 sm:mt-14 lg:mt-20 
            bg-white/10 backdrop-blur-xl 
            rounded-xl sm:rounded-2xl 
            p-5 sm:p-8 md:p-10 lg:p-14 
            border border-white/10 shadow
          "
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-purple-300">
            Who Built PathForge?
          </h2>

          <p className="text-slate-300 mt-3 sm:mt-4 text-sm sm:text-base md:text-lg leading-relaxed">
            PathForge is built by passionate developers who believe:
          </p>

          <ul className="list-disc ml-5 sm:ml-6 text-slate-300 mt-3 sm:mt-4 space-y-2 text-sm sm:text-base md:text-lg">
            <li>Learning should be structured, not chaotic.</li>
            <li>AI can boost your learning speed and clarity.</li>
            <li>Your goals are unique — your roadmap should be too.</li>
          </ul>
        </motion.div>

        {/* CTA SECTION */}
        <div className="text-center mt-10 sm:mt-14 lg:mt-20 pb-4">
          <Link
            to="/create"
            className="
              inline-block
              px-6 sm:px-8 lg:px-10 
              py-3 sm:py-3.5 lg:py-4 
              text-base sm:text-lg md:text-xl 
              rounded-lg sm:rounded-xl 
              bg-gradient-to-r from-purple-600 to-cyan-500 
              hover:opacity-90 
              transition-opacity duration-200
              font-semibold
              shadow-lg hover:shadow-xl
            "
          >
            Create Your Roadmap
          </Link>
        </div>

      </div>
    </div>
  );
}