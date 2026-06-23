import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Settings, Heart, Bookmark, Layers, Edit3, Trash2, Copy,
  AtSign, Code2, Link, Check, X, PlusCircle, Globe
} from "lucide-react";
import Navbar from "../components/Navbar";
import PromptCard from "../components/PromptCard";
import { getCategoryById, PROMPTS } from "../data/prompts";
import { copyPrompt } from "../utils/copyPrompt";
import { getSavedPrompts } from "../utils/savePrompt";
import { useToast } from "../components/Toast";

const PROFILE_TABS = ["My Prompts", "Saved", "Liked"];

// Default mock user profile (stored & editable in localStorage)
function getStoredProfile() {
  try {
    return JSON.parse(localStorage.getItem("userProfile")) || {
      username: "Genz_PromptGod",
      bio: "AI prompt crafter. Turning random topics into signal-dense AI instructions since 2024.",
      twitter: "https://twitter.com",
      github: "https://github.com",
      website: "https://trendingprompt.app",
    };
  } catch {
    return {
      username: "Genz_PromptGod",
      bio: "AI prompt crafter.",
      twitter: "",
      github: "",
      website: "",
    };
  }
}

function normalizeSaved(item, idx) {
  if (typeof item === "string") {
    return { id: `legacy-${idx}`, title: "Saved Prompt", category: "social", prompt: item, likes: 0 };
  }
  return {
    id: item.id || `saved-${idx}`,
    title: item.title || "Saved Prompt",
    category: item.category || "social",
    prompt: item.prompt || "",
    likes: item.likes || 0,
  };
}

function getLikedPrompts() {
  try {
    const ids = JSON.parse(localStorage.getItem("likedPrompts")) || [];
    return PROMPTS.filter((p) => ids.includes(p.id));
  } catch {
    return [];
  }
}

