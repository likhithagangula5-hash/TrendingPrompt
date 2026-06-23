import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Terminal, Flame, Award, Heart, Code2, AtSign, Layers } from "lucide-react";
import Navbar from "../components/Navbar";
import PromptCard from "../components/PromptCard";
import TrendingTicker from "../components/TrendingTicker";
import { CATEGORIES, FEATURED_PROMPTS } from "../data/prompts";

// Simple count up container
function StatCard({ value, label, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="glass-card rounded-2xl border border-white/5 p-6 text-center hover:border-violet-500/20 transition-all duration-300"
    >
      <div className="text-3xl sm:text-4xl font-extrabold text-white mb-2 font-display bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-400">
        {value}
      </div>
      <div className="text-xs sm:text-sm text-slate-400 font-medium">{label}</div>
    </motion.div>
  );
}

function Home() {
  const navigate = useNavigate();
  const topPrompts = FEATURED_PROMPTS.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <TrendingTicker />

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/10 text-xs font-semibold text-violet-300 mb-6 uppercase tracking-wider animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            Discover the Prompt Era
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 font-display leading-[1.1]">
            Discover & Generate AI Prompts <br className="hidden sm:inline" />
            That <span className="text-gradient-electric">Actually Work</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Stop guessing inputs. Unlock high-signal prompts for Midjourney, ChatGPT, Gemini, and coding flows. Supercharged by Gemini.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => navigate("/generate")}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-bold transition-all shadow-lg hover:shadow-cyan-500/10 duration-300 flex items-center justify-center gap-2 group transform hover:-translate-y-0.5"
            >
              Start Generating
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              type="button"
              onClick={() => navigate("/explore")}
              className="w-full sm:w-auto px-8 py-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold transition-all duration-300 flex items-center justify-center gap-2"
            >
              Explore Prompts
            </button>
          </div>
        </motion.div>
      </section>

      {/* Stats Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatCard value="250,000+" label="Prompts Discovered" index={0} />
          <StatCard value="98.4%" label="Success Generation Rate" index={1} />
          <StatCard value="48,000+" label="Active Creators" index={2} />
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mb-4">
            How It Works
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
            From spark to structured output in three simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Terminal className="w-6 h-6 text-violet-400" />,
              title: "1. Describe Intent",
              desc: "Provide a simple topic, goal, or context you want your prompt to address.",
            },
            {
              icon: <Layers className="w-6 h-6 text-cyan-400" />,
              title: "2. Personalize Tone",
              desc: "Select a specific domain category, tone profile, and target AI model.",
            },
            {
              icon: <Sparkles className="w-6 h-6 text-fuchsia-400" />,
              title: "3. Run & Copy",
              desc: "Gemini creates a prompt specifying role, context, output formats, and constraints.",
            },
          ].map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="glass-card rounded-2xl border border-white/5 p-8 relative flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 shadow-inner">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-display">{step.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Prompts Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
          <div>
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest block mb-2">
              High Velocity
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">
              Featured Prompts
            </h2>
          </div>
          <button
            type="button"
            onClick={() => navigate("/explore")}
            className="flex items-center gap-1.5 text-sm font-semibold text-violet-400 hover:text-violet-300 transition-colors"
          >
            Browse all prompts
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topPrompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      </section>

      {/* Category List Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mb-4">
            Browse by Intent
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
            Select a target domain to browse specialized curated prompt blueprints.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => navigate(`/explore?category=${category.id}`)}
              className="glass-card rounded-2xl border border-white/5 p-6 flex flex-col items-center justify-center text-center hover:scale-102 transition-all duration-300 group"
              style={{
                boxShadow: `0 4px 20px rgba(0, 0, 0, 0.2), 0 0 15px ${category.accent}08`
              }}
            >
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                style={{ 
                  backgroundColor: `${category.accent}12`,
                  color: category.accent
                }}
              >
                <Layers className="w-5 h-5" />
              </div>
              <strong className="text-white text-base font-bold font-display mb-1 block">
                {category.label}
              </strong>
              <span className="text-[10px] sm:text-xs text-slate-400 leading-snug font-medium block">
                {category.description}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-slate-950/80 border-t border-white/5 py-12 mt-auto z-10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-extrabold text-sm bg-gradient-to-br from-violet-600 via-cyan-500 to-fuchsia-500 shadow-neon-violet">
              TP
            </span>
            <span className="font-display font-extrabold text-base text-slate-200">
              Trending<span className="text-gradient-electric">Prompt</span>
            </span>
          </div>

          <p className="text-xs text-slate-500 md:order-last">
            &copy; {new Date().getFullYear()} TrendingPrompt Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Code2 className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="Twitter / X"
            >
              <AtSign className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
