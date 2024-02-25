import { getPostListFromLocal, getPostListFromCloud } from '@/api/post';
import Link from 'next/link';
import styles from './page.module.scss';
import Sidenav from '@/components/Sidenav';
import { NavigationWithSide } from '@/components/Navigation';

export default async function Page(){
    // const posts = await getPostListFromLocal();
    const posts = await getPostListFromCloud();

    return (
        <>
            <NavigationWithSide/>
            <div className={styles.board}>
                <ul>
                    {posts.map(post=>(
                        <li key={post.slug}>
                            <Link href={`/post/${post.slug}`}>
                                <h2>{post.title}</h2>
                                <p>{post.published.toLocaleString()}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}