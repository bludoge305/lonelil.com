import { getAllPosts } from "../../lib/posts";
import { Fragment } from "react";
import PostCard from "../../components/blog/postCard"
import Link from "next/link";

export default function Blog({ posts }: any) {
  return (
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
            <Fragment key={post.id}>
              {post.properties.Public.checkbox ? (
                <Link href={`/blog/${post.id}`}>
                  <PostCard post={post} />
                </Link>
              ) : null}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

export async function getStaticProps() {
  let allPostsData = await getAllPosts();
  return {
    props: {
      posts: allPostsData,
    },
    revalidate: 60,
  };
}
