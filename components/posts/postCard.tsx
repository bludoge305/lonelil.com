import Tags from "./tags";
import Image from "next/image";

export default function PostCard({ post }: any) {
  return (
    <div
      className={`card mb-3 max-h-full overflow-hidden bg-primary shadow-xl ${
        post.cover ? "image-full" : "h-full"
      }`}
    >
      {post.cover ? (
        <figure className="h-full">
          <Image
            src={
              post.cover.external
                ? post.cover.external.url
                : post.cover.file.url
            }
            alt={post.title || post.properties.Name.title[0].plain_text}
            width={500}
            height={500}
          />
        </figure>
      ) : null}
      <div className="card-body max-h-full">
        <h2 className="card-title">
          {post.title || post.properties.Name.title[0].plain_text}
        </h2>
        <p
          style={{
            display: "-webkit-box",
            WebkitLineClamp: "3",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {post.description ||
            post.properties.Description.rich_text[0].plain_text}
        </p>
        <div className="card-actions justify-end">
          <Tags tags={post.properties.Tags.multi_select} />
        </div>
      </div>
    </div>
  );
}
