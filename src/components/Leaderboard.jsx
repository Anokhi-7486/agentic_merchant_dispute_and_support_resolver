import React from 'react';
import { FEST_DATA } from '../data/festData';
import { Trophy, Award, Flame, Users, Shield } from 'lucide-react';

export default function Leaderboard() {
  const leaderColleges = [
    { rank: 1, name: "Usha Martin University (Host)", points: 1420, badge: "CHAMPION HOST" },
    { rank: 2, name: "BIT Sindri", points: 1180, badge: "GOLD CONTENDER" },
    { rank: 3, name: "NIT Jamshedpur", points: 950, badge: "SILVER CONTENDER" },
    { rank: 4, name: "VIT Vellore", points: 840, badge: "BRONZE CONTENDER" },
    { rank: 5, name: "IIT Guwahati", points: 790, badge: "TOP 5" },
  ];

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-950/80 border border-yellow-500/30 text-yellow-400 text-xs font-orbitron font-bold tracking-widest uppercase mb-3">
          <Trophy className="w-3.5 h-3.5" /> LIVE UNIVERSITY STANDINGS
        </div>
        <h2 className="font-orbitron font-black text-3xl md:text-5xl text-slate-100 uppercase mb-3">
          LEADERBOARD <span className="text-yellow-400 text-glow-yellow">& QUEST STATS</span>
        </h2>
      </div>

      <div className="cyber-box rounded-2xl p-6 md:p-8 border border-yellow-500/30">
        <div className="space-y-3">
          {leaderColleges.map((col) => (
            <div
              key={col.rank}
              className="bg-slate-950/80 border border-slate-800 hover:border-yellow-500/50 p-4 rounded-xl flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-orbitron font-black text-sm ${
                  col.rank === 1 ? 'bg-yellow-400 text-black shadow-[0_0_15px_rgba(255,230,0,0.5)]' :
                  col.rank === 2 ? 'bg-slate-300 text-black' :
                  col.rank === 3 ? 'bg-amber-600 text-black' :
                  'bg-slate-800 text-slate-400'
                }`}>
                  #{col.rank}
                </div>
                <div>
                  <h4 className="font-orbitron font-bold text-slate-100 text-sm md:text-base">
                    {col.name}
                  </h4>
                  <span className="text-[10px] font-orbitron text-yellow-400/90 font-semibold uppercase">
                    {col.badge}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <div className="font-orbitron font-black text-lg text-cyan-400">
                  {col.points} PTS
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
