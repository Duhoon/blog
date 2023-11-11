import fs from 'fs';
import { getPostDetailed } from '../../../api/post';

export const dynamicParams = false;

export async function generateStaticParams(){
    const postDirectory = fs.readdirSync('src/post');
    return postDirectory.map(file=>({ 
        slug: file.replace(/\.md/,'')
    }));
}

export default async function Page({ params } : {params: {slug: string}}){
    const {title, published, content} = await getPostDetailed(params.slug);

    return (
        <div>
            Post Slug: {params.slug}
            <h1>{title}</h1>
            <p>{published.toLocaleString()}</p>
            <div dangerouslySetInnerHTML={{__html: content}}></div>
        </div>
    )
}