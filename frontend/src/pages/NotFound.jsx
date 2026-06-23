import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";

function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full glass-card rounded-2xl border border-white/10 p-8 text-center"
        >
          <div className="mx-auto w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center mb-6 shadow-neon-violet border border-rose-500/20">
            <AlertTriangle className="w-8 h-8 text-rose-400" />
          </div>

          <h1 className="text-7xl font-extrabold text-white mb-2 font-display">404</h1>
          <h2 className="text-2xl font-bold text-slate-100 mb-4 font-display">Page Not Found</h2>
          <p className="text-slate-400 mb-8 leading-relaxed">
            The page you are looking for doesn't exist, has been moved, or is temporarily unavailable.
          </p>

          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-semibold transition-all shadow-lg hover:shadow-cyan-500/15 duration-300 transform hover:-translate-y-0.5"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>
      </main>
    </div>
  );
}

export default NotFound;
