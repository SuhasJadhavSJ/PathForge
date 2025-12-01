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
      text-white py-10 px-4 flex justify-center overflow-x-hidden"
    >
      <div className="w-full max-w-4xl">

        {/* TITLE */}
        <h1
          className="text-3xl md:text-4xl font-extrabold text-center mb-10
            bg-gradient-to-r from-purple-500 to-cyan-400 
            text-transparent bg-clip-text px-4"
        >
          Build Your Personalized Roadmap
        </h1>

        {/* STEP INDICATOR */}
        <div className="relative mb-10 px-2 w-full overflow-hidden">

          {/* Steps Wrapper */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">

            {steps.map((label, index) => {
              const stepNum = index + 1;
              const active = stepNum <= step;

              return (
                <div
                  key={index}
                  className="flex flex-col items-center w-12"
                >
                  {/* Circle */}
                  <div
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center 
                    text-xs md:text-sm font-semibold transition-all
                    ${
                      active
                        ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg"
                        : "bg-slate-800 border border-slate-700 text-gray-400"
                    }`}
                  >
                    {stepNum}
                  </div>

                  {/* Label */}
                  <span className="mt-2 text-[10px] md:text-xs text-gray-400 text-center w-full">
                    {label}
                  </span>
                </div>
              );
            })}

          </div>

          {/* Background line */}
          <div className="absolute top-4 left-4 right-4 h-[2px] bg-slate-800 -z-10" />

          {/* Active progress line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: `${((step - 1) / (steps.length - 1)) * 100}%`,
            }}
            transition={{ duration: 0.4 }}
            className="absolute top-4 left-4 h-[2px] bg-purple-500 -z-10"
          />
        </div>

        {/* STEP CONTENT */}
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-xl bg-slate-900/40 border border-slate-800 
                     p-5 md:p-8 shadow-xl"
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
