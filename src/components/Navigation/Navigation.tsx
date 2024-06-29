import Link from "next/link";
import styles from './navigation.module.scss';

export function Navigation(){
    return (
        <nav className={styles.navigation}>
            <div className={styles.wrapper}>
                <h1><Link href='/'>ALROCK</Link></h1>
                <ul>
                    <li><Link href='/about'>ABOUT</Link></li>
                    <li><Link href='/blog'>BLOG</Link></li>
                </ul>
            </div>
        </nav>
    )
}