import { getPostListFromCloud } from '@/api/post';
import Link from 'next/link';
import dayjs from 'dayjs';

export default async function Page(){
    const posts = await getPostListFromCloud('development');

    return (
        <ul>
            {
                posts.length > 0 ? posts.map(post=>(
                    <li key={post.slug}>
                        <Link href={`/post/development/${post.slug}`}>
                            <h2>{post.title}</h2>
                            <p>{dayjs(post.published).format('MMMM DD, YYYY')}</p>
                        </Link>
                    </li>
                )) : <li style={{textAlign: 'center'}}><a>There is no post</a></li>
            }
        </ul>
    )
}