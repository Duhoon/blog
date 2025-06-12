"use client";

import { useEffect, useState } from "react";

export function useWindowSize() {
  const [width, setWidth] = useState<number>(Number.MIN_SAFE_INTEGER);
  const [height, setHeight] = useState<number>(Number.MIN_SAFE_INTEGER);

  useEffect(() => {
    if (window) {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);

      window.addEventListener("resize", () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
      });
    }
  }, []);

  return { width, height };
}
