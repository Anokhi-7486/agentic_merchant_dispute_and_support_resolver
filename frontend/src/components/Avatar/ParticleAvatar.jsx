import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useEmotionStore } from '../../store/emotionStore';

const Particles = () => {
  const pointsRef = useRef();
  const emotion = useEmotionStore((state) => state.emotion);
  const confidence = useEmotionStore((state) => state.confidence);

  const positions = useMemo(() => {
    const pos = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  const color = useMemo(() => {
    switch (emotion) {
      case 'joy': return '#ffdd00';
      case 'sadness': return '#00aaff';
      case 'anger': return '#ff4400';
      case 'fear': return '#8800ff';
      default: return '#00d4ff';
    }
  }, [emotion]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const speed = 0.1 + confidence * 0.5;

    pointsRef.current.rotation.y = time * speed;
    pointsRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;
    
    const scale = 1 + Math.sin(time * 2) * (confidence * 0.2);
    pointsRef.current.scale.set(scale, scale, scale);
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={0.07}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const Stars = () => {
  const starsRef = useRef();
  const starPositions = useMemo(() => {
    const pos = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    return pos;
  }, []);

  useFrame(() => {
    starsRef.current.rotation.y += 0.0003;
  });

  return (
    <Points ref={starsRef} positions={starPositions} stride={3}>
      <PointMaterial transparent color="#ffffff" size={0.02} sizeAttenuation={true} depthWrite={false} />
    </Points>
  );
};

const ParticleAvatar = () => {
  return (
    <div style={{ width: '100%', height: '100%', background: '#000' }}>
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <Stars />
        <Particles />
      </Canvas>
    </div>
  );
};

export default ParticleAvatar;
