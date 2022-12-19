import { getAllPosts } from "../lib/posts";
import { getAllProjects } from "../lib/projects";
import Link from "next/link";
import User from "../components/home/user";

export default function Home({ posts, allProjectData, lonelil }: any) {
  return (
    <>
      <div className="py-28 grid grid-cols-12">
        <div className="col-auto inline-grid"></div>
        <div className="col-span-10 md:col-span-4 lg:col-span-3 inline-grid">
          <div className="mb-10">
            <User lonelil={lonelil} />
            <p className="text-3xl mt-3">welcome to my website!</p>
          </div>
          <div>
            <h1 className="text-4xl">my blog</h1>
            <ul className="mt-5">
              {posts.map((post: any) => (
                <div key={post.id}>
                  {post.properties.Public.checkbox ? (
                    <Link href={`/posts/${post.id}`}>
                      <li
                        className={`card bg-primary shadow-xl mb-3  ${
                          post.cover ? "image-full" : ""
                        }`}
                      >
                        {post.cover ? (
                          <figure className="h-36">
                            <img
                              src={post.cover.external.url}
                              alt={post.properties.Name.title[0].plain_text}
                              style={{
                                height: "unset",
                              }}
                            />
                          </figure>
                        ) : null}
                        <div className="card-body">
                          <h2 className="card-title">
                            {post.properties.Name.title[0].plain_text}
                          </h2>
                          <p
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: "3",
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {
                              post.properties.Description.rich_text[0]
                                .plain_text
                            }
                          </p>
                          <div className="card-actions justify-end">
                            {post.properties.Tags.multi_select.map(
                              (tag: any) => {
                                return (
                                  <div
                                    className="badge badge-outline"
                                    key={tag.id}
                                    style={{
                                      color: tag.color,
                                    }}
                                  >
                                    {tag.name}
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </div>
                      </li>
                    </Link>
                  ) : null}
                </div>
              ))}
            </ul>
          </div>
          <h1 className="text-4xl my-3 md:hidden">Projects</h1>
          <div className="grid w-full grid-cols-1 gap-4 md:hidden">
            {allProjectData.map(({ id, name, description, image }: any) => (
              <div
                className="card card-compact h-50 bg-secondary shadow-xl"
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
        <div className="md:col-span-7 md:inline-grid hidden">
          <h1 className="text-4xl my-3 px-6">Projects</h1>
          <div className="grid w-full grid-cols-1 gap-4 px-6 py-5 md:grid-cols-2">
            {allProjectData.map(({ id, name, description, image }: any) => (
              <div
                className="card card-compact h-50 bg-secondary shadow-xl"
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
  const allPostsData = await getAllPosts();
  const allProjectData = getAllProjects();
  return {
    props: {
      posts: allPostsData,
      allProjectData,
    },
  };
}
