"use client";
import { RecordData } from "@/types/about.type";
import { useState, useEffect, useRef } from "react";
import "./history.scss";

import Record from "./Record";
import Timeline from "./Timeline";

export interface HistoryProps {
  history: RecordData[];
}

/** History Component in About */
export default function History({ history }: HistoryProps) {
  const recordsRef = useRef<HTMLDivElement>(null);
  const [deviceHeight, setDeviceHeight] = useState<number>(0);
  const [cur, setCur] = useState(0);
  const [lastScroll, setLastScroll] = useState(0);

  const throttle = (
    callback: (event: React.SyntheticEvent) => void,
    delay: number,
  ) => {
    let timer: number = 0;

    return (event: React.SyntheticEvent) => {
      if (timer) return;
      timer = window.setTimeout(() => {
        callback(event);
        timer = 0;
      }, delay);
    };
  };

  const historyScrollHandler = () => {
    if (window && recordsRef && recordsRef.current) {
      const currentScroll = recordsRef.current.scrollTop;
      const historyHeight = recordsRef.current.clientHeight;
      const targetIndex = Math.floor(currentScroll / historyHeight);

      let scrollTo: number = 0;
      let current: number = 0;

      if (
        lastScroll === currentScroll ||
        currentScroll === 0 ||
        currentScroll % historyHeight === 0
      ) {
        setCur(targetIndex);
        return;
      }

      if (targetIndex < cur) {
        // up
        current = Math.max(0, Math.min(history.length - 1, cur - 1));
        scrollTo = Math.min(
          (history.length - 1) * historyHeight,
          historyHeight * current,
        );
      }

      if (targetIndex >= cur) {
        // lastScroll < currentScroll down
        current = Math.min(history.length - 1, Math.max(0, cur + 1));
        scrollTo = Math.max(0, historyHeight * current);
      }

      recordsRef.current.scrollTo({
        top: scrollTo,
        behavior: "smooth",
      });

      setLastScroll(scrollTo);
      setCur(current);
    }
  };

  useEffect(() => {
    if (window && recordsRef && recordsRef.current) {
      setDeviceHeight(window.innerHeight);
      setLastScroll(recordsRef.current.scrollTop);

      window.addEventListener("resize", () => {
        setDeviceHeight(window.innerHeight);
      });
    }
  }, []);

  return (
    <div className="history" style={{ height: deviceHeight - 60 }}>
      <div
        className="record"
        ref={recordsRef}
        onScroll={throttle(historyScrollHandler, 1000)}
      >
        {deviceHeight
          ? history.map((record, index) => (
              <Record record={record} key={index} />
            ))
          : null}
      </div>
      {deviceHeight ? <Timeline history={history} cursor={cur} /> : null}
    </div>
  );
}
