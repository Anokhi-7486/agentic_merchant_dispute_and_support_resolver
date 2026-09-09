import React from 'react';

export default function MartinovationLogo({ size = "md", showSubtitle = true }) {
  const dimensions = {
    sm: { icon: "w-8 h-8", title: "text-lg", sub: "text-[9px]" },
    md: { icon: "w-10 h-10", title: "text-xl", sub: "text-[10px]" },
    lg: { icon: "w-14 h-14", title: "text-3xl", sub: "text-xs" },
    xl: { icon: "w-20 h-20", title: "text-4xl", sub: "text-sm" }
  }[size] || dimensions.md;

  return (
    <div className="flex items-center gap-3 group cursor-pointer select-none">
      {/* Glowing Anime/Cyber Emblem */}
      <div className={`relative ${dimensions.icon} flex items-center justify-center`}>
        {/* Outer Rotating Neon Ring */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-cyan-500 via-purple-600 to-yellow-400 opacity-80 blur-[2px] group-hover:blur-[6px] transition-all duration-300 animate-pulse-slow"></div>
        
        {/* Inner SVG Logo Geometry */}
        <div className="relative w-full h-full bg-[#0b0f19] border border-cyan-400/50 rounded-xl p-1.5 flex items-center justify-center shadow-lg overflow-hidden">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full transform group-hover:scale-110 transition-transform duration-300">
            {/* Hexagonal Tech Frame */}
            <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" stroke="#00f3ff" strokeWidth="4" fill="rgba(0,243,255,0.08)" />
            {/* Inner M Core */}
            <path d="M 28,70 L 28,30 L 50,55 L 72,30 L 72,70" stroke="#ff007f" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 28,70 L 28,30 L 50,55 L 72,30 L 72,70" stroke="#00f3ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
            {/* Central Energy Crystal Dot */}
            <circle cx="50" cy="55" r="5" fill="#ffe600" />
            <circle cx="50" cy="20" r="3" fill="#00f3ff" className="animate-ping" />
          </svg>
        </div>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <div className={`font-orbitron font-black tracking-wider text-slate-100 group-hover:text-cyan-400 transition-colors ${dimensions.title} flex items-center gap-1`}>
          <span>MARTINOVATION</span>
          <span className="text-cyan-400 text-xs font-bold px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30">2026</span>
        </div>
        {showSubtitle && (
          <div className={`font-orbitron tracking-widest text-cyan-400/90 font-medium ${dimensions.sub}`}>
            USHA MARTIN UNIVERSITY TECHFEST
          </div>
        )}
      </div>
    </div>
  );
}
