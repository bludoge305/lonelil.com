import { Fragment } from "react";
import Link from "next/link";
import User from "../components/user/user";
import { getDocuments } from "outstatic/server";
import PostCard from "../components/blog/postCard";

export default function Home({ posts, projects, lonelil }: any) {
  return (
    <>
      <div className="grid grid-cols-4 gap-4 px-12 pb-28 pt-12">
        <div className="col-span-4 pb-5">
          <User lonelil={lonelil} />
        </div>

        <div className="col-span-4 hidden h-72 md:block">
          <p className="mt-3 text-3xl">My Blog!</p>
          <div className="carousel-center carousel rounded-box h-72 max-w-full space-x-4 py-4">
            {posts.map((post: any) => (
              <div className="carousel-item w-96" key={post.slug}>
                {post.status == "published" ? (
                  <Link href={`/blog/${post.slug}`} className="w-full">
                    <PostCard post={post} />
                  </Link>
                ) : null}
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-4 hidden h-72 pt-8 md:block">
          <p className="mt-3 text-3xl">My Projects!</p>
          <div className="carousel-center carousel rounded-box h-72 max-w-full space-x-4 py-4">
            {projects.map((project: any) => (
              <div className="carousel-item w-96" key={project.slug}>
                {project.status == "published" ? (
                  <Link href={`/project/${project.slug}`} className="w-full">
                    <PostCard post={project} />
                  </Link>
                ) : null}
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-4 block h-72 md:hidden">
          <div>
            <p className="my-3 text-3xl">My Blog!</p>
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
          <div>
            <p className="my-3 text-3xl">My Projects!</p>
            <div>
              {projects.map((project: any) => (
                <Fragment key={project.id}>
                  {project.status == "published" ? (
                    <Link href={`/project/${project.slug}`} className="w-full">
                      <PostCard post={project} />
                    </Link>
                  ) : null}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
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
  const allProjects = getDocuments("projects", [
    "title",
    "publishedAt",
    "slug",
    "coverImage",
    "description",
    "author",
  ]);
  return {
    props: { posts: allPosts, projects: allProjects },
  };
};
