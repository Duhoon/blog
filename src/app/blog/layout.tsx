import { NavigationWithSide } from "@/components/Navigation";
import { ReactNode } from "react";
import styles from './layout.module.scss';

interface BlogLayoutProps {
    children: ReactNode;
}

export default function BlogLayout ({children} : BlogLayoutProps){
    return (
        <>
            <NavigationWithSide/>
            <div className={styles.board}>
                {children}
            </div>
        </>
    )
}