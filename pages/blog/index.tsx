import { getDocuments } from "outstatic/server";
import { Fragment } from "react";
import PostCard from "../../components/blog/postCard";
import Link from "next/link";
import Head from "next/head";

export default function Blog({ posts }: any) {
  return (
    <>
      <Head>
        <title>Blog - lonelil</title>
        <meta key="og_title" property="og:title" content={"Blog"} />
        <meta key="twitter_title" property="twitter:title" content={"Blog"} />
        <meta
          key="og_description"
          property="og:description"
          content={`Read ${posts.length}+ blog posts now on lonelil.dev.`}
        />
      </Head>
      <section className="h-full min-h-screen items-center py-16 lg:px-96">
        <div className="container mx-auto flex flex-col items-center justify-center">
          <div className="hero mb-12">
            <div className="hero-content text-center">
              <div className="max-w-md">
                <h1 className="text-5xl font-bold">Blog</h1>
              </div>
            </div>
          </div>
          <div className="mb-12 grid w-full grid-cols-1 grid-rows-2 gap-2 p-8 md:grid-cols-2 md:grid-rows-1 lg:p-0">
            {posts.map((post: any) => (
              <Fragment key={post.slug}>
                {post.status == "published" ? (
                  <Link href={`/blog/${post.slug}`} className="w-full">
                    <PostCard post={post} />
                  </Link>
                ) : null}
              </Fragment>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export const getStaticProps = async () => {
  const allPosts = getDocuments("posts", [
    "title",
    "publishedAt",
    "slug",
    "coverImage",
    "description",
    "author",
  ]);

  return {
    props: { posts: allPosts },
  };
};
