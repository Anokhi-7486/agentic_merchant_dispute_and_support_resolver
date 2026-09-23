import React, { useState } from 'react';
import { SoundProvider } from './context/SoundContext';
import IntroScreen from './components/IntroScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EventGrid from './components/EventGrid';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import Schedule from './components/Schedule';
import PassGenerator from './components/PassGenerator';
import Leaderboard from './components/Leaderboard';
import CampusMap from './components/CampusMap';
import MartyBot from './components/MartyBot';
import Sponsors from './components/Sponsors';
import Team from './components/Team';
import Footer from './components/Footer';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [activePass, setActivePass] = useState(null);

  const handleOpenPassGen = () => {
    document.getElementById('pass-gen')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <SoundProvider>
      {showIntro ? (
        <IntroScreen onEnter={() => setShowIntro(false)} />
      ) : (
        <div className="min-h-screen bg-[#030712] text-slate-100 font-inter relative selection:bg-cyan-500 selection:text-black">
          {/* Top Navigation */}
          <Navbar onOpenPassGen={handleOpenPassGen} />

          {/* Hero Section */}
          <Hero onOpenPassGen={handleOpenPassGen} />

          {/* Event Data Instrumentation & Funnel Analytics Dashboard */}
          <AnalyticsDashboard />

          {/* Quest Matrix (Events) */}
          <EventGrid onRegisteredPass={(pass) => setActivePass(pass)} />

          {/* Fest Schedule Matrix */}
          <Schedule />

          {/* Holographic Cyber Pass Generator */}
          <PassGenerator defaultPass={activePass} />

          {/* Live Leaderboard Standings */}
          <Leaderboard />

          {/* Campus Radar Venue Map */}
          <CampusMap />

          {/* Sponsors & Partners */}
          <Sponsors />

          {/* Organizers & Faculty Team */}
          <Team />

          {/* Footer */}
          <Footer />

          {/* Marty AI Cyber Companion Widget */}
          <MartyBot />
        </div>
      )}
    </SoundProvider>
  );
}
