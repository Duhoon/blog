"use client";

import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import {
  AudioListener,
  AudioLoader,
  Audio,
  BufferAttribute,
  BufferGeometry,
  Points,
} from "three";

const rainCount = 15000;

export function Raindrop() {
  const { camera } = useThree();
  const ref = useRef<Points>();

  const rainSoundBuffer = useLoader(
    AudioLoader,
    "/assets/sound/Rain_Light_Sound_Effect.mp3",
  );

  const geometry = new BufferGeometry();
  const vertices = useMemo(() => {
    return new Float32Array(
      Array(rainCount)
        .fill(0)
        .reduce((pre) => {
          pre.push(
            Math.random() * 400 - 200,
            Math.random() * 500 - 250,
            Math.random() * 400 - 200,
          );
          return pre;
        }, []),
    );
  }, []);

  geometry.setAttribute("position", new BufferAttribute(vertices, 3));

  useEffect(() => {
    const listener = new AudioListener();
    camera.add(listener);
    const audio = new Audio(listener);

    document.body.addEventListener("click", () => {
      audio.setBuffer(rainSoundBuffer);
      audio.setLoop(true);
      audio.setVolume(1);
      audio.play();
    });

    return () => {
      audio.stop();
      camera.remove(listener);
    };
  }, [camera, rainSoundBuffer]);

  useFrame(() => {
    const pos = geometry.attributes.position as BufferAttribute;
    for (let i = 0; i < rainCount; i++) {
      const yIndex = i * 3 + 1;
      pos.array[yIndex] -= 2; // 떨어지는 속도

      if (pos.array[yIndex] < -250) {
        pos.array[yIndex] = 250; // 아래로 내려가면 위로 reset
      }
    }
    pos.needsUpdate = true; // 업데이트 반영
  });

  return (
    <points geometry={geometry} ref={ref}>
      <pointsMaterial color={0xaaaaaa} size={0.1} transparent={true} />
    </points>
  );
}
