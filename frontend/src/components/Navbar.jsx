import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User } from "lucide-react";

const LINKS = [
  { name: "Home", path: "/" },
  { name: "Explore", path: "/explore" },
  { name: "Generate", path: "/generate" },
  { name: "Trending", path: "/trending" },
  { name: "Profile", path: "/profile" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0A0A0F]/70 backdrop-blur-md"
      initial={{ y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group" aria-label="TrendingPrompt home">
          <span className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-extrabold text-lg bg-gradient-to-br from-violet-600 via-cyan-500 to-fuchsia-500 shadow-neon-violet group-hover:scale-105 transition-transform duration-300">
            TP
          </span>
          <span className="font-display font-extrabold text-xl tracking-tight text-white group-hover:text-cyan-400 transition-colors duration-300">
            Trending<span className="text-gradient-electric">Prompt</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 p-1.5 border border-white/5 rounded-2xl bg-white/5" aria-label="Primary navigation">
          {LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-violet-600/20 to-cyan-500/20 text-white border border-white/10"
                    : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* User profile avatar mock */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/profile" className="w-10 h-10 rounded-full border border-white/10 bg-slate-900 flex items-center justify-center hover:border-violet-500/50 hover:shadow-neon-violet transition-all duration-300 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop" 
              alt="Profile" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <User className="w-5 h-5 text-slate-400" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Slide-in Menu) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-[#0A0A0F]/80 backdrop-blur-sm md:hidden"
            />

            {/* Menu panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
              className="fixed inset-y-0 right-0 z-50 w-72 bg-[#0A0A0F]/95 border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl md:hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-extrabold text-sm bg-gradient-to-br from-violet-600 via-cyan-500 to-fuchsia-500 shadow-neon-violet">
                      TP
                    </span>
                    <span className="font-display font-extrabold text-lg text-white">
                      Trending<span className="text-gradient-electric">Prompt</span>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                    aria-label="Close navigation menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="flex flex-col gap-3">
                  {LINKS.map((link) => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                          isActive
                            ? "bg-gradient-to-r from-violet-600/20 to-cyan-500/20 text-white border border-white/10"
                            : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  ))}
                </nav>
              </div>

              {/* Mobile Drawer Footer User Mock */}
              <div className="border-t border-white/5 pt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-white/10 bg-slate-900 flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Genz_PromptGod</h4>
                  <Link 
                    to="/profile" 
                    onClick={() => setIsOpen(false)} 
                    className="text-xs text-cyan-400 hover:underline"
                  >
                    View profile
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;
