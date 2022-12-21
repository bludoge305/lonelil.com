import { Fragment } from "react";
import Link from "next/link";
import User from "../components/user/user";
import { getAllPosts } from "../lib/posts";
import { getAllProjects } from "../lib/projects";
import Tags from "../components/posts/tags";

export default function Home({ posts, allProjectData, lonelil }: any) {
  return (
    <>
      <div className="grid grid-cols-12 py-28">
        <div className="col-auto inline-grid"></div>
        <div className="col-span-10 inline-grid md:col-span-4 lg:col-span-3">
          <div className="mb-10">
            <User lonelil={lonelil} />
            <p className="mt-3 text-3xl">welcome to my website!</p>
          </div>
          <div>
            <h1 className="text-4xl">my blog</h1>
            <ul className="mt-5">
              {posts.map((post: any) => (
                <Fragment key={post.id}>
                  {post.properties.Public.checkbox ? (
                    <Link href={`/posts/${post.id}`}>
                      <li
                        className={`card mb-3 bg-primary shadow-xl  ${
                          post.cover ? "image-full" : ""
                        }`}
                      >
                        {post.cover ? (
                          <figure className="h-full">
                            <img
                              src={post.cover.external.url}
                              alt={post.title}
                            />
                          </figure>
                        ) : null}
                        <div className="card-body">
                          <h2 className="card-title">{post.title}</h2>
                          <p
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: "3",
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {post.description}
                          </p>
                          <div className="card-actions justify-end">
                            <Tags tags={post.properties.Tags.multi_select} />
                          </div>
                        </div>
                      </li>
                    </Link>
                  ) : null}
                </Fragment>
              ))}
            </ul>
          </div>
          <h1 className="my-3 text-4xl md:hidden">Projects</h1>
          <div className="grid w-full grid-cols-1 gap-4 md:hidden">
            {allProjectData.map(({ id, name, description, image }: any) => (
              <div
                className="h-50 card card-compact bg-secondary shadow-xl"
                key={id}
              >
                <figure>
                  <img src={image} alt={name} loading="lazy" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{name}</h2>
                  <p>{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden md:col-span-7 md:inline-grid">
          <h1 className="my-3 px-6 text-4xl">Projects</h1>
          <div className="grid w-full grid-cols-1 gap-4 px-6 py-5 md:grid-cols-2">
            {allProjectData.map(({ id, name, description, image }: any) => (
              <div
                className="h-50 card card-compact bg-secondary shadow-xl"
                key={id}
              >
                <figure>
                  <img src={image} alt={name} loading="lazy" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{name}</h2>
                  <p>{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  let allPostsData = await getAllPosts();
  const allProjectData = getAllProjects();
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
      allProjectData,
    },
  };
}
