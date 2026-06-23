import React from "react";
import { FEATURED_PROMPTS, getCategoryById } from "../data/prompts";

function TickerRow({ prompts, direction = "left" }) {
  // Duplicate prompts to ensure smooth loop infinite scrolling
  const items = [...prompts, ...prompts, ...prompts, ...prompts];

  return (
    <div className="ticker-row overflow-hidden w-full py-1.5 relative flex">
      <div
        className={`flex gap-4 w-max ${
          direction === "right" ? "animate-marquee-reverse" : "animate-marquee"
        } hover:[animation-play-state:paused]`}
      >
        {items.map((prompt, index) => {
          const category = getCategoryById(prompt.category);

          return (
            <div
              key={`${prompt.id}-${index}`}
              className="flex items-center gap-2 px-4 py-2 border border-white/5 rounded-full bg-white/5 backdrop-blur-md transition-all hover:bg-white/10"
              style={{
                boxShadow: `0 4px 12px rgba(0,0,0,0.1), 0 0 10px ${category.accent}08`
              }}
            >
              <span 
                className="text-[10px] font-bold uppercase tracking-wider"
                style={{ color: category.accent }}
              >
                {category.label}
              </span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <strong className="text-xs font-medium text-slate-200">{prompt.title}</strong>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TrendingTicker({ prompts = FEATURED_PROMPTS }) {
  const half = Math.ceil(prompts.length / 2);
  const rowA = prompts.slice(0, half);
  const rowB = prompts.slice(half).length ? prompts.slice(half) : prompts;

  return (
    <section className="py-6 overflow-hidden bg-slate-950/40 border-y border-white/5 backdrop-blur-md" aria-label="Trending prompts">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
        Live Prompt Feed
      </div>
      <div className="flex flex-col gap-2">
        <TickerRow prompts={rowA} direction="left" />
        <TickerRow prompts={rowB} direction="right" />
      </div>
    </section>
  );
}

export default TrendingTicker;
