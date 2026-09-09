import React, { useState } from 'react';
import MartinovationLogo from './MartinovationLogo';
import { useSound } from '../context/SoundContext';
import { Volume2, VolumeX, Tv, Menu, X, Sparkles, Ticket } from 'lucide-react';

export default function Navbar({ onOpenPassGen }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { soundEnabled, setSoundEnabled, crtEnabled, setCrtEnabled, playClick, playHover } = useSound();

  const navLinks = [
    { name: "Quests", href: "#quests" },
    { name: "Schedule", href: "#schedule" },
    { name: "Digital Pass", href: "#pass-gen" },
    { name: "Marty AI", href: "#ai-companion" },
    { name: "Campus Map", href: "#campus-map" },
    { name: "Organizers", href: "#team" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#030712]/90 backdrop-blur-md border-b border-cyan-500/20 px-4 lg:px-8 py-3 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <a href="#" onClick={playClick}>
          <MartinovationLogo size="md" />
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onMouseEnter={playHover}
              onClick={playClick}
              className="font-orbitron text-xs font-semibold tracking-wider text-slate-300 hover:text-cyan-400 transition-colors uppercase relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-cyan-400 hover:after:w-full after:transition-all after:duration-300"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Action Controls & SFX Toggles */}
        <div className="hidden md:flex items-center gap-4">
          {/* CRT Scanline Toggle */}
          <button
            onClick={() => {
              playClick();
              setCrtEnabled(!crtEnabled);
            }}
            onMouseEnter={playHover}
            title={crtEnabled ? "Disable CRT Retro Filter" : "Enable CRT Retro Filter"}
            className={`p-2 rounded-lg border transition-all ${
              crtEnabled
                ? "bg-cyan-950/80 border-cyan-400 text-cyan-400 shadow-[0_0_10px_rgba(0,243,255,0.4)]"
                : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200"
            }`}
          >
            <Tv className="w-4 h-4" />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              playClick();
              setSoundEnabled(!soundEnabled);
            }}
            onMouseEnter={playHover}
            title={soundEnabled ? "Mute Cyber Audio SFX" : "Enable Cyber Audio SFX"}
            className={`p-2 rounded-lg border transition-all ${
              soundEnabled
                ? "bg-purple-950/80 border-purple-400 text-purple-400 shadow-[0_0_10px_rgba(157,78,221,0.4)]"
                : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200"
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Pass Generator CTA */}
          <button
            onClick={() => {
              playClick();
              if (onOpenPassGen) onOpenPassGen();
              else {
                document.getElementById('pass-gen')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            onMouseEnter={playHover}
            className="cyber-button px-5 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-black font-orbitron font-extrabold text-xs tracking-wider uppercase flex items-center gap-2 shadow-lg shadow-cyan-500/20"
          >
            <Ticket className="w-4 h-4" />
            <span>Get Cyber Pass</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-300"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-purple-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>
          <button
            onClick={() => {
              playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 bg-slate-900 border border-cyan-500/30 rounded-lg text-cyan-400"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pt-4 border-t border-cyan-500/20 bg-[#070b14]/95 rounded-b-xl p-4 flex flex-col gap-4 animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => {
                playClick();
                setMobileMenuOpen(false);
              }}
              className="font-orbitron text-sm text-slate-200 hover:text-cyan-400 py-2 border-b border-slate-800/60 uppercase"
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={() => {
              playClick();
              setMobileMenuOpen(false);
              document.getElementById('pass-gen')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-orbitron font-black text-xs uppercase rounded-lg flex items-center justify-center gap-2"
          >
            <Ticket className="w-4 h-4" />
            <span>Get Cyber Pass</span>
          </button>
        </div>
      )}
    </nav>
  );
}
