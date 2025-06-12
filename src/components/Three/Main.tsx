"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

function DarkRoom() {
  return (
    <group>
      <mesh>
        <boxGeometry args={[10, 10, 10]} />
        <meshStandardMaterial color="black" side={2} />
      </mesh>

      <ambientLight intensity={1} />

      <mesh position={[0, -3, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="white" roughness={0.3} metalness={0.8} />
      </mesh>

      <pointLight
        position={[0, -2, 2]}
        intensity={0.5}
        distance={5}
        decay={2}
        color="#aaaaaa"
      />
    </group>
  );
}

export default function Main() {
  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
      <DarkRoom />
      <OrbitControls enablePan={false} />
    </Canvas>
  );
}
