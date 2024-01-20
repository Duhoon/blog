import { getPostListFromLocal, getPostListFromCloud } from '@/api/post';
import Link from 'next/link';
import styles from './page.module.scss';

export default async function Page(){
    // const posts = await getPostListFromLocal();
    const posts = await getPostListFromCloud();

    return (
        <div className={styles.board}>
            <ul>
                {posts.map(post=>(
                    <li key={post.slug}>
                        <Link href={`/post/${post.slug}`}>
                            <h2>{post.slug}</h2>
                            <p>{post.published.toLocaleString()}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}