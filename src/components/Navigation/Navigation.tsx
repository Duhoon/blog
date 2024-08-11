'use client';

import { useRef } from "react";
import Link from "next/link";
import styles from './navigation.module.scss';
import { HamburgerButton } from "../Button";
import Sidenav from "../Sidenav";

export function Navigation(){
    const sidenavWrapperRef = useRef<HTMLDivElement>(null);
    const sidenavRef = useRef<HTMLUListElement>(null);

    const toggleOpen = (e: React.MouseEvent<HTMLElement>) => {
        sidenavWrapperRef.current?.classList.toggle('sidenav-wrapper-open');
        sidenavRef.current?.classList.toggle('sidenav-open');
    }

    return (
        <>
            <nav className={styles.navigation}>
                <div className={styles.wrapper}>
                    <h1><Link href='/'>ALROCK</Link></h1>
                    <HamburgerButton onClick={toggleOpen}/>
                </div>
            </nav>
            <Sidenav wrapperRef={sidenavWrapperRef} sidenavRef={sidenavRef}/>
        </>
    )
}