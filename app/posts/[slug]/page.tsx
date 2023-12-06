import Head from 'next/head'
import { allPosts } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks'

import { Embed } from "@/components/embed";


export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._raw.flattenedPath,
  }))
}

export default function Home(pages) {
  const slug = "/posts/" + pages.params.slug;
  const post = allPosts.find((post) => post.url === slug)

  console.log(post);
  

  // 404 if the post does not exist.
  // if (!post) {
  //   return;
  // }

  const MdxBody = useMDXComponent(post.body.code);

  return (
    <div>
      <Head>
        <title>{post.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <MdxBody components={{ Embed }}/>
      </main>

      <aside>
        <ul>
          {allPosts.map((post) => (
            <a key={post._id} href={`/${post._raw.flattenedPath}`}>{post.title}</a>
          ))}
        </ul>
      </aside>
    </div>
  )
}
