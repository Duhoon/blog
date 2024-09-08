import { getPostListFromCloud } from '@/api/post';
import Link from 'next/link';
import dayjs from 'dayjs';
import Image from 'next/image';
import styles from './layout.module.scss';

export default async function Page(){
    const posts = await getPostListFromCloud('development');

    return (
        <ul>
            {
                posts.length > 0 ? posts.map(post=>(
                    <li key={post.slug}>
                        <Link href={`/post/development/${post.slug}`}>
                            {post.thumbnail? <div><Image src={post.thumbnail} alt={`${post.title} thumbnail`} layout={'fill'} width={200}></Image></div> 
                            : <div></div>}
                            <div className={styles[`board-item-info`]}>
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