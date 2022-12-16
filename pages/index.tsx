import Head from "next/head";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
//@ts-ignore
export default function Home({ allPostsData }) {
  return (
    <>
      <Head>
        <title>lonelil</title>
        <meta name="description" content="lonelil's website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="py-28 grid grid-cols-12">
        <div className="col-auto inline-grid"></div>
        <div className="col-span-3 inline-grid">
          <div className="mb-10">
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 rounded-full"
                src="/avatar.gif"
                loading="lazy"
              ></img>
              <div className="flex flex-col">
                <h1 className="text-6xl">lonelil</h1>
              </div>
            </div>
            <p className="text-3xl mt-2">welcome to my website!</p>
          </div>
          <div>
            <h1 className="text-4xl">my blog:</h1>
            <ul className="mt-5">
              {/* 
              //@ts-ignore */}
              {allPostsData.map(({ id, date, title }) => (
                <Link href={`/posts/${id}`} key={id}>
                  <li className="card w-96 bg-primary shadow-xl mb-3">
                    <div className="card-body">
                      <h2 className="card-title">{title}</h2>
                      <p>{date}</p>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
        <div className="lg:col-span-7 lg:inline-grid hidden"></div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
