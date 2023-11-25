import { getPostList } from '@/api/post';
import Link from 'next/link';
import styles from './page.module.scss';

export default async function Page(){
    const posts = await getPostList();

    return (
        <div className={styles.board}>
            <h1>Posts</h1>
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
    )
}