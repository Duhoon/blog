"use client";

import { Canvas, useLoader } from "@react-three/fiber";
import { useWindowSize } from "@/hooks/useWindowSize";
import { Cloud } from "./items/Cloud";
import { useMemo } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import { TextureLoader } from "three";
import { Flash } from "./items/Flash";

export function Raindrop() {
  const { width, height } = useWindowSize();
  const cloudTexture = useLoader(TextureLoader, "./assets/texture/Smoke.png");

  const clouds = useMemo(
    () =>
      [...Array(25)].map((_, idx) => ({
        key: idx,
        position: [
          Math.random() * 800 - 400,
          500,
          Math.random() * 500 - 450,
        ] as [number, number, number],
        rotation: [1.16, -0.12, Math.random() * 360] as [
          number,
          number,
          number,
        ],
      })),
    [],
  );

  return (
    <Canvas style={{ background: "black" }}>
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 1]}
        rotation={[1.16, -0.12, 0.27]}
        fov={60}
        aspect={width / height}
        near={1}
        far={1000}
      />
      <ambientLight color={0x555555} />
      <directionalLight color={0xffeedd} position={[0, 0, 1]} />
      {clouds.map(({ key, position, rotation }) => (
        <Cloud
          key={key}
          position={position}
          rotation={rotation}
          texture={cloudTexture}
        />
      ))}
      <Flash />
    </Canvas>
  );
}
