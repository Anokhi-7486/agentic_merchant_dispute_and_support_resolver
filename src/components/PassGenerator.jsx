import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';
import confetti from 'canvas-confetti';
import { FEST_DATA } from '../data/festData';
import { useSound } from '../context/SoundContext';
import MartinovationLogo from './MartinovationLogo';
import { Ticket, Download, ShieldCheck, User, Building, Mail, Sparkles, QrCode } from 'lucide-react';

export default function PassGenerator({ defaultPass }) {
  const { playClick, playSuccess } = useSound();
  const passRef = useRef(null);

  const [passData, setPassData] = useState(defaultPass || {
    ticketId: `UMU-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    participantName: "Alex Cyberpunk",
    email: "alex@ushamartin.edu",
    college: "Usha Martin University",
    eventTitle: "Genesis Hackathon (24-Hour)",
    status: "VERIFIED PASS"
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [college, setCollege] = useState('Usha Martin University');
  const [eventTitle, setEventTitle] = useState(FEST_DATA.events[0].title);
  const [downloading, setDownloading] = useState(false);

  const handleGenerate = (e) => {
    e.preventDefault();
    playSuccess();

    // Trigger Cyber Confetti FX
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00f3ff', '#9d4edd', '#ffe600']
    });

    const newPass = {
      ticketId: `UMU-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      participantName: name || "Cyber Participant",
      email: email || "user@university.edu",
      college: college || "Usha Martin University",
      eventTitle: eventTitle,
      status: "CONFIRMED PASS"
    };

    setPassData(newPass);
  };

  const handleDownload = async () => {
    if (!passRef.current) return;
    playClick();
    setDownloading(true);

    try {
      const canvas = await html2canvas(passRef.current, {
        backgroundColor: '#030712',
        scale: 2,
      });

      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `Martinovation-Pass-${passData.ticketId}.png`;
      link.click();
    } catch (err) {
      console.error("Failed to generate image download:", err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <section id="pass-gen" className="py-20 px-4 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-orbitron font-bold tracking-widest uppercase mb-3">
          <Ticket className="w-3.5 h-3.5 text-cyan-400" /> GAMIFIED DIGITAL TICKET ENGINE
        </div>
        <h2 className="font-orbitron font-black text-3xl md:text-5xl text-slate-100 uppercase mb-3">
          CYBERPUNK <span className="text-cyan-400 text-glow-cyan">DIGITAL PASS</span>
        </h2>
        <p className="font-orbitron text-xs text-slate-400 uppercase tracking-widest">
          GENERATE & DOWNLOAD YOUR HOLOGRAPHIC ENTRY BADGE FOR MARTINOVATION 2026
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Pass Creator Form */}
        <div className="lg:col-span-5 cyber-box p-6 md:p-8 rounded-2xl border border-cyan-500/30">
          <h3 className="font-orbitron font-bold text-lg text-slate-100 uppercase mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" /> CREATE CUSTOM PASS
          </h3>

          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-xs font-orbitron text-slate-400 mb-1">YOUR NAME</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-100 focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-orbitron text-slate-400 mb-1">EMAIL ADDRESS</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                <input
                  type="email"
                  required
                  placeholder="student@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-100 focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-orbitron text-slate-400 mb-1">COLLEGE / UNIVERSITY</label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-yellow-400" />
                <input
                  type="text"
                  required
                  placeholder="Usha Martin University"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-100 focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-orbitron text-slate-400 mb-1">REGISTERED QUEST</label>
              <select
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-100 focus:border-cyan-400 focus:outline-none"
              >
                {FEST_DATA.events.map((evt) => (
                  <option key={evt.id} value={evt.title}>
                    {evt.title}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-cyan-400 to-purple-600 hover:from-cyan-300 hover:to-purple-500 text-black font-orbitron font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-cyan-500/20 transition-all"
            >
              GENERATE HOLOGRAPHIC PASS
            </button>
          </form>
        </div>

        {/* Live Holographic Pass Preview */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div
            ref={passRef}
            className="w-full max-w-md bg-gradient-to-b from-[#0b0f19] via-[#070b14] to-[#030712] border-2 border-cyan-500/60 rounded-3xl p-6 relative overflow-hidden shadow-[0_0_50px_rgba(0,243,255,0.25)]"
          >
            {/* Holographic Watermark Glow */}
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

            {/* Top Pass Header */}
            <div className="flex items-center justify-between border-b border-cyan-500/30 pb-4 mb-6">
              <MartinovationLogo size="sm" showSubtitle={false} />
              <div className="text-right">
                <span className="px-2.5 py-1 bg-green-950 border border-green-500/50 text-green-400 font-orbitron font-bold text-[10px] uppercase rounded-full flex items-center gap-1 inline-flex">
                  <ShieldCheck className="w-3 h-3" /> {passData.status}
                </span>
                <div className="font-mono text-[10px] text-cyan-400 mt-1">{passData.ticketId}</div>
              </div>
            </div>

            {/* Participant Main Body */}
            <div className="grid grid-cols-3 gap-4 items-center mb-6">
              <div className="col-span-2 space-y-2">
                <div>
                  <div className="text-[10px] font-orbitron text-slate-400">PARTICIPANT NAME</div>
                  <div className="font-orbitron font-black text-xl text-slate-100 uppercase truncate">
                    {passData.participantName}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-orbitron text-slate-400">INSTITUTION</div>
                  <div className="font-orbitron font-semibold text-xs text-purple-300 truncate">
                    {passData.college}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-orbitron text-slate-400">PRIMARY QUEST</div>
                  <div className="font-orbitron font-bold text-xs text-cyan-300 truncate">
                    {passData.eventTitle}
                  </div>
                </div>
              </div>

              {/* QR Code Container */}
              <div className="col-span-1 flex flex-col items-center justify-center p-2.5 bg-white rounded-2xl shadow-lg border-2 border-cyan-400">
                <QRCodeSVG
                  value={`https://umutechfest.co.in/verify?ticket=${passData.ticketId}`}
                  size={90}
                  level="H"
                />
                <span className="text-[8px] font-mono text-black font-bold mt-1">SCAN TICKET</span>
              </div>
            </div>

            {/* Bottom Footer Info */}
            <div className="border-t border-slate-800/80 pt-3 flex items-center justify-between font-orbitron text-[10px] text-slate-400">
              <span>OCTOBER 5–9, 2026</span>
              <span>USHA MARTIN UNIVERSITY</span>
            </div>
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="mt-6 px-8 py-3.5 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-black font-orbitron font-black text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 shadow-lg shadow-purple-500/20"
          >
            <Download className="w-4 h-4" />
            <span>{downloading ? "GENERATING IMAGE..." : "DOWNLOAD PASS PNG"}</span>
          </button>
        </div>

      </div>

    </section>
  );
}
