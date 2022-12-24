import { getAllProjects } from "../lib/projects";
import { Fragment } from "react";
import PostCard from "../components/blog/postCard";

export default function Projects({ projects }: any) {
  return (
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
            <Fragment key={project.id}>
              {project.properties.Public.checkbox ? (
                <PostCard post={project} />
              ) : null}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

export async function getStaticProps() {
  let allProjectData = await getAllProjects();
  return {
    props: {
      projects: allProjectData,
    },
  };
}
