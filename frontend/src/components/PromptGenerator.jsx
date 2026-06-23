import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { 
  Sparkles, Copy, Bookmark, Share2, RefreshCw, 
  ChevronRight, BrainCircuit, History, Check, ShieldAlert 
} from "lucide-react";
import { CATEGORIES, getCategoryById } from "../data/prompts";
import { copyPrompt } from "../utils/copyPrompt";
import { savePrompt } from "../utils/savePrompt";
import { useToast } from "./Toast";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const MODELS = [
  { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash (Default)" },
  { id: "gemini-1.5-pro", name: "Gemini 1.5 Pro (Analytical)" },
  { id: "claude-3.5-sonnet", name: "Claude 3.5 Sonnet (Creative)" },
  { id: "gpt-4o", name: "GPT-4o (Structured)" },
  { id: "midjourney-v6", name: "Midjourney v6 (Artistic)" },
];

const TONE_PRESETS = [
  { id: "expert", label: "Expert" },
  { id: "creative", label: "Creative" },
  { id: "concise", label: "Concise" },
  { id: "educational", label: "Academic" },
];

function buildFallbackPrompt(topic, categoryId, tone, model) {
  const category = getCategoryById(categoryId);
  return [
    `# Role: Expert ${category.label} Prompt Engineer`,
    `# Target Model: ${model}`,
    `# Tone Profile: ${tone}`,
    "",
    "## Context & Instructions",
    `Act as a specialist in ${category.label.toLowerCase()}. You are designing a prompt designed to address this topic: "${topic}".`,
    "",
    "## Objectives",
    `- Goal: Synthesize a highly practical ${category.label.toLowerCase()} prompt.`,
    "- Structure: Clear role definition, contextual inputs, required formatting constraints.",
    `- Tone constraints: Keep it ${tone}.`,
    "",
    "## Final Executable Prompt",
    `"[Paste this draft directly into your AI tool to run a ${category.label.toLowerCase()} sprint on: ${topic}]"`,
  ].join("\n");
}

function PromptGenerator() {
  const { addToast } = useToast();
  const [topic, setTopic] = useState("");
  const [categoryId, setCategoryId] = useState("social");
  const [tone, setTone] = useState("Expert");
  const [targetModel, setTargetModel] = useState("gemini-2.5-flash");
  
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [source, setSource] = useState("Studio");
  const [showHistory, setShowHistory] = useState(false);
  
  const abortRef = useRef(null);
  const category = getCategoryById(categoryId);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError("Topic description is required to generate a prompt.");
      addToast("Topic description is required", "error");
      return;
    }

    setError("");
    setCopied(false);
    setSaved(false);

    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/prompts/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          topic: topic.trim(), 
          category: category.label,
          tone,
          model: targetModel
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const finalPromptText = data.result?.trim() || buildFallbackPrompt(topic, categoryId, tone, targetModel);

      setSource(data.result ? "AI Optimized" : "Local Draft");
      setResult(finalPromptText);
      addToast("Prompt generated successfully!", "success");

      // Add to session history
      const newHistoryItem = {
        id: crypto.randomUUID(),
        categoryId,
        tone,
        model: targetModel,
        source: data.result ? "AI Optimized" : "Local Draft",
        text: finalPromptText,
        topic: topic.trim(),
        timestamp: new Date().toLocaleTimeString(),
      };
      
      setHistory((prev) => [newHistoryItem, ...prev.slice(0, 9)]);
    } catch (err) {
      if (err.name === "AbortError") return;

      const fallback = buildFallbackPrompt(topic, categoryId, tone, targetModel);
      setSource("Local Draft");
      setResult(fallback);
      addToast("Using offline draft generator", "info");

      const newHistoryItem = {
        id: crypto.randomUUID(),
        categoryId,
        tone,
        model: targetModel,
        source: "Local Draft",
        text: fallback,
        topic: topic.trim(),
        timestamp: new Date().toLocaleTimeString(),
      };
      setHistory((prev) => [newHistoryItem, ...prev.slice(0, 9)]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    const ok = await copyPrompt(result);
    if (!ok) {
      addToast("Failed to copy text", "error");
      return;
    }
    setCopied(true);
    addToast("Prompt copied to clipboard!", "success");
    window.setTimeout(() => setCopied(false), 1500);
  };

  const handleSave = () => {
    const didSave = savePrompt({
      id: `generated-${Date.now()}`,
      title: topic.trim().substring(0, 40) || "Generated Prompt",
      category: categoryId,
      prompt: result,
      likes: Math.floor(Math.random() * 50) + 5,
    });

    if (didSave) {
      setSaved(true);
      addToast("Prompt saved to local library!", "success");
      window.setTimeout(() => setSaved(false), 1500);
    } else {
      addToast("Prompt already saved!", "info");
    }
  };

  const handleLoadHistory = (item) => {
    setResult(item.text);
    setTopic(item.topic);
    setCategoryId(item.categoryId);
    setTone(item.tone);
    setTargetModel(item.model);
    setSource(item.source);
    setShowHistory(false);
    addToast("Loaded from history", "success");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
      {/* Left Pane: Config Form */}
      <div className="lg:col-span-5 flex flex-col gap-6 glass-card rounded-2xl border border-white/5 p-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold font-display text-white">Config Studio</h2>
          </div>
          {history.length > 0 && (
            <button
              type="button"
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              <History className="w-3.5 h-3.5" />
              <span>History ({history.length})</span>
            </button>
          )}
        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-4">
          {/* Topic description */}
          <div className="flex flex-col gap-2">
            <label htmlFor="topic" className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Topic Description
            </label>
            <textarea
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Describe your intent (e.g. outline a marketing newsletter, refactor a React hook, prepare for a backend QA build...)"
              className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all resize-none min-h-[100px]"
              rows={3}
            />
          </div>

          {/* Model selection */}
          <div className="flex flex-col gap-2">
            <label htmlFor="model" className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Target AI Model
            </label>
            <select
              id="model"
              value={targetModel}
              onChange={(e) => setTargetModel(e.target.value)}
              className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-violet-500/50 cursor-pointer"
            >
              {MODELS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tone preset chips */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Tone Profile
            </label>
            <div className="grid grid-cols-4 gap-2">
              {TONE_PRESETS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTone(t.label)}
                  className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                    tone.toLowerCase() === t.label.toLowerCase()
                      ? "bg-violet-500/10 text-violet-300 border-violet-500/30 shadow-[0_0_8px_rgba(139,92,246,0.2)]"
                      : "bg-slate-950/40 text-slate-400 border-white/5 hover:text-slate-200"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              placeholder="Or enter custom tone (e.g. quirky, cynical, scientific)"
              className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500/50 transition-all mt-1"
            />
          </div>

          {/* Category tabs */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Category
            </label>
            <div className="grid grid-cols-3 gap-1.5 max-h-[140px] overflow-y-auto pr-1 no-scrollbar">
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategoryId(c.id)}
                  className={`py-2 px-2.5 rounded-xl text-[10px] font-semibold border text-center transition-all truncate ${
                    categoryId === c.id
                      ? "bg-white text-slate-950 border-white font-bold"
                      : "bg-slate-950/40 text-slate-400 border-white/5 hover:text-slate-200"
                  }`}
                  style={{
                    borderColor: categoryId === c.id ? c.accent : "transparent",
                    boxShadow: categoryId === c.id ? `0 0 8px ${c.accent}30` : "none"
                  }}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Generate triggers */}
        <div className="mt-4 pt-4 border-t border-white/5">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading}
            className="w-full relative py-4 rounded-xl font-bold text-white transition-all overflow-hidden flex items-center justify-center gap-2 shadow-lg group hover:shadow-violet-500/10 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {/* Shimmer background */}
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-cyan-500 to-fuchsia-500 group-hover:opacity-90 transition-opacity" />
            {loading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Engineering Prompt...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate Prompt
              </>
            )}
          </button>
        </div>
      </div>

      {/* Right Pane: Live Generated Output Panel */}
      <div className="lg:col-span-7 flex flex-col gap-4 relative">
        <AnimatePresence>
          {showHistory && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute inset-0 z-20 glass-card rounded-2xl border border-white/10 p-6 flex flex-col gap-4 bg-slate-950/95"
            >
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <h3 className="font-bold font-display text-white text-base">Session Draft History</h3>
                <button
                  type="button"
                  onClick={() => setShowHistory(false)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  Close
                </button>
              </div>
              <div className="flex flex-col gap-2 overflow-y-auto flex-grow max-h-[360px] pr-1">
                {history.map((hItem) => {
                  const hCat = getCategoryById(hItem.categoryId);
                  return (
                    <button
                      key={hItem.id}
                      type="button"
                      onClick={() => handleLoadHistory(hItem)}
                      className="w-full text-left p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all flex flex-col gap-1.5"
                    >
                      <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                        <span className="font-semibold uppercase" style={{ color: hCat.accent }}>{hCat.label}</span>
                        <span>{hItem.timestamp}</span>
                      </div>
                      <strong className="text-white text-xs truncate font-display">{hItem.topic}</strong>
                      <span className="text-[10px] text-slate-400 truncate block font-mono">{hItem.model} • {hItem.tone}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div 
          className={`glass-card rounded-2xl border p-6 flex flex-col justify-between min-h-[460px] transition-all relative ${
            loading ? "border-cyan-500/50 shadow-neon-cyan animate-pulse" : "border-white/5"
          }`}
          style={{
            boxShadow: loading ? "0 0 25px rgba(6, 182, 212, 0.15)" : `0 8px 32px 0 rgba(0, 0, 0, 0.3)`
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <span 
                className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{ 
                  backgroundColor: `${category.accent}12`,
                  color: category.accent
                }}
              >
                {source}
              </span>
              <span className="text-slate-400 text-xs font-mono">•</span>
              <span className="text-slate-400 text-xs font-mono font-semibold uppercase">{category.label}</span>
            </div>
            {result && (
              <span className="text-[10px] text-slate-500 font-mono font-medium">
                Model: {targetModel}
              </span>
            )}
          </div>

          {/* Content output */}
          <div className="flex-grow overflow-y-auto max-h-[300px] mb-6 pr-1">
            {result ? (
              <pre className="text-slate-300 text-xs sm:text-sm font-mono whitespace-pre-wrap leading-relaxed select-all">
                {result}
              </pre>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 py-16">
                {loading ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative w-12 h-12 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-t-2 border-cyan-400 animate-spin" />
                      <BrainCircuit className="w-5 h-5 text-cyan-400" />
                    </div>
                    <p className="text-xs text-slate-400 animate-pulse">Running neural optimization prompts...</p>
                  </div>
                ) : (
                  <>
                    <BrainCircuit className="w-12 h-12 text-slate-700 mb-4" />
                    <p className="text-sm font-semibold mb-1">Workspace Generation Panel</p>
                    <p className="text-xs text-slate-600 max-w-xs leading-normal">
                      Fill out the settings configurations in the left studio panel and click "Generate".
                    </p>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Bottom actions */}
          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <button
              type="button"
              onClick={handleGenerate}
              disabled={loading || !topic}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs transition-all disabled:opacity-40"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              Regenerate
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                disabled={!result}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-slate-300 hover:text-white transition-all disabled:opacity-40"
                title="Copy prompt text"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={!result}
                className={`p-2.5 rounded-xl border transition-all disabled:opacity-40 ${
                  saved 
                    ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/25" 
                    : "bg-white/5 hover:bg-white/10 border-white/5 text-slate-300 hover:text-white"
                }`}
                title="Save to profile"
              >
                <Bookmark className={`w-4 h-4 ${saved ? "fill-current" : ""}`} />
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!result) return;
                  copyPrompt(`${window.location.origin}/generate`);
                  addToast("Workspace share link copied!", "success");
                }}
                disabled={!result}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-slate-300 hover:text-white transition-all disabled:opacity-40"
                title="Share workspace configuration"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PromptGenerator;
