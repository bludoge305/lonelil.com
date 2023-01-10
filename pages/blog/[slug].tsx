import Head from "next/head";
import markdownToHtml from "../../lib/markdownToHtml";
import { Document } from "../../interfaces/document";
import { getDocumentPaths, getDocumentBySlug } from "outstatic/server";
import DateFormatter from "../../components/blog/DateFormatter";
import Image from "next/image";

type Props = {
  post: Document;
};

export default function Post({ post }: Props) {
  return (
    <div className="mx-auto max-w-6xl px-5">
      <article className="mb-32">
        <Head>
          <title>{`${post.title} | lonelil.dev`}</title>
          <meta property="og:image" content={post.coverImage} />
          <meta key="og_title" property="og:title" content={post.title} />
          <meta
            key="twitter_title"
            property="twitter:title"
            content={post.title}
          />
          <meta
            key="og_description"
            property="og:description"
            content={post.description}
          />
          <link
            key="oembed"
            type="application/json+oembed"
            href={encodeURI(
              `https://webembed.onrender.com/oembed?provider_name=Read "${post.title}" now only on lonelil.dev.&provider_url=https://lonelil.dev/blog/${post.slug}&author_name=lonelil&author_url=https://lonelil.dev`
            )}
          />
        </Head>
        {post.coverImage ? (
          <div className="relative mb-2 h-52 w-full sm:mx-0 md:mb-4 md:h-96">
            <Image
              alt={post.title}
              src={post.coverImage}
              fill
              className="object-cover object-center"
              priority
            />
          </div>
        ) : (
          <div className="mt-8"></div>
        )}
        <h1 className="font-primary mb-2 text-2xl font-bold md:text-4xl">
          {post.title}
        </h1>
        <div className="hidden text-slate-600 md:mb-12 md:block">
          Written on <DateFormatter dateString={post.publishedAt} /> by{" "}
          <span className="inline-flex items-baseline">
            <Image
              src={post.author.picture}
              alt={post.author.name}
              className="mr-1 h-5 w-5 self-center rounded-full"
              width={20}
              height={20}
            />
            <span>{post.author.name}</span>
          </span>
          .
        </div>
        <hr className="border-neutral-200 mt-10 mb-10" />
        <div className="mx-auto max-w-2xl">
          <div
            className="lg:prose-xl prose"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>
    </div>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticPaths() {
  return {
    paths: getDocumentPaths("posts"),
    fallback: false,
  };
}

export async function getStaticProps({ params }: Params) {
  const post = getDocumentBySlug("posts", params.slug, [
    "title",
    "publishedAt",
    "slug",
    "author",
    "content",
    "coverImage",
  ]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}
