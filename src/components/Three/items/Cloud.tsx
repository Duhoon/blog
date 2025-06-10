"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh, Texture } from "three";

interface CloudProps {
  position: [number, number, number];
  rotation: [number, number, number];
  texture: Texture;
}

export function Cloud({ position, rotation, texture }: CloudProps) {
  const ref = useRef<Mesh>(null);
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.z -= 0.002;
    }
  });

  return (
    <mesh position={position} rotation={rotation} ref={ref}>
      <planeGeometry args={[500, 500]} />
      <meshLambertMaterial map={texture} opacity={0.6} transparent />
    </mesh>
  );
}
