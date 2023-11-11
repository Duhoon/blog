---
layout: post
published: 11 Nomember 2023
title: How to covert markdown into html
---

# Background

I want to display my posts in my blog. And the posts will be writed in markdown like this, because markdown is very well-used by many programmers. At least me, it is very simple to use. So I had to find how to covert markdown into html.

It seems that many people use `unified` library to do this. Also, the example is showing in Nextjs Document. So I decided to use `unified`.

`unified` have many plugin for customizing by user's needs. To process markdown, You should use `rehype` and `remark`. In my understanding, `rehype` is changing something into html. And `remark` is changing something into markdown.

You can see the code I implement with libraries below.

```js
export async function getPostDetailed(filename: string){
    const postFile = fs.readFileSync(`src/post/${filename}.md`, 'utf-8');

    const post2html = await unified()
        .use(remarkParse)
        .use(remarkFrontmatter, ['yaml'])
        .use(remarkParseFrontmatter)
        .use(remarkRehype)
        .use(rehypeStringify)
        .process(postFile);

    console.dir(post2html);

    const metadata = post2html.data.frontmatter as any;

    return {
        title: metadata.title,
        published: metadata.published,
        content: post2html.value.toString()
    };
}
```

# Frontmatter

It is all of code about markdown to html. But you can see more libraries I noticed like `remarkeParse`, `rehypeStringify`, `remarkFrontmatter` etc. In those of things, I want to talk about `remarkFrontmatter` in this post.
You would like to write something to describe your post. And also, you want to manage these metadatas within posts. In markdown, you can insert this metadata by YAML. Like this.

```md
---
title: Hello, World!
writer: 412ock
published: 11 Nomember 2013
---

# Hi, there!
This is post for showing example.
```

By `remarkFrontmatter`, you can extract YAML data from markdown file. And you can get a object parsed these data. It is amazing.

# Rendering HTML

The object resulted by `unified` have html converted from markdown. But It is useless if it can't display in your website. To do this, you should use `dangerouslyInnerHtml` in React framework. `content` you can see above example have html string. Just insert `content` into `dangerouslyInnerHtml` so that post will be rendered in your website as html.