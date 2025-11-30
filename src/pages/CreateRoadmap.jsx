import { useState } from "react";
import { motion } from "framer-motion";

import StepDomain from "../components/MultiStepForm/StepDomain";
import StepLevel from "../components/MultiStepForm/StepLevel";
import StepDuration from "../components/MultiStepForm/StepDuration";
import StepGoals from "../components/MultiStepForm/StepGoals";
import StepResources from "../components/MultiStepForm/StepResources";
import StepConstraints from "../components/MultiStepForm/StepConstraints";
import StepReview from "../components/MultiStepForm/StepReview";

export default function CreateRoadmap() {
  const [step, setStep] = useState(1);

  const next = () => setStep((prev) => prev + 1);
  const back = () => setStep((prev) => prev - 1);

  const steps = [
    "Domain",
    "Level",
    "Duration",
    "Goals",
    "Resources",
    "Constraints",
    "Review",
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen w-full bg-gradient-to-b 
        from-slate-950 via-slate-900 to-slate-950
        text-white py-14 px-4 flex justify-center"
    >
      <div className="w-full max-w-4xl">

        {/* TITLE */}
        <h1 className="text-4xl font-extrabold text-center mb-10 
          bg-gradient-to-r from-purple-500 to-cyan-400 
          text-transparent bg-clip-text"
        >
          Build Your Personalized Roadmap
        </h1>

        {/* STEP INDICATOR */}
        <div className="flex items-center justify-between mb-10 relative">
          {steps.map((label, index) => {
            const stepNum = index + 1;
            const active = stepNum <= step;

            return (
              <div key={index} className="flex flex-col items-center w-full">
                {/* Circle */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center
                   text-sm font-semibold transition-all
                   ${
                     active
                       ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg"
                       : "bg-slate-800 border border-slate-700 text-gray-400"
                   }`}
                >
                  {stepNum}
                </div>

                {/* Label */}
                <span className="mt-2 text-xs text-gray-400">{label}</span>

                {/* Line between circles */}
                {index < steps.length - 1 && (
                  <div
                    className={`absolute h-[2px] top-5 left-1/2 right-1/2 
                      -z-10 transition-all
                      ${active ? "bg-purple-500 w-full" : "bg-slate-700 w-full"}
                    `}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* STEP CONTAINER */}
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {step === 1 && <StepDomain next={next} />}
          {step === 2 && <StepLevel next={next} back={back} />}
          {step === 3 && <StepDuration next={next} back={back} />}
          {step === 4 && <StepGoals next={next} back={back} />}
          {step === 5 && <StepResources next={next} back={back} />}
          {step === 6 && <StepConstraints next={next} back={back} />}
          {step === 7 && <StepReview back={back} />}
        </motion.div>
      </div>
    </motion.div>
  );
}
