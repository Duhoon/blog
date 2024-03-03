import { getPostListFromCloud } from '@/api/post';
import Link from 'next/link';
import styles from './layout.module.scss';

export default async function Page(){
    const posts = await getPostListFromCloud('development');

    return (
        <div className={styles.board}>
            <ul>
                {posts.map(post=>(
                    <li key={post.slug}>
                        <Link href={`/post/development/${post.slug}`}>
                            <h2>{post.title}</h2>
                            <p>{post.published.toLocaleString()}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}