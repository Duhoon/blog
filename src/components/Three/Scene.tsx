"use client";

import { HemisphereLight, Mesh } from "three";
import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  MeshReflectorMaterial,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";

interface WallProps {
  position: [number, number, number];
  rotation: [number, number, number];
}

function Wall(props: WallProps) {
  const ref = useRef<Mesh>(null);

  return (
    <mesh position={props.position} rotation={props.rotation} ref={ref}>
      <boxGeometry args={[50, 50, 0.1]} />
      <MeshReflectorMaterial resolution={2048} mirror={4} color={"white"} />
    </mesh>
  );
}

function Light() {
  const hemisphereLightRef = useRef<HemisphereLight>(null!);
  // useHelper(hemisphereLightRef, HemisphereLightHelper, 4, 'red');

  return (
    <hemisphereLight
      color={"#ffffff"}
      intensity={1}
      position={[0, 1, 0]}
      ref={hemisphereLightRef}
    />
  );
}

function DirectionLight() {
  return <directionalLight intensity={1} position={[0, 2, 0]} castShadow />;
}

export function Scene() {
  return (
    <Canvas shadows={true}>
      <PerspectiveCamera
        makeDefault
        position={[0, 10, 10]}
        rotation={[Math.PI / 4, 0, 0]}
      />
      <OrbitControls
        maxDistance={25}
        minDistance={5}
        maxPolarAngle={Math.PI / 2}
      />
      <Light />
      <DirectionLight />

      {/* <Floor /> */}

      {/* <Mable position={[0, 1, 0]} /> */}

      <Wall position={[0, 0, 25]} rotation={[0, Math.PI, 0]} />
      <Wall position={[0, 0, -25]} rotation={[0, Math.PI * 2, 0]} />
      <Wall position={[25, 0, 0]} rotation={[0, Math.PI / 2 + Math.PI, 0]} />
      <Wall
        position={[-25, 0, 0]}
        rotation={[0, Math.PI / 2 + 2 * Math.PI, 0]}
      />
    </Canvas>
  );
}
