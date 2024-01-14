import { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import fs from 'fs';
import { getPostDetailed } from '@/api/post';
import 'highlight.js/styles/github-dark.css'
import styles from './page.module.scss';

export const dynamicParams = false;

export async function generateStaticParams(){
    const postDirectory = fs.readdirSync('src/post');
    return postDirectory.map(file=>({ 
        slug: file.replace(/\.md/,'')
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
    const {title, published, content} = await getPostDetailed(params.slug);

    return (
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
    )
}