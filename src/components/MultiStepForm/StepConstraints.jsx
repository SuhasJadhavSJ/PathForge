import { useFormStore } from "../../context/FormStore";
import { useState } from "react";
import { motion } from "framer-motion";
import { FiCheckCircle, FiX } from "react-icons/fi";

export default function StepConstraints({ next, back }) {
  const { form, setField } = useFormStore();
  const [custom, setCustom] = useState("");

  const constraintOptions = [
    "Only free resources",
    "Prefer Hindi explanations",
    "Limited to 1 hour per day",
    "Slow internet",
    "No long video courses",
    "Prefer text-based learning"
  ];

  const toggleConstraint = (item) => {
    const exists = form.constraints.includes(item);

    if (exists) {
      setField(
        "constraints",
        form.constraints.filter((c) => c !== item)
      );
    } else {
      setField("constraints", [...form.constraints, item]);
    }
  };

  const addCustomConstraint = () => {
    if (!custom.trim()) return;

    setField("constraints", [...form.constraints, custom]);
    setCustom("");
  };

  const removeConstraint = (item) => {
    setField(
      "constraints",
      form.constraints.filter((c) => c !== item)
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="p-8 rounded-2xl bg-white/10 dark:bg-slate-900/40 backdrop-blur-xl shadow-xl border border-white/10"
    >
      {/* TITLE */}
      <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">
        Constraints (Optional)
      </h2>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        Help us customize the roadmap according to your limitations.
      </p>

      {/* OPTIONS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
        {constraintOptions.map((item) => {
          const selected = form.constraints.includes(item);

          return (
            <motion.button
              key={item}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleConstraint(item)}
              className={`p-4 rounded-xl flex justify-between items-center border transition-all text-left
                ${
                  selected
                    ? "border-purple-500 bg-purple-600/20 text-purple-400"
                    : "border-slate-700/40 bg-white/5 dark:bg-slate-800/40 hover:bg-white/10"
                }
              `}
            >
              {item}
              {selected && <FiCheckCircle className="text-purple-400 text-xl" />}
            </motion.button>
          );
        })}
      </div>

      {/* CUSTOM INPUT */}
      <div className="mt-8">
        <label className="text-slate-700 dark:text-slate-300 font-medium">
          Add your own constraints
        </label>

        <div className="flex gap-3 mt-2">
          <input
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            placeholder="e.g., Prefer short videos"
            className="flex-1 px-4 py-3 rounded-xl bg-white/80 dark:bg-slate-800 border border-slate-300/30 dark:border-slate-700 outline-none focus:ring-2 focus:ring-purple-500 text-slate-900 dark:text-white"
          />

          <button
            onClick={addCustomConstraint}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium hover:opacity-90 transition"
          >
            Add
          </button>
        </div>
      </div>

      {/* DISPLAY SELECTED CONSTRAINTS */}
      {form.constraints.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-3">
          {form.constraints.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 bg-purple-600/20 border border-purple-500 text-purple-300 px-4 py-2 rounded-full"
            >
              {c}
              <button onClick={() => removeConstraint(c)}>
                <FiX className="text-purple-300 hover:text-red-400 transition" />
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* BUTTONS */}
      <div className="flex justify-between mt-10">
        <button
          onClick={back}
          className="px-6 py-3 rounded-xl bg-slate-700 text-white hover:bg-slate-600 transition font-medium"
        >
          ← Back
        </button>

        <button
          onClick={next}
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium hover:opacity-90 transition"
        >
          Next →
        </button>
      </div>
    </motion.div>
  );
}
