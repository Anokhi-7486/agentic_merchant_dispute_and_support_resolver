import { useEffect, useRef, useCallback } from 'react';
import { useEmotionStore } from '../store/emotionStore';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const useEmotionCapture = () => {
  const { setCameraActive, setMicActive, setError, setTypingSpeed } = useEmotionStore();
  const keystrokeCount = useRef(0);
  const lastKeystrokeTime = useRef(Date.now());
  const videoRef = useRef(null);
  const captureIntervalRef = useRef(null);

  // Setup Keystroke listener (Browser-only)
  useEffect(() => {
    const handleKeyDown = () => {
      keystrokeCount.current += 1;
      const now = Date.now();
      const delta = now - lastKeystrokeTime.current;
      
      // Calculate typing speed (chars per second or similar)
      if (delta > 0) {
        const speed = 1000 / delta;
        setTypingSpeed(speed);
      }
      lastKeystrokeTime.current = now;
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setTypingSpeed]);

  // Handle Permissions and start real-time frame post loop
  const requestPermissions = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 320, height: 240, frameRate: { max: 10 } }, 
        audio: true 
      });
      
      setCameraActive(true);
      setMicActive(true);
      setError(null);

      // Create a hidden video element to hold the webcam stream
      const video = document.createElement('video');
      video.srcObject = stream;
      video.muted = true;
      video.setAttribute('playsinline', '');
      video.play().catch(err => console.error("Webcam video play error:", err));
      videoRef.current = video;

      // Canvas helper to capture image frames
      const canvas = document.createElement('canvas');
      canvas.width = 320;
      canvas.height = 240;
      const ctx = canvas.getContext('2d');

      // Frame post loop running at 2 FPS (500ms intervals) to reduce CPU overhead
      captureIntervalRef.current = setInterval(async () => {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
          ctx.drawImage(video, 0, 0, 320, 240);
          const base64Image = canvas.toDataURL('image/jpeg', 0.6); // Compress to 60% quality to save bandwidth

          try {
            const response = await axios.post(`${API_URL}/analyze-frame`, {
              image: base64Image
            });

            if (response.data && response.data.status === 'success') {
              const { emotion, confidence } = response.data;
              useEmotionStore.getState().setEmotion(emotion, confidence);
            }
          } catch (apiErr) {
            console.warn("Frame analysis transmission failed:", apiErr.message);
          }
        }
      }, 500);

      return stream;
    } catch (err) {
      console.error("Webcam/Mic permission denied or unavailable:", err);
      setError("Optic/Audio Link offline. Operating in simulation mode + keystroke tracking.");
      setCameraActive(false);
      setMicActive(false);
      return null;
    }
  }, [setCameraActive, setMicActive, setError]);

  // Cleanup capturing loop and media tracks on unmount
  useEffect(() => {
    return () => {
      if (captureIntervalRef.current) {
        clearInterval(captureIntervalRef.current);
      }
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return { requestPermissions };
};
