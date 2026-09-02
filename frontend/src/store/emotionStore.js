import { create } from 'zustand';

export const useEmotionStore = create((set) => ({
  emotion: 'neutral',
  confidence: 1.0,
  blendshapes: {},
  typingSpeed: 0,
  isCameraActive: false,
  isMicActive: false,
  error: null,

  setEmotion: (emotion, confidence) => set({ emotion, confidence }),
  setBlendshapes: (blendshapes) => set({ blendshapes }),
  setTypingSpeed: (speed) => set({ typingSpeed: speed }),
  setCameraActive: (active) => set({ isCameraActive: active }),
  setMicActive: (active) => set({ isMicActive: active }),
  setError: (error) => set({ error }),
}));
