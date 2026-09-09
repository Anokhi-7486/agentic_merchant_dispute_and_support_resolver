import React, { useState } from 'react';
import { FEST_DATA } from '../data/festData';
import { useSound } from '../context/SoundContext';
import { MapPin, Navigation, Info, ShieldAlert } from 'lucide-react';

export default function CampusMap() {
  const [selectedArena, setSelectedArena] = useState(FEST_DATA.campusArenas[0]);
  const { playClick, playHover } = useSound();

  return (
    <section id="campus-map" className="py-20 px-4 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 text-xs font-orbitron font-bold tracking-widest uppercase mb-3">
          <Navigation className="w-3.5 h-3.5" /> INTERACTIVE ARENA GUIDE
        </div>
        <h2 className="font-orbitron font-black text-3xl md:text-5xl text-slate-100 uppercase mb-3">
          CAMPUS <span className="text-cyan-400 text-glow-cyan">VENUE MAP</span>
        </h2>
        <p className="font-orbitron text-xs text-slate-400 uppercase tracking-widest">
          EXPLORE USHA MARTIN UNIVERSITY TECHFEST ARENAS & LOCATIONS
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Interactive Map Visualizer */}
        <div className="lg:col-span-8 cyber-box rounded-2xl p-6 border border-cyan-500/30 relative min-h-[350px] flex flex-col justify-between overflow-hidden">
          <div className="absolute top-4 left-4 z-10 bg-slate-950/80 border border-cyan-500/40 px-3 py-1.5 rounded-lg font-orbitron text-xs text-cyan-300 font-bold uppercase flex items-center gap-2">
            <MapPin className="w-4 h-4 text-cyan-400" /> UMU CAMPUS RADAR
          </div>

          {/* Grid Layout Representation of Campus */}
          <div className="my-8 grid grid-cols-3 gap-4 relative z-10">
            {FEST_DATA.campusArenas.map((arena) => (
              <button
                key={arena.id}
                onClick={() => {
                  playClick();
                  setSelectedArena(arena);
                }}
                onMouseEnter={playHover}
                className={`p-4 rounded-xl font-orbitron text-left transition-all border ${
                  selectedArena.id === arena.id
                    ? 'bg-gradient-to-tr from-cyan-500 to-purple-600 border-cyan-300 text-black shadow-[0_0_20px_rgba(0,243,255,0.4)] scale-105 font-black'
                    : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:border-cyan-500/40'
                }`}
              >
                <div className="text-[10px] opacity-75 font-mono">{arena.code}</div>
                <div className="text-xs md:text-sm uppercase font-extrabold mt-1">{arena.name}</div>
              </button>
            ))}
          </div>

          <div className="border-t border-slate-800 pt-3 text-[11px] font-orbitron text-slate-500 flex items-center justify-between">
            <span>LOCATION: ANGARA, RANCHI, JHARKHAND</span>
            <span>COORDINATES: 23.3683° N, 85.4526° E</span>
          </div>
        </div>

        {/* Selected Arena Inspector */}
        <div className="lg:col-span-4 cyber-box rounded-2xl p-6 border border-purple-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 bg-cyan-950 border border-cyan-500/40 text-cyan-400 font-mono text-[10px] uppercase rounded">
                {selectedArena.code}
              </span>
            </div>
            <h3 className="font-orbitron font-black text-2xl text-slate-100 uppercase mb-4">
              {selectedArena.name}
            </h3>
            <p className="text-xs text-slate-300 mb-6 leading-relaxed">
              {selectedArena.desc}
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl">
            <div className="text-[10px] font-orbitron text-cyan-400 font-bold uppercase mb-1">
              ARENA ACCESS GUIDELINES
            </div>
            <p className="text-[11px] text-slate-400">
              Present your Digital Pass QR Code at gate security for entry verification.
            </p>
          </div>
        </div>

      </div>

    </section>
  );
}
