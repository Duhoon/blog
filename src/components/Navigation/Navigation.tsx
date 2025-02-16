"use client";

import { useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import styles from "./navigation.module.scss";
import { HamburgerButton } from "../commons/Button";
import Sidenav from "../Sidenav";
import LanguageButton from "../commons/Button/LanguageButton";

export function Navigation() {
  const sidenavWrapperRef = useRef<HTMLDivElement>(null);
  const sidenavRef = useRef<HTMLUListElement>(null);
  const params = useParams();

  const toggleOpen = () => {
    sidenavWrapperRef.current?.classList.toggle("sidenav-wrapper-open");
  };

  return (
    <>
      <nav className={styles.navigation}>
        <div className={styles.wrapper}>
          <h1>
            <Link href="/">ALROCK</Link>
          </h1>
          <div className={styles["button-wrapper"]}>
            {params.lang ? (
              <LanguageButton lang={params.lang as string} />
            ) : (
              <></>
            )}
            <HamburgerButton onClick={toggleOpen} />
          </div>
        </div>
      </nav>
      <Sidenav
        wrapperRef={sidenavWrapperRef}
        sidenavRef={sidenavRef}
        lang={params.lang as string}
      />
    </>
  );
}
