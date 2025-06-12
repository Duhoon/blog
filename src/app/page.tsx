"use client";

import styles from "./page.module.scss";
import { Navigation } from "@/components/Navigation";
import Loading from "@/components/Three/Loading";
import { RainyDay } from "@/components/Three/RainyDay";
import { Suspense } from "react";

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
