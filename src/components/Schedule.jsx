import React, { useState } from 'react';
import { FEST_DATA } from '../data/festData';
import { useSound } from '../context/SoundContext';
import { Calendar, Clock, MapPin, Sparkles } from 'lucide-react';

export default function Schedule() {
  const [activeDay, setActiveDay] = useState(0);
  const { playClick, playHover } = useSound();

  const currentSchedule = FEST_DATA.schedule[activeDay];

  return (
    <section id="schedule" className="py-20 px-4 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-orbitron font-bold tracking-widest uppercase mb-3">
          <Calendar className="w-3.5 h-3.5" /> FEST TIMELINE MATRIX
        </div>
        <h2 className="font-orbitron font-black text-3xl md:text-5xl text-slate-100 uppercase mb-3">
          OFFICIAL <span className="text-purple-400 text-glow-purple">SCHEDULE</span>
        </h2>
        <p className="font-orbitron text-xs text-slate-400 uppercase tracking-widest">
          OCTOBER 5 — OCTOBER 9, 2026 | USHA MARTIN UNIVERSITY CAMPUS
        </p>
      </div>

      {/* Day Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-10">
        {FEST_DATA.schedule.map((item, idx) => (
          <button
            key={idx}
            onClick={() => {
              playClick();
              setActiveDay(idx);
            }}
            onMouseEnter={playHover}
            className={`p-3 rounded-xl font-orbitron text-center transition-all border ${
              activeDay === idx
                ? 'bg-gradient-to-r from-purple-600 to-cyan-500 border-cyan-300 text-black shadow-[0_0_15px_rgba(157,78,221,0.5)] font-black'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <div className="text-sm uppercase font-extrabold">{item.day}</div>
            <div className="text-[10px] opacity-80 mt-0.5">{item.date.split(',')[1]}</div>
          </button>
        ))}
      </div>

      {/* Timeline List */}
      <div className="cyber-box rounded-2xl p-6 md:p-8 border border-purple-500/30">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <h3 className="font-orbitron font-bold text-lg md:text-xl text-slate-100 uppercase flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" /> {currentSchedule.day}: {currentSchedule.date}
          </h3>
          <span className="text-xs font-orbitron text-cyan-400 font-bold px-3 py-1 bg-cyan-950/80 border border-cyan-500/30 rounded-lg">
            {currentSchedule.events.length} EVENTS SCHEDULED
          </span>
        </div>

        <div className="space-y-4">
          {currentSchedule.events.map((evt, index) => (
            <div
              key={index}
              className="bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/40 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-24 shrink-0 font-orbitron font-bold text-xs text-cyan-400 flex items-center gap-1.5 bg-cyan-950/40 border border-cyan-500/20 px-2.5 py-1.5 rounded-lg">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{evt.time}</span>
                </div>
                <div>
                  <h4 className="font-orbitron font-bold text-slate-100 text-base">
                    {evt.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-purple-400" />
                    <span>{evt.venue}</span>
                  </div>
                </div>
              </div>

              <span className="self-start md:self-center px-3 py-1 bg-purple-950 border border-purple-500/40 text-purple-300 text-[10px] font-orbitron font-bold uppercase rounded-md">
                {evt.type}
              </span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
