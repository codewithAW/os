// @ts-nocheck
import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { Mesh } from 'three';

function PipelineBlock({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[1.8, 0.4, 0.9]} />
      <meshStandardMaterial color={color} metalness={0.2} roughness={0.35} />
    </mesh>
  );
}

function PipelineGroup() {
  const groupRef = useRef<Mesh>(null);
  const colors = useMemo(() => ['#22d3ee', '#8b5cf6', '#f472b6'], []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.position.x = Math.sin(clock.elapsedTime * 0.8) * 0.8;
  });

  return (
    <group ref={groupRef}>
      {colors.map((color, index) => (
        <PipelineBlock key={color} position={[-2 + index * 2, 0, 0]} color={color} />
      ))}
    </group>
  );
}

export default function PipelineScene() {
  return (
    <div className="h-48 md:h-64 lg:h-[300px] w-full overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/80">
      <Canvas camera={{ position: [0, 3, 10], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[0, 5, 5]} intensity={0.8} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.65, 0]}>
          <planeGeometry args={[12, 10]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        <PipelineGroup />
      </Canvas>
    </div>
  );
}
