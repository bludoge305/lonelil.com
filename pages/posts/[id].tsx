import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";

export default function Post({ postData }: any) {
  const title = `${postData.title} - lonelil`;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={postData.content} />
        <meta property="og:title" content={postData.title} />
        <meta property="og:description" content={postData.content} />
      </Head>

      <div className="hero h-48 bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">{postData.title}</h1>
            <p>{postData.date}</p>
          </div>
        </div>
      </div>
      <div className="text-center mt-4 text-2xl">
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}></div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

//@ts-ignore
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
}
