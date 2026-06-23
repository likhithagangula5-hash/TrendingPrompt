import React from "react";
import { motion } from "framer-motion";
import { BrainCircuit, Sparkles } from "lucide-react";
import Navbar from "../components/Navbar";
import PromptGenerator from "../components/PromptGenerator";

function Generate() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-grow z-10">
        {/* Page Hero */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-xs font-semibold text-cyan-300 mb-4 uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            Prompt Studio
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-3 font-display">
            AI Prompt{" "}
            <span className="text-gradient-electric">Generator</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl leading-relaxed">
            Configure your intent, tone, and target model on the left — then let Gemini architect a production-ready prompt for you.
          </p>
        </motion.section>

        {/* Two-pane Generator Component */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          <PromptGenerator />
        </motion.div>
      </main>
    </div>
  );
}

export default Generate;
