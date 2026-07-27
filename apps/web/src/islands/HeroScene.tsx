import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { useRef } from 'react';
import type { Mesh } from 'three';
import { heroSceneConfig } from '../lib/motion/heroConfig';

function EnergyForm() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * heroSceneConfig.rotationSpeed;
    meshRef.current.rotation.y += delta * heroSceneConfig.rotationSpeed * 1.4;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={heroSceneConfig.icosahedronArgs} />
        <meshStandardMaterial
          color={heroSceneConfig.goldColor}
          metalness={0.6}
          roughness={0.25}
          wireframe
        />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: heroSceneConfig.cameraPosition, fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 4]} intensity={80} color={heroSceneConfig.goldColor} />
      <pointLight position={[-4, -2, -4]} intensity={40} color={heroSceneConfig.emberColor} />
      <EnergyForm />
    </Canvas>
  );
}
