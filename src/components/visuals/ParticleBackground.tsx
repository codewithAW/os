// @ts-nocheck
import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const array = new Float32Array(500 * 3);
    for (let i = 0; i < array.length; i += 3) {
      array[i] = (Math.random() - 0.5) * 20;
      array[i + 1] = (Math.random() - 0.5) * 20;
      array[i + 2] = (Math.random() - 0.5) * 20;
    }
    return array;
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = clock.elapsedTime * 0.04;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} itemSize={3} count={positions.length / 3} />
      </bufferGeometry>
      <pointsMaterial color="#60a5fa" size={0.12} sizeAttenuation />
    </points>
  );
}

export default function ParticleBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 opacity-80">
      <Canvas camera={{ position: [0, 0, 15], fov: 55 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.7} />
        <ParticleField />
      </Canvas>
    </div>
  );
}
