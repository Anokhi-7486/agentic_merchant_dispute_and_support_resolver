import React from 'react';
import { useEmotionStore } from '../../store/emotionStore';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const carLogos = {
  joy: '/assets/ferrari_front_ui_1780327645625.png',
  sadness: '/assets/lamborghini_front_ui_1780327880815.png',
  anger: '/assets/porsche_front_ui_1780327914299.png',
  fear: '/assets/ferrari_front_ui_1780327645625.png',
  neutral: '/assets/porsche_front_ui_1780327914299.png'
};

const CarKey = ({ emotion }) => {
  const currentEmotion = useEmotionStore((state) => state.emotion);
  const setEmotion = useEmotionStore((state) => state.setEmotion);

  const handleClick = async () => {
    // 1. Update the local Zustand store immediately for instant UI response
    setEmotion(emotion, 0.85);

    // 2. Notify the backend API to log this telemetry
    try {
      await axios.post(`${API_URL}/analyze-emotion`, {
        emotion: emotion,
        confidence: 0.85,
        metadata: { source: 'simulation_key' }
      });
    } catch (err) {
      console.warn("Could not sync simulated emotion with backend:", err.message);
    }
  };

  return (
    <div 
      className={`car-key ${currentEmotion === emotion ? 'active' : ''}`}
      onClick={handleClick}
    >
      <div className="car-image-container">
        <img src={carLogos[emotion]} alt={emotion} />
      </div>
      <span>{emotion}</span>
    </div>
  );
};

export default CarKey;
