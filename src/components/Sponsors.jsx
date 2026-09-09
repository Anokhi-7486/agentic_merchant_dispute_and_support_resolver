import React from 'react';
import { FEST_DATA } from '../data/festData';
import { Shield, Sparkles } from 'lucide-react';

export default function Sponsors() {
  return (
    <section className="py-16 px-4 max-w-6xl mx-auto border-t border-b border-slate-800/80 my-12">
      <div className="text-center mb-10">
        <div className="font-orbitron text-xs font-bold text-cyan-400 tracking-widest uppercase mb-2">
          OFFICIAL PARTNERS & SPONSORS
        </div>
        <h3 className="font-orbitron font-black text-2xl md:text-3xl text-slate-100 uppercase">
          POWERED BY INDUSTRY GIANTS
        </h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {FEST_DATA.sponsors.map((sp, idx) => (
          <div
            key={idx}
            className="cyber-box p-5 rounded-2xl border border-cyan-500/20 hover:border-cyan-400/60 transition-all flex flex-col items-center justify-center text-center group hover:scale-105"
          >
            <div className="w-12 h-12 mb-3 bg-cyan-950/60 border border-cyan-400/40 rounded-xl flex items-center justify-center font-orbitron font-black text-cyan-400 text-sm group-hover:shadow-[0_0_15px_rgba(0,243,255,0.5)]">
              {sp.logo}
            </div>
            <div className="font-orbitron font-bold text-slate-100 text-sm">{sp.name}</div>
            <div className="text-[10px] font-orbitron text-purple-400 mt-0.5">{sp.category}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
