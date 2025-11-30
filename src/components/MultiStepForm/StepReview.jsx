import { useFormStore } from "../../context/FormStore";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FiArrowLeft, FiArrowRight, FiLoader } from "react-icons/fi";

export default function StepReview({ back }) {
  const { form, resetForm } = useFormStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:4000/api/roadmap/generate",
        form
      );

      navigate("/generated", {
  state: {
    roadmap: response.data.roadmap,
    formInput: form,
  }
});


      toast.success("Roadmap generated successfully!");
      resetForm();
    } catch (error) {
      console.error("Error generating roadmap:", error);
      toast.error("Failed to generate roadmap. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="p-8 rounded-2xl bg-white/10 dark:bg-slate-900/40 backdrop-blur-xl 
                 shadow-xl border border-white/10"
    >
      {/* Title */}
      <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">
        Review Your Choices
      </h2>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        Make sure everything looks good before generating your roadmap.
      </p>

      {/* REVIEW BOX */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Domain */}
        <ReviewItem title="Domain" value={form.subject} />

        {/* Level */}
        <ReviewItem title="Level" value={form.level} />

        {/* Duration */}
        <ReviewItem title="Duration" value={form.duration} />

        {/* Goals */}
        <ReviewItem title="Goals" value={form.goals.join(", ") || "None"} />

        {/* Resources */}
        <ReviewItem
          title="Preferred Resources"
          value={form.resources.join(", ") || "None"}
        />

        {/* Constraints */}
        <ReviewItem
          title="Constraints"
          value={form.constraints.join(", ") || "None"}
        />
      </div>

      {/* BUTTONS */}
      <div className="flex justify-between mt-10">
        <button
          onClick={back}
          className="px-6 py-3 rounded-xl bg-slate-700 text-white 
                     hover:bg-slate-600 transition font-medium flex items-center gap-2"
        >
          <FiArrowLeft /> Back
        </button>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className={`px-8 py-3 rounded-xl flex items-center gap-2 font-medium transition
            ${
              loading
                ? "bg-gray-500/40 cursor-not-allowed text-gray-300"
                : "bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:opacity-90"
            }`}
        >
          {loading ? (
            <>
              <FiLoader className="animate-spin" /> Generating...
            </>
          ) : (
            <>
              Generate Roadmap <FiArrowRight />
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}

/* Small reusable component for review fields */
function ReviewItem({ title, value }) {
  return (
    <motion.div
      initial={{ opacity: 0.8 }}
      whileHover={{ scale: 1.02 }}
      className="p-4 rounded-xl bg-white/5 dark:bg-slate-800/50 border 
                 border-slate-700/40 text-slate-800 dark:text-slate-200"
    >
      <h3 className="font-semibold text-purple-400">{title}</h3>
      <p className="mt-1">{value}</p>
    </motion.div>
  );
}
