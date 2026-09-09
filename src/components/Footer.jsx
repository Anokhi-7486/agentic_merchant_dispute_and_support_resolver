import React from 'react';
import MartinovationLogo from './MartinovationLogo';
import { Mail, Phone, MapPin, Globe, Github, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#02050e] border-t border-cyan-500/20 pt-16 pb-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        
        {/* Col 1: Brand Info */}
        <div className="space-y-4">
          <MartinovationLogo size="md" />
          <p className="text-xs text-slate-400 leading-relaxed">
            Martinovation 2026 is the annual flagship techno-cultural fest hosted by Usha Martin University, Ranchi.
          </p>
          <div className="text-[11px] font-orbitron text-cyan-400 font-bold">
            OCTOBER 5 – OCTOBER 9, 2026
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h4 className="font-orbitron font-bold text-sm text-slate-100 uppercase mb-4 border-b border-slate-800 pb-2">
            MATRIX PORTAL
          </h4>
          <ul className="space-y-2 text-xs font-orbitron text-slate-400">
            <li><a href="#quests" className="hover:text-cyan-400 transition-colors">QUEST MATRIX</a></li>
            <li><a href="#schedule" className="hover:text-cyan-400 transition-colors">TIMELINE SCHEDULE</a></li>
            <li><a href="#pass-gen" className="hover:text-cyan-400 transition-colors">DIGITAL PASS GENERATOR</a></li>
            <li><a href="#ai-companion" className="hover:text-cyan-400 transition-colors">MARTY AI ASSISTANT</a></li>
            <li><a href="#campus-map" className="hover:text-cyan-400 transition-colors">CAMPUS ARENA MAP</a></li>
          </ul>
        </div>

        {/* Col 3: Legal & Guidelines */}
        <div>
          <h4 className="font-orbitron font-bold text-sm text-slate-100 uppercase mb-4 border-b border-slate-800 pb-2">
            HELP & GUIDELINES
          </h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><a href="https://www.ushamartinuniversity.com" target="_blank" rel="noreferrer" className="hover:text-purple-400 transition-colors flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> UMU Official Portal</a></li>
            <li><a href="#quests" className="hover:text-purple-400 transition-colors">Rulebooks & Guidelines</a></li>
            <li><a href="#quests" className="hover:text-purple-400 transition-colors">Accommodation & Travel</a></li>
            <li><a href="https://github.com/Anokhi-7486/tech_fest_website" target="_blank" rel="noreferrer" className="hover:text-purple-400 transition-colors flex items-center gap-1.5"><Github className="w-3.5 h-3.5" /> GitHub Repository</a></li>
          </ul>
        </div>

        {/* Col 4: Contact Us */}
        <div>
          <h4 className="font-orbitron font-bold text-sm text-slate-100 uppercase mb-4 border-b border-slate-800 pb-2">
            CONTACT HELPDESK
          </h4>
          <div className="space-y-2.5 text-xs text-slate-400">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>Usha Martin University, At Village Narayansot, P.O. Tatisilwai, Ranchi-Purulia Highway, Ranchi, Jharkhand 835103</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-purple-400 shrink-0" />
              <span>info@umutechfest.co.in</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-yellow-400 shrink-0" />
              <span>+91 651 223344 / +91 98765 43210</span>
            </div>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-orbitron">
        <div>
          © 2026 MARTINOVATION — USHA MARTIN UNIVERSITY. ALL RIGHTS RESERVED.
        </div>
        <div className="mt-2 sm:mt-0 flex items-center gap-1">
          <span>BUILT FOR MARTINOVATION WITH</span>
          <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
        </div>
      </div>
    </footer>
  );
}
