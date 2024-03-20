import { Metadata } from 'next';
import Link from 'next/link';
import { getPostDetailedFromCloud } from '@/api/post';
import 'highlight.js/styles/github-dark.css'
import styles from './page.module.scss';
import { storage } from '@/config/firebase';
import { ref, listAll, } from 'firebase/storage';
import Sidenav from '@/components/Sidenav';
import dayjs from 'dayjs';

export const dynamicParams = false;

export async function generateStaticParams(){
    const dirRef = ref(storage, 'posts');
    const listSubDirRef = await listAll(dirRef).then((res) => res.prefixes);
    
    const result: Params[] = [];
    for (const subDirRef of listSubDirRef) {
        const namesPost = await listAll(subDirRef)
            .then(
                (res) => res.items.map((item) => (
                    {
                        category: subDirRef.name,
                        slug: item.name.replace('.md', '')
                    }
                ))
            );
        result.push(...namesPost);
    }
    
    return result;
}

type Params = {
    category: string,
    slug: string,
}
type Props = {
    params: Params
    searchParams: { [key: string]: string | string[] | undefined },
}

export async function generateMetadata({params}: Props): Promise<Metadata>{
    const { title } = await getPostDetailedFromCloud(params.category, params.slug);

    return {
        title,
        publisher: '412ock',
    }
};

export default async function Page({ params } : Props){
    const {title, published, content} = await getPostDetailedFromCloud(params.category, params.slug);

    return (
        <>
            <Sidenav/>
            <div>
                <article className={styles.article} id={'article'}>
                    <div>
                        <Link href="/board">Go to Board</Link>
                    </div>
                    <div className={styles.post}>
                        <h1>{title}</h1>
                        <p>{dayjs(published).format('MMMM DD, YYYY')}</p>
                        <div dangerouslySetInnerHTML={{__html: content}}></div>
                    </div>
                </article>
            </div>
        </>
    )
}