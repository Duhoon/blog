"use client";

import { Canvas, useLoader } from "@react-three/fiber";
import { useWindowSize } from "@/hooks/useWindowSize";
import { Clouds } from "./items/Cloud";
import { PerspectiveCamera } from "@react-three/drei";
import { Flash } from "./items/Flash";
import { Raindrop } from "./items/Raindrop";
import { memo } from "react";
import { TextureLoader } from "three";

export default memo(function RainyDay() {
  const { width, height } = useWindowSize();
  const cloudTexture = useLoader(TextureLoader, "/assets/texture/Smoke.png");

  return (
    <Canvas
      /** */
      style={{ background: "black" }}
      shadows
    >
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 1]}
        rotation={[1.16, -0.12, 0.27]}
        fov={60}
        aspect={width / height}
        near={1}
        far={3000}
      />
      <Flash />
      <ambientLight color={0x555555} />
      <directionalLight color={0xffeedd} position={[0, 0, 1]} />
      <Clouds texture={cloudTexture} />
      <Raindrop />
    </Canvas>
  );
});
