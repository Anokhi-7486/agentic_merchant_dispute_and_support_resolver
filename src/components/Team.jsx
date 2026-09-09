import React from 'react';
import { FEST_DATA } from '../data/festData';
import { Users, UserCheck } from 'lucide-react';

export default function Team() {
  return (
    <section id="team" className="py-20 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 text-xs font-orbitron font-bold tracking-widest uppercase mb-3">
          <Users className="w-3.5 h-3.5" /> FEST ORGANIZERS & FACULTY
        </div>
        <h2 className="font-orbitron font-black text-3xl md:text-5xl text-slate-100 uppercase mb-3">
          MEET THE <span className="text-purple-400 text-glow-purple">MATRIX CREW</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEST_DATA.team.map((member, idx) => (
          <div
            key={idx}
            className="cyber-box p-6 rounded-2xl border border-slate-800 hover:border-purple-500/50 transition-all flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center font-orbitron font-black text-black text-lg shrink-0">
              {member.name.charAt(0)}
            </div>
            <div>
              <h4 className="font-orbitron font-bold text-slate-100 text-base">
                {member.name}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">{member.role}</p>
              <span className="inline-block mt-2 px-2 py-0.5 bg-purple-950 border border-purple-500/30 text-purple-300 text-[9px] font-orbitron font-bold uppercase rounded">
                {member.tag}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
