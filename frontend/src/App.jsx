import React, { useEffect } from 'react';
import ParticleAvatar from './components/Avatar/ParticleAvatar';
import CarKey from './components/UI/CarKey';
import HelpBot from './components/UI/HelpBot';
import { useEmotionCapture } from './hooks/useEmotionCapture';
import { useEmotionStore } from './store/emotionStore';
import { useAudioEngine } from './hooks/useAudioEngine';
import { Activity, Camera, Mic, Shield, AlertTriangle, Play } from 'lucide-react';
import './App.css';

function App() {
  const { requestPermissions } = useEmotionCapture();
  const { initAudio } = useAudioEngine();
  const { emotion, confidence, typingSpeed, isCameraActive, isMicActive, error } = useEmotionStore();

  useEffect(() => {
    requestPermissions();
  }, [requestPermissions]);

  // Trigger audio initialization on user interaction (clicks, keystrokes, etc.)
  useEffect(() => {
    const handleInteraction = () => {
      initAudio();
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);
    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, [initAudio]);

  return (
    <div className="app-container">
      <header>
        <div className="logo-section">
          <Activity className="logo-icon" size={32} />
          <h1>EMOTION ECHO</h1>
        </div>
        <div className="status-badges">
          <Badge icon={<Camera size={16} />} active={isCameraActive} label="OPTIC LINK" />
          <Badge icon={<Mic size={16} />} active={isMicActive} label="AUDIO LINK" />
          <Badge icon={<Shield size={16} />} active={true} label="SECURE CORE" />
        </div>
      </header>

      <main>
        <div className="avatar-viewer">
          <ParticleAvatar />
          <div className="overlay-data">
            <div className="data-card">
              <h3>NEURAL STATE</h3>
              <p className="emotion-label">{emotion.toUpperCase()}</p>
              <div className="confidence-bar">
                <div 
                  className="confidence-fill" 
                  style={{ width: `${confidence * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="data-card">
              <h3>RHYTHM X</h3>
              <p className="data-value" style={{ fontSize: '1.8rem', fontWeight: 800 }}>
                {(typingSpeed / 10).toFixed(1)}
                <span style={{ fontSize: '0.8rem', marginLeft: '5px', opacity: 0.5 }}>RPS</span>
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="error-banner">
            <AlertTriangle size={18} />
            <span>{error}</span>
          </div>
        )}

        <section className="controls">
          <label>EMOTION IGNITION KEYS (CAR BRANDED)</label>
          <div className="button-row">
            {['neutral', 'joy', 'sadness', 'anger', 'fear'].map((e) => (
              <CarKey key={e} emotion={e} />
            ))}
          </div>
        </section>
      </main>

      <HelpBot />

      <footer>
        <p>© 2026 EMOTION ECHO // THE QUANTUM DIGITAL TWIN</p>
        <small style={{ opacity: 0.3, fontSize: '0.75rem' }}>
          *Click anywhere or press any key to initialize the ambient soundscape module. Keystroke rhythm is processed browser-only.
        </small>
      </footer>
    </div>
  );
}

const Badge = ({ icon, active, label }) => (
      <div className={`badge ${active ? 'active' : 'inactive'}`}>
        {icon}
        <span>{label}</span>
      </div>
    );

export default App;
