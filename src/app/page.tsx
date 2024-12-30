import Image from "next/image";
import styles from "./page.module.scss";
import Scene from "@/components/Three";
import { Navigation } from "@/components/Navigation";
import { Suspense } from "react";
import Loading from "@/components/Three/Loading";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className={styles.mainWrapper}>
        <Suspense fallback={<Loading />}>
          <Scene />
        </Suspense>
      </main>
    </>
  );
}
