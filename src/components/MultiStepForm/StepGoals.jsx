import { useFormStore } from "../../context/FormStore";
import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";

export default function StepGoals({ next, back }) {
  const { form, setField } = useFormStore();

  const goalsList = [
    "Learn Fundamentals",
    "Build Real Projects",
    "Crack Internship",
    "Get a Job",
    "Career Switch",
    "Become Expert"
  ];

  const toggleGoal = (goal) => {
    const exists = form.goals.includes(goal);

    if (exists) {
      setField("goals", form.goals.filter((g) => g !== goal));
    } else {
      setField("goals", [...form.goals, goal]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="p-8 rounded-2xl bg-white/10 dark:bg-slate-900/40 
                 backdrop-blur-xl shadow-xl border border-white/10"
    >
      {/* TITLE */}
      <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">
        Your Learning Goals
      </h2>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        Tell us what you want to achieve — you can choose multiple options.
      </p>

      {/* GOAL OPTIONS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
        {goalsList.map((goal) => {
          const selected = form.goals.includes(goal);

          return (
            <motion.button
              key={goal}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleGoal(goal)}
              className={`p-5 rounded-xl flex justify-between items-center border transition-all font-medium text-left
                ${
                  selected
                    ? "border-purple-500 bg-purple-600/20 text-purple-400"
                    : "border-slate-700/40 bg-white/5 dark:bg-slate-800/40 hover:bg-white/10"
                }
              `}
            >
              {goal}
              {selected && <FiCheckCircle className="text-purple-400 text-xl" />}
            </motion.button>
          );
        })}
      </div>

      {/* BUTTONS */}
      <div className="flex justify-between mt-10">
        <button
          onClick={back}
          className="px-6 py-3 rounded-xl bg-slate-700 text-white 
                     hover:bg-slate-600 transition font-medium"
        >
          ← Back
        </button>

        <button
          onClick={next}
          disabled={form.goals.length === 0}
          className={`px-8 py-3 rounded-xl font-medium transition
            ${
              form.goals.length > 0
                ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:opacity-90"
                : "bg-gray-500/40 cursor-not-allowed text-gray-300"
            }`}
        >
          Next →
        </button>
      </div>
    </motion.div>
  );
}
