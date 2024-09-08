import Link from 'next/link';
import { getPostListFromCloud } from '@/api/post';
import dayjs from 'dayjs';
import Image from 'next/image';
import styles from '../layout.module.scss';

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
                            {post.thumbnail? <div className={styles['board-item-thumbnail']}><Image src={post.thumbnail} alt={`${post.title} thumbnail`} width={200} height={300}></Image></div>
                            : <></>}
                            <div className={styles['board-item-info']}>
                                <h2>{post.title}</h2>
                                <p>{dayjs(post.published).format('MMMM DD, YYYY')}</p>
                            </div>
                        </Link>
                    </li>
                )) : <li style={{textAlign: 'center'}}><a>There is no post</a></li>
            }
        </ul>
    )
}