function Profile() {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState("My Prompts");
  const [profile, setProfile] = useState(getStoredProfile);
  const [editingProfile, setEditingProfile] = useState(false);
  const [draft, setDraft] = useState({ ...profile });
  const [saved, setSaved] = useState(() => getSavedPrompts().map(normalizeSaved));
  const [liked] = useState(getLikedPrompts);

  // For editing a saved prompt inline
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // New custom prompt dialog
  const [showAddPrompt, setShowAddPrompt] = useState(false);
  const [newPrompt, setNewPrompt] = useState({ title: "", category: "social", prompt: "" });

  const handleSaveProfile = () => {
    setProfile({ ...draft });
    localStorage.setItem("userProfile", JSON.stringify(draft));
    setEditingProfile(false);
    addToast("Profile updated successfully!", "success");
  };

  const handleRemoveSaved = (id) => {
    const next = saved.filter((item) => item.id !== id);
    setSaved(next);
    localStorage.setItem("savedPrompts", JSON.stringify(next));
    addToast("Prompt removed.", "info");
  };

  const handleCopyPrompt = async (promptText) => {
    const ok = await copyPrompt(promptText);
    if (ok) addToast("Copied to clipboard!", "success");
    else addToast("Failed to copy text", "error");
  };

  const handleStartEdit = (item) => {
    setEditingId(item.id);
    setEditText(item.prompt);
  };

  const handleSaveEdit = (id) => {
    const next = saved.map((item) =>
      item.id === id ? { ...item, prompt: editText } : item
    );
    setSaved(next);
    localStorage.setItem("savedPrompts", JSON.stringify(next));
    setEditingId(null);
    addToast("Prompt updated!", "success");
  };

  const handleAddNewPrompt = () => {
    if (!newPrompt.title.trim() || !newPrompt.prompt.trim()) {
      addToast("Title and prompt text are required", "error");
      return;
    }
    const entry = {
      id: `custom-${Date.now()}`,
      title: newPrompt.title.trim(),
      category: newPrompt.category,
      prompt: newPrompt.prompt.trim(),
      likes: 0,
    };
    const next = [entry, ...saved];
    setSaved(next);
    localStorage.setItem("savedPrompts", JSON.stringify(next));
    setShowAddPrompt(false);
    setNewPrompt({ title: "", category: "social", prompt: "" });
    addToast("New prompt added to My Prompts!", "success");
  };

  const stats = [
    { label: "Prompts Created", value: saved.length },
    { label: "Prompts Liked", value: liked.length },
    { label: "Total Saves", value: saved.length + liked.length },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-grow z-10">
        {/* Profile Header */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-2xl border border-white/5 p-6 mb-8 flex flex-col sm:flex-row items-start gap-6"
        >
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="w-20 h-20 rounded-2xl overflow-hidden border border-white/10 bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
                alt="Profile Avatar"
                className="w-full h-full object-cover"
                onError={(e) => { e.target.style.display = "none"; }}
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-[#0A0A0F]" />
          </div>

          {/* Profile Info */}
          <div className="flex-grow">
            {editingProfile ? (
              <div className="flex flex-col gap-3 w-full max-w-lg">
                <input
                  type="text"
                  value={draft.username}
                  onChange={(e) => setDraft((d) => ({ ...d, username: e.target.value }))}
                  className="bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500/50"
                  placeholder="Username"
                />
                <textarea
                  value={draft.bio}
                  onChange={(e) => setDraft((d) => ({ ...d, bio: e.target.value }))}
                  className="bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500/50 resize-none"
                  rows={2}
                  placeholder="Bio"
                />
                <div className="grid grid-cols-3 gap-2">
                  {["twitter", "github", "website"].map((field) => (
                    <input
                      key={field}
                      type="text"
                      value={draft[field]}
                      onChange={(e) => setDraft((d) => ({ ...d, [field]: e.target.value }))}
                      className="bg-slate-950 border border-white/10 rounded-xl px-3 py-1.5 text-white text-xs focus:outline-none focus:border-violet-500/50"
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1) + " URL"}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleSaveProfile}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-xs font-bold"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Save Profile
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingProfile(false)}
                    className="px-4 py-2 rounded-xl bg-white/5 text-slate-400 hover:text-white text-xs font-bold border border-white/5"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 flex-wrap mb-1">
                  <h1 className="text-2xl font-extrabold text-white font-display">{profile.username}</h1>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20 font-semibold">
                    Creator
                  </span>
                </div>
                <p className="text-slate-400 text-sm mb-3 max-w-md leading-relaxed">{profile.bio}</p>
                <div className="flex items-center gap-3 flex-wrap">
                  {profile.twitter && (
                    <a href={profile.twitter} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
                      <AtSign className="w-4 h-4" />
                    </a>
                  )}
                  {profile.github && (
                    <a href={profile.github} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
                      <Code2 className="w-4 h-4" />
                    </a>
                  )}
                  {profile.website && (
                    <a href={profile.website} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
                      <Globe className="w-4 h-4" />
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => { setDraft({ ...profile }); setEditingProfile(true); }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-white text-xs font-semibold transition-all"
                  >
                    <Edit3 className="w-3 h-3" />
                    Edit Profile
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="flex gap-4 sm:flex-col sm:items-end shrink-0">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center sm:text-right">
                <div className="text-xl font-extrabold text-white font-display">{stat.value}</div>
                <div className="text-[10px] text-slate-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Tabs + Content */}
        <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
          <div className="flex items-center gap-2">
            {PROFILE_TABS.map((tab) => (
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

          {activeTab === "My Prompts" && (
            <button
              type="button"
              onClick={() => setShowAddPrompt(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/20 text-violet-300 text-xs font-semibold transition-all"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Add Prompt
            </button>
          )}
        </div>

        {/* Add New Prompt Dialog */}
        <AnimatePresence>
          {showAddPrompt && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass-card rounded-2xl border border-white/10 p-6 mb-6 flex flex-col gap-4"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-bold font-display text-white">Add Custom Prompt</h3>
                <button type="button" onClick={() => setShowAddPrompt(false)} className="text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <input
                type="text"
                value={newPrompt.title}
                onChange={(e) => setNewPrompt((p) => ({ ...p, title: e.target.value }))}
                placeholder="Prompt title"
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50"
              />
              <textarea
                value={newPrompt.prompt}
                onChange={(e) => setNewPrompt((p) => ({ ...p, prompt: e.target.value }))}
                placeholder="Write your custom prompt text here..."
                rows={4}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 resize-none"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddPrompt(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-slate-400 text-xs font-bold border border-white/5"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddNewPrompt}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-xs font-bold"
                >
                  Add Prompt
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {/* My Prompts Tab */}
            {activeTab === "My Prompts" && (
              <div className="flex flex-col gap-4">
                {saved.length === 0 ? (
                  <div className="glass-card rounded-2xl border border-white/5 p-12 text-center">
                    <Layers className="w-10 h-10 text-slate-700 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-white mb-2 font-display">No prompts yet</h3>
                    <p className="text-slate-400 text-sm">Save or create prompts to see them here.</p>
                  </div>
                ) : (
                  saved.map((item) => {
                    const category = getCategoryById(item.category);
                    return (
                      <div key={item.id} className="glass-card rounded-2xl border border-white/5 p-5 flex flex-col gap-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-grow min-w-0">
                            <div className="flex items-center gap-2 mb-1.5">
                              <span
                                className="text-[10px] font-bold uppercase"
                                style={{ color: category.accent }}
                              >
                                {category.label}
                              </span>
                            </div>
                            <h3 className="text-base font-bold text-white font-display truncate">{item.title}</h3>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => handleCopyPrompt(item.prompt)}
                              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleStartEdit(item)}
                              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleRemoveSaved(item.id)}
                              className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-all"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {editingId === item.id ? (
                          <div className="flex flex-col gap-2">
                            <textarea
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                              rows={4}
                              className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-violet-500/50 resize-none font-mono"
                            />
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => handleSaveEdit(item.id)}
                                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-xs font-bold"
                              >
                                Save Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingId(null)}
                                className="px-3 py-1.5 rounded-lg bg-white/5 text-slate-400 text-xs font-bold"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-slate-400 text-xs leading-relaxed line-clamp-3 font-mono">{item.prompt}</p>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* Saved Tab */}
            {activeTab === "Saved" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {saved.length === 0 ? (
                  <div className="col-span-full glass-card rounded-2xl border border-white/5 p-12 text-center">
                    <Bookmark className="w-10 h-10 text-slate-700 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-white mb-2 font-display">Nothing saved yet</h3>
                    <p className="text-slate-400 text-sm">Bookmark prompts from Explore or Trending.</p>
                  </div>
                ) : (
                  saved.map((item) => (
                    <PromptCard
                      key={item.id}
                      prompt={item}
                      onRemove={handleRemoveSaved}
                    />
                  ))
                )}
              </div>
            )}

            {/* Liked Tab */}
            {activeTab === "Liked" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {liked.length === 0 ? (
                  <div className="col-span-full glass-card rounded-2xl border border-white/5 p-12 text-center">
                    <Heart className="w-10 h-10 text-slate-700 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-white mb-2 font-display">No liked prompts</h3>
                    <p className="text-slate-400 text-sm">Heart prompts you love across the platform.</p>
                  </div>
                ) : (
                  liked.map((item) => <PromptCard key={item.id} prompt={item} />)
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default Profile;
