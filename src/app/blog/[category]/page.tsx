import Link from 'next/link';
import { getPostListFromCloud } from '@/api/post';

type Props =  {
    params: {
        category: 'book' | 'movie' | 'development',
    },
    searchParams: { [key: string]: string | string[] | undefined },
}

export async function generateStaticParams(){
    return ['book', 'movie', 'development'];
}



export default async function Page(
    {params}: Props
){
    const posts = await getPostListFromCloud(params.category);
    
    return (
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
    )
}