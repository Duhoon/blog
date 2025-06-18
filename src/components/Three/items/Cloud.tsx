"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Mesh, Texture } from "three";

interface CloudProps {
  position: [number, number, number];
  rotation: [number, number, number];
  texture: Texture;
}

export function Clouds({ texture }: { texture: Texture }) {
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
    <>
      {clouds.map(({ key, position, rotation }) => (
        <Cloud
          key={key}
          position={position}
          rotation={rotation}
          texture={texture}
        />
      ))}
    </>
  );
}

export function Cloud({ position, rotation, texture }: CloudProps) {
  const ref = useRef<Mesh>(null);
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.z -= 0.0008;
    }
  });

  return (
    <mesh
      position={position}
      rotation={rotation}
      ref={ref}
      receiveShadow
      castShadow
    >
      <planeGeometry args={[500, 500]} />
      <meshLambertMaterial map={texture} opacity={0.6} transparent />
    </mesh>
  );
}
