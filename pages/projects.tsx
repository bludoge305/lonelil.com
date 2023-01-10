import { getDocuments } from "outstatic/server";
import { Fragment } from "react";
import PostCard from "../components/blog/postCard";
import Head from "next/head";
import Link from "next/link";

export default function Projects({ projects }: any) {
  return (
    <>
      <Head>
        <title>Projects - lonelil</title>
        <meta key="og_title" property="og:title" content={"Projects"} />
        <meta
          key="twitter_title"
          property="twitter:title"
          content={"Projects"}
        />
        <meta
          key="og_description"
          property="og:description"
          content={`View ${projects.length}+ lonelil's projects now on lonelil.dev.`}
        />
      </Head>
      <section className="h-full min-h-screen items-center py-16 lg:px-96">
        <div className="container mx-auto flex flex-col items-center justify-center">
          <div className="hero mb-12">
            <div className="hero-content text-center">
              <div className="max-w-md">
                <h1 className="text-5xl font-bold">Projects</h1>
              </div>
            </div>
          </div>
          <div className="mb-12 grid w-full grid-cols-1 grid-rows-2 gap-2 p-8 md:grid-cols-2 md:grid-rows-1 lg:p-0">
            {projects.map((project: any) => (
              <Fragment key={project.slug}>
                {project.status == "published" ? (
                  <Link href={`/project/${project.slug}`} className="w-full">
                    <PostCard post={project} />
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
  const allProjects = getDocuments("projects", [
    "title",
    "publishedAt",
    "slug",
    "coverImage",
    "description",
    "author",
  ]);
  return {
    props: { projects: allProjects },
  };
};
