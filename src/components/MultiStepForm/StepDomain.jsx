import { useFormStore } from "../../context/FormStore";
import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";

export default function StepDomain({ next }) {
  const { form, setField } = useFormStore();

  const domains = [
    "MERN",
    "AI / Machine Learning",
    "Cybersecurity",
    "Data Science",
    "Web Development",
    "Python Programming",
  ];

  const handleManualInput = (e) => {
    setField("subject", e.target.value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="p-8 rounded-2xl bg-white/10 dark:bg-slate-900/40 backdrop-blur-xl shadow-xl border border-white/10"
    >
      {/* Title */}
      <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">
        Choose Your Domain
      </h2>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        Select the field you want to learn — or enter your own.
      </p>

      {/* Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
        {domains.map((domain) => {
          const selected = form.subject === domain;

          return (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              key={domain}
              onClick={() => setField("subject", domain)}
              className={`p-4 rounded-xl flex justify-between items-center border transition-all text-left
                ${
                  selected
                    ? "border-purple-500 bg-purple-600/20 text-purple-600 dark:text-purple-300"
                    : "border-slate-700/40 bg-white/5 dark:bg-slate-800/40 hover:bg-white/10"
                }
              `}
            >
              {domain}
              {selected && <FiCheckCircle className="text-purple-500 text-xl" />}
            </motion.button>
          );
        })}
      </div>

      {/* Manual Input */}
      <div className="mt-8">
        <label className="text-slate-700 dark:text-slate-300 font-medium">
          Enter Manually (Optional)
        </label>
        <input
          type="text"
          placeholder="Ex: Blockchain Development"
          value={form.subject || ""}
          onChange={handleManualInput}
          className="mt-2 w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-slate-800 border border-slate-300/30 dark:border-slate-700 outline-none focus:ring-2 focus:ring-purple-500 text-slate-900 dark:text-white"
        />
      </div>

      {/* Next Button */}
      <div className="flex justify-end mt-10">
        <button
          onClick={next}
          disabled={!form.subject}
          className={`px-8 py-3 text-lg rounded-xl transition font-semibold
            ${
              form.subject
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
