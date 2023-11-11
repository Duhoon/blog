import { getPostList } from '@/api/post';
import Link from 'next/link';

export default async function Page(){
    const posts = await getPostList();

    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {posts.map(post=>(
                    <li key={post.slug}>
                        <Link href={`/post/${post.slug}`}>
                            <h1>{post.title}</h1>
                            <p>{post.published.toLocaleString()}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}