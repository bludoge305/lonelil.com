import { getSortedPostsData } from "../lib/posts";
import { getAllProjects } from "../lib/projects";
import Link from "next/link";
import User from "../components/home/user";

export default function Home({ allPostsData, allProjectData, lonelil }: any) {
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
              {allPostsData.map(({ id, date, title }: any) => (
                <Link href={`/posts/${id}`} key={id}>
                  <li className="card bg-primary shadow-xl mb-3">
                    <div className="card-body">
                      <h2 className="card-title">{title}</h2>
                      <p>{date}</p>
                    </div>
                  </li>
                </Link>
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
                  <img src={image} alt={name} />
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
                  <img src={image} alt={name} />
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
  const allPostsData = getSortedPostsData();
  const allProjectData = getAllProjects();
  return {
    props: {
      allPostsData,
      allProjectData,
    },
  };
}
