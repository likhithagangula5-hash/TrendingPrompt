import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, Flame, Award, BarChart2, Sparkles } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";
import Navbar from "../components/Navbar";
import PromptCard from "../components/PromptCard";
import { CATEGORIES, FEATURED_PROMPTS, PROMPTS, getCategoryById } from "../data/prompts";

const TIME_TABS = ["Today", "This Week", "All Time"];

// Assign deterministic scores based on time tab + prompt index
function getScores(prompts, tab) {
  return prompts.map((p, idx) => {
    const base = (prompts.length - idx) * 10;
    const velocity = tab === "Today" ? base + Math.floor(Math.random() * 50) : tab === "This Week" ? base + 20 : base;
    const trend = idx < 3 ? "up" : idx < 6 ? "neutral" : "down";
    return { ...p, score: velocity, trend, rank: idx + 1, likes: velocity + Math.floor(Math.random() * 80) + 30 };
  });
}

// Radar chart data for category trends
const categoryChartData = CATEGORIES.map((cat) => ({
  category: cat.label,
  score: PROMPTS.filter((p) => p.category === cat.id).length * 12 + Math.floor(Math.random() * 40),
  fill: cat.accent,
}));

function TrendBadge({ trend }) {
  if (trend === "up") return <TrendingUp className="w-4 h-4 text-emerald-400" />;
  if (trend === "down") return <TrendingDown className="w-4 h-4 text-rose-400" />;
  return <Minus className="w-4 h-4 text-slate-500" />;
}

function RankBadge({ rank }) {
  if (rank === 1) return (
    <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 text-slate-900 font-black text-sm shadow-lg">
      #1
    </span>
  );
  if (rank === 2) return (
    <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-slate-400/20 text-slate-300 border border-slate-400/30 font-bold text-sm">
      #2
    </span>
  );
  if (rank === 3) return (
    <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-amber-800/20 text-amber-600 border border-amber-700/30 font-bold text-sm">
      #3
    </span>
  );
  return (
    <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-white/5 text-slate-500 font-bold text-sm">
      #{rank}
    </span>
  );
}

function LeaderboardRow({ item, isTop }) {
  const category = getCategoryById(item.category);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
        isTop
          ? "bg-gradient-to-r from-yellow-500/10 via-amber-400/5 to-transparent border-yellow-500/20 shadow-lg"
          : "glass-card border-white/5 hover:border-white/10"
      }`}
    >
      <RankBadge rank={item.rank} />

      <div className="flex-grow min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span
            className="text-[10px] font-bold uppercase"
            style={{ color: category.accent }}
          >
            {category.label}
          </span>
          {isTop && <Flame className="w-3 h-3 text-orange-400" />}
        </div>
        <h3 className="text-sm font-bold text-white truncate font-display">{item.title}</h3>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <div className="text-right hidden sm:block">
          <div className="text-xs font-bold text-white">{item.score}</div>
          <div className="text-[10px] text-slate-500 font-mono">score</div>
        </div>
        <div className="text-right hidden sm:block">
          <div className="text-xs font-bold text-white">{item.likes}</div>
          <div className="text-[10px] text-slate-500 font-mono">likes</div>
        </div>
        <TrendBadge trend={item.trend} />
      </div>
    </motion.div>
  );
}

function Trending() {
  const [activeTab, setActiveTab] = useState("This Week");

  const trendingList = useMemo(() => {
    const combined = [
      ...FEATURED_PROMPTS,
      ...PROMPTS.filter((p) => !FEATURED_PROMPTS.some((f) => f.id === p.id)),
    ].slice(0, 12);
    return getScores(combined, activeTab);
  }, [activeTab]);

  const topPrompt = trendingList[0];

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
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-orange-500/20 bg-orange-500/10 text-xs font-semibold text-orange-300 mb-4 uppercase tracking-wider">
            <Flame className="w-3 h-3" />
            Live Rankings
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-3 font-display">
            Trending <span className="text-gradient-electric">Leaderboard</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl leading-relaxed">
            Real-time ranked prompts by velocity, engagement, and community momentum.
          </p>
        </motion.section>

        {/* Time Tabs */}
        <div className="flex items-center gap-2 mb-8 border-b border-white/5 pb-4">
          {TIME_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === tab
                  ? "bg-white text-slate-950"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main leaderboard list */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* #1 Spotlight Card */}
            {topPrompt && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-yellow-400">
                    Top Ranked This Period
                  </span>
                </div>
                <div className="relative">
                  <div className="absolute -inset-px bg-gradient-to-r from-yellow-500/20 via-amber-500/10 to-transparent rounded-2xl blur-sm" />
                  <div className="relative">
                    <PromptCard prompt={topPrompt} />
                  </div>
                </div>
              </div>
            )}

            {/* Leaderboard rows */}
            <div className="flex flex-col gap-3">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">
                Full Rankings
              </h2>
              <AnimatePresence mode="popLayout">
                {trendingList.slice(1).map((item) => (
                  <LeaderboardRow key={item.id} item={item} isTop={false} />
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Right sidebar: Category Radar Chart + Quick Stats */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Radar Chart: Category Trend Breakdown */}
            <div className="glass-card rounded-2xl border border-white/5 p-6">
              <div className="flex items-center gap-2 mb-6">
                <BarChart2 className="w-4 h-4 text-cyan-400" />
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                  Category Momentum
                </h2>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={categoryChartData} outerRadius="75%">
                  <PolarGrid stroke="rgba(255,255,255,0.05)" />
                  <PolarAngleAxis
                    dataKey="category"
                    tick={{ fill: "#94a3b8", fontSize: 10, fontFamily: "Inter" }}
                  />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="#8B5CF6"
                    fill="#8B5CF6"
                    fillOpacity={0.15}
                    strokeWidth={1.5}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(10,10,15,0.9)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "12px",
                      color: "#f1f5f9",
                      fontSize: "12px",
                    }}
                    formatter={(val) => [`${val} pts`, "Momentum Score"]}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Quick Stats  */}
            <div className="glass-card rounded-2xl border border-white/5 p-6 flex flex-col gap-4">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Velocity Metrics
              </h2>
              {CATEGORIES.slice(0, 5).map((cat) => {
                const count = PROMPTS.filter((p) => p.category === cat.id).length;
                const pct = Math.round((count / PROMPTS.length) * 100);
                return (
                  <div key={cat.id} className="flex flex-col gap-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold" style={{ color: cat.accent }}>{cat.label}</span>
                      <span className="text-slate-400 font-mono">{pct}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: cat.accent }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Trending;
