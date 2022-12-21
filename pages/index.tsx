import { Fragment } from "react";
import Link from "next/link";
import User from "../components/user/user";
import { getAllPosts } from "../lib/posts";
import { getAllProjects } from "../lib/projects";
import PostCard from "../components/posts/postCard";

export default function Home({ posts, projects, lonelil }: any) {
  return (
    <>
      <div className="grid grid-cols-4 gap-4 py-28 px-12">
        <div className="col-span-4 pb-5">
          <User lonelil={lonelil} />
        </div>

        <div className="col-span-4 hidden h-72 md:block">
          <p className="mt-3 text-3xl">My Blog!</p>
          <div className="carousel-center carousel rounded-box h-72 max-w-full space-x-4 py-4">
            {posts.map((post: any) => (
              <div className="carousel-item w-96" key={post.id}>
                {post.properties.Public.checkbox ? (
                  <Link href={`/posts/${post.id}`}>
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
              <div className="carousel-item w-96" key={project.id}>
                {project.properties.Public.checkbox ? (
                  <PostCard post={project} />
                ) : null}
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-4 block h-72 md:hidden">
          <div>
            <p className="my-3 text-3xl">My Blog!</p>
            {posts.map((post: any) => (
              <Fragment key={post.id}>
                {post.properties.Public.checkbox ? (
                  <Link href={`/posts/${post.id}`}>
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
                  {project.properties.Public.checkbox ? (
                    <PostCard post={project} />
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

export async function getStaticProps() {
  let allPostsData = await getAllPosts();
  let allProjectData = await getAllProjects();
  allPostsData.forEach((post: any, i: number) => {
    let titleJoin: any[] = [];
    let descriptionJoin: any[] = [];
    post.properties.Name.title.forEach((t: any) => {
      titleJoin.push(t.plain_text);
    });
    post.properties.Description.rich_text.forEach((d: any) => {
      descriptionJoin.push(d.plain_text);
    });
    const title = titleJoin.join("");
    const description = descriptionJoin.join("");
    allPostsData[i] = {
      ...post,
      title,
      description,
    };
  });

  return {
    props: {
      posts: allPostsData,
      projects: allProjectData,
    },
  };
}
