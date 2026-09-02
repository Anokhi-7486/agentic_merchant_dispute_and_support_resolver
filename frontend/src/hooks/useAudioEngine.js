import { useEffect, useRef, useCallback } from 'react';
import { useEmotionStore } from '../store/emotionStore';

export const useAudioEngine = () => {
  const emotion = useEmotionStore((state) => state.emotion);
  const confidence = useEmotionStore((state) => state.confidence);

  const audioCtxRef = useRef(null);
  const masterGainRef = useRef(null);
  const activeNodesRef = useRef([]);
  const lfoRef = useRef(null);

  // Stop all active sound nodes with a smooth fade-out
  const stopCurrentSoundscape = useCallback(() => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    const fadeOutDuration = 0.5;
    const now = ctx.currentTime;

    activeNodesRef.current.forEach((node) => {
      try {
        if (node.gain) {
          node.gain.setValueAtTime(node.gain.value, now);
          node.gain.exponentialRampToValueAtTime(0.001, now + fadeOutDuration);
        }
        setTimeout(() => {
          try {
            node.stop();
          } catch (e) {}
        }, fadeOutDuration * 1000);
      } catch (e) {
        // Fallback if node doesn't support linearRamp or stop
        try { node.disconnect(); } catch (err) {}
      }
    });

    if (lfoRef.current) {
      try { lfoRef.current.stop(); } catch (e) {}
      lfoRef.current = null;
    }

    activeNodesRef.current = [];
  }, []);

  // Play a soundscape depending on the active emotion
  const playSoundscape = useCallback((emo) => {
    const ctx = audioCtxRef.current;
    const master = masterGainRef.current;
    if (!ctx || !master) return;

    stopCurrentSoundscape();

    const now = ctx.currentTime;
    const nodes = [];

    // Volume dynamically scaled by the confidence score
    const targetVolume = Math.max(0.05, Math.min(0.25, confidence * 0.2));
    master.gain.setValueAtTime(master.gain.value, now);
    master.gain.linearRampToValueAtTime(targetVolume, now + 1.0);

    if (emo === 'joy') {
      // Warm, uplifting major pentatonic chords (C4, E4, G4, C5)
      const freqs = [261.63, 329.63, 392.00, 523.25];
      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq + (Math.random() - 0.5) * 2, now); // slight detuning

        // Slow phase offsets for volume swells
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.05, now + 1.5 + i * 0.5);

        osc.connect(gainNode);
        gainNode.connect(master);
        osc.start(now);

        nodes.push(osc);
        // Save references to gain nodes so we can fade them out later
        osc.gain = gainNode.gain;
      });

    } else if (emo === 'sadness') {
      // Soft, dark, slow minor chords (A3, C4, E4)
      const freqs = [220.00, 261.63, 329.63];
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, now); // warm low-pass cut
      filter.connect(master);

      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.06, now + 2.0 + i);

        osc.connect(gainNode);
        gainNode.connect(filter);
        osc.start(now);

        nodes.push(osc);
        osc.gain = gainNode.gain;
      });

    } else if (emo === 'anger') {
      // Low growling saw-tooth waveforms with rapid frequency/gain modulation
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(82.41, now); // E2 bass

      // Low pass filter
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(250, now);

      // LFO for volume pulsing
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(8, now); // 8Hz pulsing
      lfoGain.gain.setValueAtTime(0.04, now);

      lfo.connect(lfoGain);
      lfoGain.connect(gainNode.gain); // modulate gain
      lfo.start(now);
      lfoRef.current = lfo;

      gainNode.gain.setValueAtTime(0.05, now);

      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(master);
      osc.start(now);

      nodes.push(osc);
      osc.gain = gainNode.gain;

    } else if (emo === 'fear') {
      // High-pitched, tense, vibrating eerie drone (C#5, D5, G#5)
      const freqs = [554.37, 587.33, 830.61];
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(700, now);
      filter.Q.setValueAtTime(3.0, now);
      filter.connect(master);

      // Tremolo LFO modulating the filter frequency
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(14, now); // 14Hz fast jitter
      lfoGain.gain.setValueAtTime(150, now);

      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start(now);
      lfoRef.current = lfo;

      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq + (Math.random() - 0.5) * 5, now);

        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.03, now + 1.0 + i * 0.2);

        osc.connect(gainNode);
        gainNode.connect(filter);
        osc.start(now);

        nodes.push(osc);
        osc.gain = gainNode.gain;
      });

    } else {
      // Neutral: Calm wave-like ambient drone
      const freqs = [110.00, 164.81, 220.00]; // A2, E3, A3
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(300, now);
      filter.connect(master);

      // Slow LFO for ocean wave swells
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.15, now); // slow 0.15Hz waves
      lfoGain.gain.setValueAtTime(100, now);

      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start(now);
      lfoRef.current = lfo;

      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.08, now + 2.0 + i);

        osc.connect(gainNode);
        gainNode.connect(filter);
        osc.start(now);

        nodes.push(osc);
        osc.gain = gainNode.gain;
      });
    }

    activeNodesRef.current = nodes;
  }, [confidence, stopCurrentSoundscape]);

  // Handle initialization of AudioContext on click/interaction
  const initAudio = useCallback(() => {
    if (audioCtxRef.current) return;

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      console.warn("Web Audio API not supported in this browser.");
      return;
    }

    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.15, ctx.currentTime);
    masterGain.connect(ctx.destination);
    masterGainRef.current = masterGain;

    // Start with current state
    playSoundscape(emotion);
  }, [emotion, playSoundscape]);

  // React to emotion changes
  useEffect(() => {
    if (audioCtxRef.current && audioCtxRef.current.state !== 'suspended') {
      playSoundscape(emotion);
    }
  }, [emotion, playSoundscape]);

  // React to confidence changes (volume/pitch scale adjustment)
  useEffect(() => {
    const ctx = audioCtxRef.current;
    const master = masterGainRef.current;
    if (ctx && master && ctx.state !== 'suspended') {
      const now = ctx.currentTime;
      const targetVolume = Math.max(0.05, Math.min(0.25, confidence * 0.2));
      master.gain.setValueAtTime(master.gain.value, now);
      master.gain.linearRampToValueAtTime(targetVolume, now + 0.5);
    }
  }, [confidence]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCurrentSoundscape();
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, [stopCurrentSoundscape]);

  return { initAudio };
};
