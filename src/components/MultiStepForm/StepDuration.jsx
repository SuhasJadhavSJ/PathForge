import { useFormStore } from "../../context/FormStore";
import { motion } from "framer-motion";

export default function StepDuration({ next, back }) {
  const { form, setField } = useFormStore();

  const durations = ["1 Month", "3 Months", "6 Months", "12 Months"];

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
        Preferred Duration
      </h2>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        How long should your learning journey be?
      </p>

      {/* OPTIONS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
        {durations.map((duration) => {
          const selected = form.duration === duration;

          return (
            <motion.button
              key={duration}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setField("duration", duration)}
              className={`p-5 rounded-xl border text-center transition-all font-medium
                ${
                  selected
                    ? "border-purple-500 bg-purple-600/20 text-purple-400"
                    : "border-slate-700/40 bg-white/5 dark:bg-slate-800/40 hover:bg-white/10"
                }
              `}
            >
              {duration}
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
          disabled={!form.duration}
          className={`px-8 py-3 rounded-xl font-medium transition
            ${
              form.duration
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
