import fs from 'fs';
import { getPostDetailed } from '../../../api/post';

export const dynamicParams = false;

export async function generateStaticParams(){
    const postDirectory = fs.readdirSync('src/post');
    console.log(postDirectory);
    return postDirectory.map(file=>({ 
        slug: file.replace(/\.md/,'')
    }));
}

export default async function Page({ params } : {params: {slug: string}}){
    const staticPostData = await getPostDetailed(params.slug);

    return (
        <div>
            Post Slug: {params.slug}
            Post Title: {staticPostData.toString()}
        </div>
    )
}