import Sidenav from "@/components/Sidenav";
import { ReactNode } from "react";
import styles from './layout.module.scss';

interface BlogLayoutProps {
    children: ReactNode;
}

export default function BlogLayout ({children} : BlogLayoutProps){
    return (
        <>
            <main className={styles.board}>
                {children}
            </main>
        </>
    )
}