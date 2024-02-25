import { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import { getPostDetailedFromCloud } from '@/api/post';
import 'highlight.js/styles/github-dark.css'
import styles from './page.module.scss';
import { NavigationWithSide } from '@/components/Navigation';
import { storage } from '@/config/firebase';
import { ref, listAll } from 'firebase/storage';

export const dynamicParams = false;

export async function generateStaticParams(){
    const directoryRef = ref(storage, 'posts');
    const postList = await listAll(directoryRef);
    return postList.items.map(post=>({ 
        slug: post.name.replace(/\.md/,'')
    }));
}

type Props = {
    params: {
        slug: string,
        
    },
    searchParams: { [key: string]: string | string[] | undefined },
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata>{
    const slug = params.slug;

    return {
        title: slug
    }
};

export default async function Page({ params } : Props){
    const {title, published, content} = await getPostDetailedFromCloud(params.slug);

    return (
        <>
            <NavigationWithSide/>
            <div>
                <article className={styles.article}>
                    <div>
                        <Link href="/board">Go to Board</Link>
                    </div>
                    <div className={styles.post}>
                        <h1>{title}</h1>
                        <p>{published.toLocaleString()}</p>
                        <div dangerouslySetInnerHTML={{__html: content}}></div>
                    </div>
                </article>
            </div>
        </>
    )
}