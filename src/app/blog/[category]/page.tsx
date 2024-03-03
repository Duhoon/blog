import Link from 'next/link';
import { getPostListFromCloud } from '@/api/post';
import dayjs from 'dayjs';

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
            {
                posts.length > 0 ? posts.map(post=>(
                    <li key={post.slug}>
                        <Link href={`/post/${params.category}/${post.slug}`}>
                            <h2>{post.title}</h2>
                            <p>{dayjs(post.published).format('MMMM DD, YYYY')}</p>
                        </Link>
                    </li>
                )) : <li style={{textAlign: 'center'}}><a>There is no post</a></li>
            }
        </ul>
    )
}