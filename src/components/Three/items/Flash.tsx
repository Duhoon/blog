"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { PointLight } from "three";

export function Flash() {
  const ref = useRef<PointLight>(null);

  useFrame(() => {
    if (!ref.current) {
      return;
    }
    if (Math.random() > 0.93 || ref.current.power > 12000) {
      if (ref.current.power < 10000) {
        ref.current.position.set(
          Math.random() * 800 - 400,
          Math.random() * 500,
          100,
        );
      }
      ref.current.power = 7000 + Math.random() * 30000;
    }
  });

  return (
    <pointLight
      castShadow
      color={0x062d89}
      power={3000}
      distance={400}
      decay={0.7}
      position={[0, 200, 100]}
      ref={ref}
    />
  );
}
