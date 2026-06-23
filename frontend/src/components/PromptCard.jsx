import React, { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Heart, Bookmark, Share2 } from "lucide-react";
import { copyPrompt } from "../utils/copyPrompt";
import { savePrompt, getSavedPrompts } from "../utils/savePrompt";
import { getCategoryById } from "../data/prompts";
import { useToast } from "./Toast";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

function PromptCard({ prompt, compact = false, onRemove = null }) {
  const category = getCategoryById(prompt.category);
  const { addToast } = useToast();
  
  // Track states
  const [copied, setCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(() => {
    const saved = getSavedPrompts();
    return saved.some(item => (item.id === prompt.id || item.prompt === prompt.prompt));
  });
  const [liked, setLiked] = useState(() => {
    try {
      const likedList = JSON.parse(localStorage.getItem("likedPrompts")) || [];
      return likedList.includes(prompt.id);
    } catch {
      return false;
    }
  });
  const [likesCount, setLikesCount] = useState(prompt.likes || Math.floor(Math.random() * 200) + 12);

  const handleCopy = async (e) => {
    e.stopPropagation();
    const ok = await copyPrompt(prompt.prompt);
    if (!ok) {
      addToast("Failed to copy text", "error");
      return;
    }
    setCopied(true);
    addToast("Prompt copied to clipboard!", "success");
    window.setTimeout(() => setCopied(false), 1500);
  };

  const handleSave = (e) => {
    e.stopPropagation();
    const savedList = getSavedPrompts();
    const exists = savedList.some(item => item.prompt === prompt.prompt);

    if (exists) {
      // Remove
      const updated = savedList.filter(item => item.prompt !== prompt.prompt);
      localStorage.setItem("savedPrompts", JSON.stringify(updated));
      setIsSaved(false);
      addToast("Prompt removed from saved!", "info");
      if (onRemove) onRemove(prompt.id);
    } else {
      // Save
      const didSave = savePrompt({
        id: prompt.id || `saved-${Date.now()}`,
        title: prompt.title,
        category: prompt.category,
        prompt: prompt.prompt,
      });
      if (didSave) {
        setIsSaved(true);
        addToast("Prompt saved to profile!", "success");
      }
    }
  };

  const handleLike = async (e) => {
    e.stopPropagation();
    const newLikedState = !liked;
    setLiked(newLikedState);
    setLikesCount(prev => newLikedState ? prev + 1 : prev - 1);
    
    // Save liked state locally
    try {
      const likedList = JSON.parse(localStorage.getItem("likedPrompts")) || [];
      if (newLikedState) {
        likedList.push(prompt.id);
      } else {
        const index = likedList.indexOf(prompt.id);
        if (index > -1) likedList.splice(index, 1);
      }
      localStorage.setItem("likedPrompts", JSON.stringify(likedList));
    } catch (err) {
      console.error(err);
    }

    if (newLikedState) {
      addToast("Prompt liked!", "success");
      // Fire-and-forget to backend API
      try {
        await fetch(`${API_BASE}/api/prompts/${prompt.id}/like`, { method: "POST" });
      } catch (err) {
        console.log("Like backend failed, local update preserved.");
      }
    }
  };

  const handleShare = (e) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/explore?query=${encodeURIComponent(prompt.title)}`;
    copyPrompt(shareUrl);
    addToast("Share link copied to clipboard!", "success");
  };

  return (
    <motion.article
      className={`glass-card relative flex flex-col justify-between rounded-2xl p-6 border border-white/5 ${
        compact ? "min-h-[220px]" : "min-h-[300px]"
      }`}
      style={{
        boxShadow: `0 8px 32px 0 rgba(0, 0, 0, 0.3), 0 0 15px ${category.accent}12`
      }}
      whileHover={{ y: -6, borderColor: `${category.accent}40` }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <span 
            className="text-xs font-semibold px-2.5 py-1 rounded-full border"
            style={{ 
              color: category.accent, 
              backgroundColor: `${category.accent}12`,
              borderColor: `${category.accent}24`
            }}
          >
            {category.label}
          </span>
          <span className="text-xs text-slate-500 font-mono">
            {prompt.metric || "Active"}
          </span>
        </div>

        <h3 className="text-lg font-bold text-white mb-2 leading-snug line-clamp-1">{prompt.title}</h3>
        <p className="text-sm text-slate-400 line-clamp-4 leading-relaxed mb-6">{prompt.prompt}</p>
      </div>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
        <div className="flex items-center gap-1">
          <button 
            type="button" 
            onClick={handleLike} 
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              liked 
                ? "bg-rose-500/10 text-rose-500 border border-rose-500/20" 
                : "text-slate-400 hover:text-rose-500 hover:bg-rose-500/5 border border-transparent"
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${liked ? "fill-current" : ""}`} />
            <span>{likesCount}</span>
          </button>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleCopy}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
            title="Copy prompt"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleSave}
            className={`p-2 rounded-lg transition-all ${
              isSaved 
                ? "text-cyan-400 hover:text-cyan-350" 
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
            title="Save to profile"
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
          </button>
          <button
            type="button"
            onClick={handleShare}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
            title="Share prompt"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default PromptCard;
