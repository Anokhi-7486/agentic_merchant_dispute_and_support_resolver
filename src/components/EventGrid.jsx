import React, { useState } from 'react';
import { FEST_DATA } from '../data/festData';
import { useSound } from '../context/SoundContext';
import EventModal from './EventModal';
import { Search, Sparkles, Code, Cpu, Gamepad2, Palette, Music, Trophy, Users, ChevronRight } from 'lucide-react';

export default function EventGrid({ onRegisteredPass }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { playClick, playHover } = useSound();

  const iconMap = {
    Sparkles: <Sparkles className="w-4 h-4" />,
    Code: <Code className="w-4 h-4" />,
    Cpu: <Cpu className="w-4 h-4" />,
    Gamepad2: <Gamepad2 className="w-4 h-4" />,
    Palette: <Palette className="w-4 h-4" />,
    Music: <Music className="w-4 h-4" />,
  };

  const filteredEvents = FEST_DATA.events.filter((event) => {
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="quests" className="py-20 px-4 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 text-xs font-orbitron font-bold tracking-widest uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5" /> COMPETITIVE ARENAS & QUESTS
        </div>
        <h2 className="font-orbitron font-black text-3xl md:text-5xl text-slate-100 uppercase mb-4">
          TECH & CULTURAL <span className="text-cyan-400 text-glow-cyan">MATRIX</span>
        </h2>
        <p className="max-w-2xl mx-auto font-orbitron text-xs md:text-sm text-slate-400 uppercase tracking-wider">
          CHOOSE YOUR QUEST — BATTLE FOR OVER ₹5,00,000 IN TOTAL CASH PRIZES & CERTIFICATES
        </p>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
        
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start">
          {FEST_DATA.categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                playClick();
                setSelectedCategory(cat.id);
              }}
              onMouseEnter={playHover}
              className={`px-4 py-2 rounded-xl font-orbitron text-xs font-bold uppercase transition-all flex items-center gap-2 border ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 border-cyan-400 text-black shadow-[0_0_15px_rgba(0,243,255,0.4)]'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {iconMap[cat.icon]}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search quest..."
            className="w-full pl-9 pr-4 py-2.5 bg-slate-900/90 border border-cyan-500/30 rounded-xl font-orbitron text-xs text-slate-200 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
          />
        </div>

      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="cyber-box rounded-2xl p-6 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 shadow-xl"
          >
            <div>
              {/* Badge & Difficulty */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-[10px] font-orbitron font-bold uppercase rounded-md">
                  {event.difficulty}
                </span>
                <span className="px-2.5 py-1 bg-purple-950 border border-purple-500/40 text-purple-300 text-[10px] font-orbitron font-bold uppercase rounded-md">
                  {event.badge}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-orbitron font-extrabold text-xl text-slate-100 group-hover:text-cyan-300 transition-colors mb-2">
                {event.title}
              </h3>

              {/* Short Description */}
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                {event.shortDesc}
              </p>
            </div>

            <div>
              {/* Meta details */}
              <div className="grid grid-cols-2 gap-2 py-3 border-t border-b border-slate-800/80 mb-5 text-xs font-orbitron">
                <div>
                  <span className="text-slate-500 block text-[10px]">PRIZE POOL</span>
                  <span className="text-cyan-400 font-bold">{event.prize}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">TEAM SIZE</span>
                  <span className="text-purple-400 font-bold">{event.teamSize}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  playClick();
                  setSelectedEvent(event);
                }}
                onMouseEnter={playHover}
                className="w-full py-2.5 bg-slate-900 hover:bg-cyan-500 text-cyan-400 hover:text-black border border-cyan-500/40 hover:border-cyan-400 font-orbitron font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-[0_0_15px_rgba(0,243,255,0.4)]"
              >
                <span>INITIATE QUEST</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Modal View */}
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onRegisteredPass={onRegisteredPass}
        />
      )}

    </section>
  );
}
