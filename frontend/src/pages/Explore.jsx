import React, { useMemo, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, Info, RefreshCw, Grid } from "lucide-react";
import Navbar from "../components/Navbar";
import PromptCard from "../components/PromptCard";
import { CATEGORIES, getPromptsByCategory } from "../data/prompts";

function SkeletonCard() {
  return (
    <div className="glass-card rounded-2xl p-6 border border-white/5 animate-pulse min-h-[300px] flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 w-20 bg-white/5 rounded-full" />
          <div className="h-4 w-12 bg-white/5 rounded-full" />
        </div>
        <div className="h-6 w-3/4 bg-white/10 rounded-lg mb-3" />
        <div className="space-y-2">
          <div className="h-4 bg-white/5 rounded w-full" />
          <div className="h-4 bg-white/5 rounded w-5/6" />
          <div className="h-4 bg-white/5 rounded w-4/5" />
        </div>
      </div>
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/5">
        <div className="h-6 w-16 bg-white/5 rounded" />
        <div className="flex gap-2">
          <div className="h-8 w-8 bg-white/5 rounded-lg" />
          <div className="h-8 w-8 bg-white/5 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

function Explore() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialCategory = searchParams.get("category") || "all";
  const urlQuery = searchParams.get("query") || "";

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [query, setQuery] = useState(urlQuery);
  const [sortBy, setSortBy] = useState("trending"); // trending / newest / liked
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  // Sync category state with URL if it changes (e.g. clicking categories from Navbar/Home)
  useEffect(() => {
    const cat = searchParams.get("category") || "all";
    setActiveCategory(cat);
  }, [location.search]);

  // Handle Search Input from URL
  useEffect(() => {
    const q = searchParams.get("query") || "";
    if (q) setQuery(q);
  }, [location.search]);

  const itemsPerPage = 8;

  // Filter & Sort logic
  const filteredPrompts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    let result = getPromptsByCategory(activeCategory);

    // Apply text search
    if (normalizedQuery) {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(normalizedQuery) ||
          p.prompt.toLowerCase().includes(normalizedQuery)
      );
    }

    // Apply Sorting
    return [...result].sort((a, b) => {
      if (sortBy === "liked") {
        return (b.likes || 150) - (a.likes || 150);
      } else if (sortBy === "newest") {
        // Compare ids as simple proxy for newest
        return b.id.localeCompare(a.id);
      } else {
        // Trending sorting (default)
        // Virals first, then Pro, then Hot, then others
        const score = (p) => {
          if (p.metric === "Viral") return 4;
          if (p.metric === "Pro") return 3;
          if (p.metric === "Hot") return 2;
          return 1;
        };
        return score(b) - score(a);
      }
    });
  }, [activeCategory, query, sortBy]);

  // Page slice
  const displayedPrompts = useMemo(() => {
    return filteredPrompts.slice(0, page * itemsPerPage);
  }, [filteredPrompts, page]);

  const hasMore = filteredPrompts.length > displayedPrompts.length;

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setPage((prev) => prev + 1);
      setLoadingMore(false);
    }, 700); // simulate 700ms loading network
  };

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    setPage(1);
  };

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    setPage(1);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-grow z-10">
        {/* Page Hero */}
        <section className="mb-10 text-left">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest block mb-2">
            Workspace Library
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-3 font-display">
            Explore Prompts
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl leading-relaxed">
            Search, sort, filter, and discover {filteredPrompts.length} high-fidelity prompt recipes.
          </p>
        </section>

        {/* Sticky Search bar + Chips controls */}
        <section className="sticky top-20 z-40 bg-[#0A0A0F]/80 backdrop-blur-md border border-white/5 rounded-2xl p-4 mb-8 shadow-2xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center justify-between">
            {/* Search Input Box */}
            <div className="relative flex-grow max-w-xl">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Search className="w-5 h-5" />
              </span>
              <input
                type="text"
                value={query}
                onChange={handleSearchChange}
                placeholder="Search by title, intent, or keywords..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all text-sm font-medium"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 self-end lg:self-auto shrink-0">
              <SlidersHorizontal className="w-4 h-4 text-slate-400" />
              <span className="text-xs text-slate-400 font-semibold font-mono">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/50 font-semibold cursor-pointer"
              >
                <option value="trending">Trending</option>
                <option value="newest">Newest</option>
                <option value="liked">Most Liked</option>
              </select>
            </div>
          </div>

          {/* Category Chips List */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar mt-4 pt-2 border-t border-white/5">
            <button
              type="button"
              onClick={() => handleCategoryChange("all")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                activeCategory === "all"
                  ? "bg-white text-slate-950 border-white shadow-neon-cyan"
                  : "bg-white/5 text-slate-400 border-white/5 hover:text-white hover:bg-white/10"
              }`}
            >
              All Prompts
            </button>
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => handleCategoryChange(category.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                  activeCategory === category.id
                    ? "bg-slate-100 text-slate-950 shadow-md font-bold"
                    : "bg-white/5 text-slate-400 border-white/5 hover:text-white hover:bg-white/10"
                }`}
                style={{
                  borderColor: activeCategory === category.id ? category.accent : "transparent",
                  boxShadow: activeCategory === category.id ? `0 0 10px ${category.accent}40` : "none"
                }}
              >
                {category.label}
              </button>
            ))}
          </div>
        </section>

        {/* Prompts list grid */}
        <AnimatePresence mode="popLayout">
          {displayedPrompts.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {displayedPrompts.map((prompt) => (
                <motion.div
                  key={prompt.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <PromptCard prompt={prompt} />
                </motion.div>
              ))}
              {loadingMore &&
                Array.from({ length: 4 }).map((_, idx) => (
                  <SkeletonCard key={`skeleton-${idx}`} />
                ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl border border-white/5 p-12 text-center max-w-md mx-auto my-12"
            >
              <div className="mx-auto w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 border border-white/10 text-slate-400">
                <Info className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 font-display">No Prompts Found</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                We couldn't find any prompts matching "{query}" in the active filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setActiveCategory("all");
                }}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/10 transition-colors"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Load More Button */}
        {hasMore && !loadingMore && (
          <div className="flex justify-center mt-12">
            <button
              type="button"
              onClick={handleLoadMore}
              className="px-6 py-3 rounded-xl bg-slate-900 border border-white/10 hover:bg-slate-800 text-white text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-lg flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Load More Prompts
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default Explore;
