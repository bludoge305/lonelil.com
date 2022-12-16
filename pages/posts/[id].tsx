import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
//@ts-ignore
export default function Post({ postData }) {
  const title = `${postData.title} - lonelil`;
  return (
    <>
      <Head>
        <title>{title}</title>
        <link type="application/json+oembed" href="/oembed.json" />
        <meta property="og:title" content={postData.title} />
        <meta property="og:description" content={postData.content} />
        <meta name="theme-color" content="#3c455b" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
