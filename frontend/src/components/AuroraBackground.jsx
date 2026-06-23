import React from "react";

function AuroraBackground({ children }) {
  return (
    <div className="relative min-h-screen w-full bg-[#0A0A0F] text-slate-100 overflow-hidden">
      {/* Aurora Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Violet Blob */}
        <div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-violet-600/10 blur-[120px] animate-blob-one" />
        {/* Cyan Blob */}
        <div className="absolute -bottom-[10%] -right-[10%] w-[55vw] h-[55vw] rounded-full bg-cyan-500/10 blur-[130px] animate-blob-two" />
        {/* Magenta Blob */}
        <div 
          className="absolute top-[30%] right-[20%] w-[45vw] h-[45vw] rounded-full blur-[140px] animate-blob-three" 
          style={{ backgroundColor: "rgba(217, 70, 239, 0.07)" }} 
        />
      </div>

      {/* Grid overlay for a premium tech texture */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

      {/* Content wrapper */}
      <div className="relative z-10 w-full min-h-screen flex flex-col">
        {children}
      </div>
    </div>
  );
}

export default AuroraBackground;
