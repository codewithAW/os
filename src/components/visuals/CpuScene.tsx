// @ts-nocheck
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh } from 'three';

function CpuModel() {
  const ref = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.18;
    ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.7) * 0.08;
  });

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <boxGeometry args={[3.6, 0.6, 3.6]} />
      <meshStandardMaterial color="#22d3ee" metalness={0.4} roughness={0.12} />
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[3, 0.12, 3]} />
        <meshStandardMaterial color="#1e40af" emissive="#0ea5e9" emissiveIntensity={0.35} />
      </mesh>
      <mesh position={[-1.2, -0.1, -1.1]}>
        <boxGeometry args={[0.9, 0.18, 0.9]} />
        <meshStandardMaterial color="#38bdf8" />
      </mesh>
      <mesh position={[1.1, -0.1, 1.1]}>
        <boxGeometry args={[0.9, 0.18, 0.9]} />
        <meshStandardMaterial color="#38bdf8" />
      </mesh>
    </mesh>
  );
}

export default function CpuScene() {
  return (
    <div className="h-64 md:h-80 lg:h-[420px] w-full overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/80">
      <Canvas camera={{ position: [0, 1.8, 8], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <CpuModel />
      </Canvas>
    </div>
  );
}
