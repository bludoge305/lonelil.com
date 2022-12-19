import { getAllPostIds, getPost, getBlocks } from "../../lib/posts";
import { Fragment } from "react";
import Link from "next/link";
import Head from "next/head";
import styles from "../../styles/post.module.css";
import Navbar from "../../components/ui/navbar";

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
          bold ? styles.bold : "",
          code ? styles.code : "",
          italic ? styles.italic : "",
          strikethrough ? styles.strikethrough : "",
          underline ? styles.underline : "",
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
        <pre className={styles.pre}>
          <code className={styles.code_block} key={id}>
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
          <div className={styles.file}>
            📎{" "}
            <Link href={src_file} passHref>
              {lastElementInArray.split("?")[0]}
            </Link>
          </div>
          {caption_file && <figcaption>{caption_file}</figcaption>}
        </figure>
      );
    case "bookmark":
      const href = value.url;
      return (
        <a href={href} target="_brank" className={styles.bookmark}>
          {href}
        </a>
      );
    default:
      return `❌ Unsupported block (${
        type === "unsupported" ? "unsupported by Notion API" : type
      })`;
  }
};

export default function Post({ postData, blocks, lonelil }: any) {
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
      <Navbar lonelil={lonelil} />

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
            <h1 className={styles.name}>
              <Text text={postData.properties.Name.title} />
            </h1>
            <p
              style={{
                display: "-webkit-box",
                WebkitLineClamp: "3",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {postData.properties.Description.rich_text[0].plain_text}
            </p>
          </div>
        </div>
      </div>

      <article className={styles.container}>
        <section>
          <Link href="/" className={styles.back}>
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
