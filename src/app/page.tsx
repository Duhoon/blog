"use client";

import styles from "./page.module.scss";
import { Navigation } from "@/components/Navigation";
import Loading from "@/components/Three/Loading";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const RainyDay = dynamic(() => import("@/components/Three/RainyDay"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Navigation />
      <main className={styles.mainWrapper}>
        <Suspense fallback={<Loading />}>
          <RainyDay />
        </Suspense>
      </main>
    </>
  );
}
