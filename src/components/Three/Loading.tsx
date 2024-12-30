"use client";

import { useProgress } from "@react-three/drei";
import style from "./Loading.module.scss";

export default function Loading() {
  const { progress } = useProgress();

  return (
    <div className={style.loadingWrapper}>
      <p>Loading...</p>
      <div className={style.progress}>
        <div
          className={style.progressBar}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
