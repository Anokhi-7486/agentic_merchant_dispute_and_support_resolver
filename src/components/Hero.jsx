import React, { useState, useEffect } from 'react';
import { FEST_DATA } from '../data/festData';
import { useSound } from '../context/SoundContext';
import { Calendar, MapPin, Award, Users, ChevronDown, Ticket, Zap, Flame } from 'lucide-react';

export default function Hero({ onOpenPassGen }) {
  const { playClick, playHover } = useSound();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Countdown timer to Oct 5, 2026
  useEffect(() => {
    const targetDate = new Date(FEST_DATA.startDate).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-4 overflow-hidden flex flex-col items-center justify-center min-h-[90vh]">
      {/* Background Animated Gradient Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-600/20 via-purple-600/20 to-pink-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 -z-10" />

      <div className="max-w-6xl mx-auto text-center flex flex-col items-center">
        
        {/* Fest Date & University Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-orbitron font-bold tracking-widest uppercase mb-8 shadow-[0_0_20px_rgba(0,243,255,0.3)] animate-pulse">
          <Calendar className="w-4 h-4 text-cyan-400" />
          <span>OCTOBER 5 — OCTOBER 9, 2026</span>
          <span className="text-slate-500">|</span>
          <MapPin className="w-4 h-4 text-purple-400" />
          <span>USHA MARTIN UNIVERSITY</span>
        </div>

        {/* Main Title */}
        <h1 className="font-orbitron font-black text-5xl md:text-7xl lg:text-8xl tracking-tight text-slate-100 uppercase mb-6 leading-none">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-300 to-yellow-300 text-glow-cyan">
            MARTINOVATION
          </span>
          <br />
          <span className="text-3xl md:text-5xl lg:text-6xl text-slate-300 font-extrabold tracking-widest block mt-2">
            2026
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-3xl font-orbitron text-base md:text-xl font-semibold tracking-wider text-cyan-400/90 uppercase mb-10">
          ⚡ GENESIS OF TOMORROW — THE ANIME & CYBERPUNK TECH MATRIX ⚡
        </p>

        {/* Countdown Timer HUD */}
        <div className="grid grid-cols-4 gap-3 md:gap-6 max-w-2xl w-full mb-12">
          {[
            { label: "DAYS", value: timeLeft.days },
            { label: "HOURS", value: timeLeft.hours },
            { label: "MINUTES", value: timeLeft.minutes },
            { label: "SECONDS", value: timeLeft.seconds },
          ].map((item, idx) => (
            <div
              key={idx}
              className="cyber-box p-3 md:p-5 rounded-xl border border-cyan-500/30 flex flex-col items-center shadow-lg"
            >
              <span className="font-orbitron font-black text-2xl md:text-4xl text-cyan-300 text-glow-cyan">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="font-orbitron text-[10px] md:text-xs font-bold text-slate-400 tracking-widest mt-1">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-5 w-full max-w-md justify-center mb-16">
          <a
            href="#quests"
            onClick={playClick}
            onMouseEnter={playHover}
            className="w-full sm:w-auto cyber-button px-8 py-4 bg-gradient-to-r from-cyan-400 to-purple-600 hover:from-cyan-300 hover:to-purple-500 text-black font-orbitron font-black text-sm tracking-widest uppercase flex items-center justify-center gap-3 shadow-[0_0_25px_rgba(0,243,255,0.4)]"
          >
            <Flame className="w-5 h-5 fill-black" />
            <span>EXPLORE QUESTS</span>
          </a>

          <button
            onClick={() => {
              playClick();
              if (onOpenPassGen) onOpenPassGen();
              else document.getElementById('pass-gen')?.scrollIntoView({ behavior: 'smooth' });
            }}
            onMouseEnter={playHover}
            className="w-full sm:w-auto px-8 py-4 bg-slate-900/90 hover:bg-slate-800 border border-purple-500/50 hover:border-purple-400 text-purple-300 font-orbitron font-bold text-sm tracking-widest uppercase rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-purple-500/10 transition-all"
          >
            <Ticket className="w-5 h-5 text-purple-400" />
            <span>GET CYBER PASS</span>
          </button>
        </div>

        {/* Fest Key Stats Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl w-full">
          {[
            { label: "TOTAL PRIZE POOL", val: FEST_DATA.totalPrizePool, color: "text-cyan-400" },
            { label: "EXPECTED PARTICIPANTS", val: FEST_DATA.expectedParticipants, color: "text-purple-400" },
            { label: "PARTICIPATING COLLEGES", val: FEST_DATA.participatingColleges, color: "text-yellow-400" },
            { label: "TECHNICAL & CULTURAL QUESTS", val: `${FEST_DATA.events.length}+`, color: "text-green-400" },
          ].map((stat, i) => (
            <div key={i} className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl text-center backdrop-blur-sm">
              <div className={`font-orbitron font-black text-xl md:text-2xl ${stat.color}`}>
                {stat.val}
              </div>
              <div className="font-orbitron text-[10px] text-slate-400 tracking-wider font-semibold mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
