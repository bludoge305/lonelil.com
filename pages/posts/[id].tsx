import { getAllPostIds, getPost, getBlocks } from "../../lib/posts";
import { Fragment } from "react";
import Link from "next/link";
import Head from "next/head";

export const Text = ({ text }: any) => {
  if (!text) {
    return null;
  }
  return text.map((value: any, i: number) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value;
    return (
      <span
        className={[
          bold ? "font-bold" : "",
          code
            ? "font-mono bg-[rgb(242, 242, 242)] pt-0.5 pr-1 rounded-sm dark:bg-[rgb(15, 8, 28)]"
            : "",
          italic ? "italic" : "",
          strikethrough ? "line-through" : "",
          underline ? "underline" : "",
        ].join(" ")}
        style={color !== "default" ? { color } : {}}
        key={i}
      >
        {text.link ? <a href={text.link.url}>{text.content}</a> : text.content}
      </span>
    );
  });
};

const renderNestedList = (block: any) => {
  const { type } = block;
  const value = block[type];
  if (!value) return null;

  const isNumberedList = value.children[0].type === "numbered_list_item";

  if (isNumberedList) {
    return <ol>{value.children.map((block: any) => renderBlock(block))}</ol>;
  }
  return <ul>{value.children.map((block: any) => renderBlock(block))}</ul>;
};

const renderBlock = (block: any) => {
  const { type, id } = block;
  const value = block[type];

  switch (type) {
    case "paragraph":
      return (
        <p>
          <Text text={value.rich_text} />
        </p>
      );
    case "heading_1":
      return (
        <h1>
          <Text text={value.rich_text} />
        </h1>
      );
    case "heading_2":
      return (
        <h2>
          <Text text={value.rich_text} />
        </h2>
      );
    case "heading_3":
      return (
        <h3>
          <Text text={value.rich_text} />
        </h3>
      );
    case "bulleted_list_item":
    case "numbered_list_item":
      return (
        <li>
          <Text text={value.rich_text} />
          {!!value.children && renderNestedList(block)}
        </li>
      );
    case "to_do":
      return (
        <div>
          <label htmlFor={id}>
            <input type="checkbox" id={id} defaultChecked={value.checked} />{" "}
            <Text text={value.rich_text} />
          </label>
        </div>
      );
    case "toggle":
      return (
        <details>
          <summary>
            <Text text={value.rich_text} />
          </summary>
          {value.children?.map((block: any) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
        </details>
      );
    case "child_page":
      return <p>{value.title}</p>;
    case "image":
      const src =
        value.type === "external" ? value.external.url : value.file.url;
      const caption = value.caption ? value.caption[0]?.plain_text : "";
      return (
        <figure>
          <img src={src} alt={caption} />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      );
    case "divider":
      return <hr key={id} />;
    case "quote":
      return <blockquote key={id}>{value.rich_text[0].plain_text}</blockquote>;
    case "code":
      return (
        <pre className="bg-[rgb(242, 242, 242)] pt-0.5 pr-1 mt-5 mr-0 leading-loose rounded-xl overflow-auto dark:bg-[rgb(15, 8, 28)] hover:bg-[rgba(55, 53, 47, 0.08)] hover:cursor-pointer hover:rounded-sm dark:hover:bg-[rgba(255, 255, 255, 0.1)] dark:hover:cursor-pointer dark:hover:rounded-sm">
          <code className="pt-5 font-mono flex flex-wrap" key={id}>
            {value.rich_text[0].plain_text}
          </code>
        </pre>
      );
    case "file":
      const src_file =
        value.type === "external" ? value.external.url : value.file.url;
      const splitSourceArray = src_file.split("/");
      const lastElementInArray = splitSourceArray[splitSourceArray.length - 1];
      const caption_file = value.caption ? value.caption[0]?.plain_text : "";
      return (
        <figure>
          <div className="pt-0.5 pr-1 no-underline">
            📎{" "}
            <Link href={src_file} passHref className="text-inherit">
              {lastElementInArray.split("?")[0]}
            </Link>
          </div>
          {caption_file && <figcaption>{caption_file}</figcaption>}
        </figure>
      );
    case "bookmark":
      const href = value.url;
      return (
        <a href={href} target="_brank" className="block mb-3">
          {href}
        </a>
      );
    default:
      return `❌ Unsupported block (${
        type === "unsupported" ? "unsupported by Notion API" : type
      })`;
  }
};

export default function Post({ postData, blocks }: any) {
  const title = `${postData.properties.Name.title[0].plain_text} - lonelil`;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          key="og_title"
          property="og:title"
          content={postData.properties.Name.title[0].plain_text}
        />
        <meta
          key="twitter_title"
          property="twitter:title"
          content={postData.properties.Name.title[0].plain_text}
        />
        <meta
          key="og_description"
          property="og:description"
          content={postData.properties.Description.rich_text[0].plain_text}
        />
        <link
          key="oembed"
          type="application/json+oembed"
          href={encodeURI(
            `https://webembed.onrender.com/oembed?provider_name=Read "${postData.properties.Name.title[0].plain_text}" now only on lonelil.dev.&provider_url=https://lonelil.dev/posts/${postData.id}&author_name=lonelil&author_url=https://lonelil.dev`
          )}
        />
      </Head>

      <div className="hero bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            {postData.properties.Tags.multi_select.map((tag: any) => {
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
            })}
            <h1 className="text-4xl">
              <Text text={postData.properties.Name.title} />
            </h1>
            <p
              style={{
                display: "-webkit-box",
                WebkitLineClamp: "3",
                WebkitBoxOrient: "vertical",
                overflow: "scroll",
              }}
            >
              {postData.properties.Description.rich_text[0].plain_text}
            </p>
          </div>
        </div>
      </div>

      <article className="blog-post">
        <section>
          <Link href="/" className="inline-block mb-5">
            ← Go home
          </Link>
          {blocks.map((block: any) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
        </section>
      </article>
    </>
  );
}

export async function getStaticPaths() {
  const paths = await getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const postData = await getPost(params.id);
  const blocks = await getBlocks(params.id);

  const childBlocks = await Promise.all(
    blocks
      .filter((block) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await getBlocks(block.id),
        };
      })
  );
  const blocksWithChildren = blocks.map((block) => {
    if (block.has_children && !block[block.type].children) {
      block[block.type]["children"] = childBlocks.find(
        (x) => x.id === block.id
      )?.children;
    }
    return block;
  });
  return {
    props: {
      postData,
      blocks: blocksWithChildren,
    },
  };
}
