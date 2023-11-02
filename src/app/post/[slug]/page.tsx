`use server`;
import fs from 'fs';

export const dynamicParams = false;

export async function generateStaticParams(){
    const postDirectory = fs.readdirSync('src/post');
    return postDirectory.map(file=>({ 
        slug: file.replace(/\.md/,'') 
    }));
    // return [{slug: 'dummydata-to-this'}, {slug: 'record-for-build-blog'}];
}

export default function Page({ params } : {params: {slug: string}}){
    return <div>Post Slug: {params.slug}</div>
}