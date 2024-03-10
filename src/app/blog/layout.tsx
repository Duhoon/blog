import Sidenav from "@/components/Sidenav";
import { ReactNode } from "react";
import styles from './layout.module.scss';

interface BlogLayoutProps {
    children: ReactNode;
}

export default function BlogLayout ({children} : BlogLayoutProps){
    return (
        <>
            <Sidenav/>
            <div className={styles.board}>
                {children}
            </div>
        </>
    )
}