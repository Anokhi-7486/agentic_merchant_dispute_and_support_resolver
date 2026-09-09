import React, { useEffect, useRef, useState } from 'react';
import { useSound } from '../context/SoundContext';
import MartinovationLogo from './MartinovationLogo';
import { Play, Sparkles, Terminal, ShieldAlert } from 'lucide-react';

export default function IntroScreen({ onEnter }) {
  const canvasRef = useRef(null);
  const [systemLoaded, setSystemLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const { playSuccess, playClick, playGlitch } = useSound();

  // Simulated loading sequence
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setSystemLoaded(true);
          return 100;
        }
        return prev + 10;
      });
    }, 120);

    return () => clearInterval(timer);
  }, []);

  // Cyber particle matrix background canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 70;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? '#00f3ff' : '#9d4edd',
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
      });
    }

    const render = () => {
      ctx.fillStyle = 'rgba(3, 7, 18, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleStart = () => {
    playSuccess();
    playGlitch();
    onEnter();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#030712] flex flex-col items-center justify-center p-6 select-none overflow-hidden">
      {/* Background Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 z-0 pointer-events-none" />

      {/* Main Glass HUD Container */}
      <div className="relative z-10 max-w-xl w-full cyber-box p-8 md:p-12 rounded-2xl flex flex-col items-center text-center border border-cyan-500/40 shadow-[0_0_50px_rgba(0,243,255,0.2)]">
        
        {/* Animated Emblem */}
        <div className="mb-6 animate-float">
          <MartinovationLogo size="xl" showSubtitle={false} />
        </div>

        <h1 className="font-orbitron font-black text-3xl md:text-5xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-yellow-300 mb-2 drop-shadow-md">
          MARTINOVATION
        </h1>
        <p className="font-orbitron text-xs md:text-sm font-semibold tracking-widest text-cyan-400 uppercase mb-8">
          Genesis of Tomorrow — Cyber Matrix 2026
        </p>

        {/* Status Terminal Bar */}
        <div className="w-full bg-[#070b14] border border-cyan-500/30 rounded-xl p-4 mb-8 font-mono text-left text-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2 border-b border-slate-800 pb-2">
            <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
              <Terminal className="w-3.5 h-3.5" /> SYSTEM INITIALIZATION
            </span>
            <span className="text-purple-400">OCT 5, 2026</span>
          </div>

          <div className="space-y-1.5 text-slate-300">
            <p className="text-slate-400">&gt; Loading UMU Arena Core Modules...</p>
            <p className="text-cyan-300">&gt; GSAP Physics & Synth SFX Engine: <span className="text-green-400 font-bold">READY</span></p>
            <p className="text-purple-300">&gt; Quest Matrix & AI Assistant: <span className="text-green-400 font-bold">ACTIVE</span></p>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-[11px] text-slate-400 font-semibold mb-1">
              <span>SYSTEM VERIFICATION</span>
              <span className="text-cyan-400">{progress}%</span>
            </div>
            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-yellow-400 transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Enter Button */}
        {systemLoaded ? (
          <button
            onClick={handleStart}
            className="w-full py-4 bg-gradient-to-r from-cyan-400 via-purple-500 to-yellow-400 hover:from-cyan-300 hover:to-yellow-300 text-black font-orbitron font-black text-sm md:text-base tracking-widest uppercase rounded-xl shadow-[0_0_30px_rgba(0,243,255,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 group"
          >
            <Play className="w-5 h-5 fill-black group-hover:scale-125 transition-transform" />
            <span>ENTER THE TECH MATRIX</span>
          </button>
        ) : (
          <div className="text-cyan-400 font-orbitron text-xs animate-pulse tracking-widest uppercase py-3">
            SYNCHRONIZING QUANTUM CORES...
          </div>
        )}

      </div>
    </div>
  );
}
