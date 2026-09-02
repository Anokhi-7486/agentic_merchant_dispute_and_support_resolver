import { useEmotionStore } from '../frontend/src/store/emotionStore';
import { describe, test, expect, beforeEach } from 'vitest';

describe('EmotionEcho Zustand Store Tests', () => {
  beforeEach(() => {
    // Reset store to default state before each test
    useEmotionStore.setState({
      emotion: 'neutral',
      confidence: 1.0,
      blendshapes: {},
      typingSpeed: 0,
      isCameraActive: false,
      isMicActive: false,
      error: null,
    });
  });

  test('should initialize with default values', () => {
    const state = useEmotionStore.getState();
    expect(state.emotion).toBe('neutral');
    expect(state.confidence).toBe(1.0);
    expect(state.typingSpeed).toBe(0);
    expect(state.isCameraActive).toBe(false);
    expect(state.isMicActive).toBe(false);
    expect(state.error).toBeNull();
  });

  test('should update emotion and confidence scores', () => {
    const store = useEmotionStore.getState();
    store.setEmotion('joy', 0.85);

    const updatedState = useEmotionStore.getState();
    expect(updatedState.emotion).toBe('joy');
    expect(updatedState.confidence).toBe(0.85);
  });

  test('should update typing speed metrics', () => {
    const store = useEmotionStore.getState();
    store.setTypingSpeed(12.5);

    const updatedState = useEmotionStore.getState();
    expect(updatedState.typingSpeed).toBe(12.5);
  });

  test('should update camera and microphone status links', () => {
    const store = useEmotionStore.getState();
    store.setCameraActive(true);
    store.setMicActive(true);

    const updatedState = useEmotionStore.getState();
    expect(updatedState.isCameraActive).toBe(true);
    expect(updatedState.isMicActive).toBe(true);
  });

  test('should set error messages correctly', () => {
    const store = useEmotionStore.getState();
    store.setError("Optic permissions denied");

    const updatedState = useEmotionStore.getState();
    expect(updatedState.error).toBe("Optic permissions denied");
  });
});
