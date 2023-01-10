import Image from "next/image";

export default function PostCard({ post }: any) {
  return (
    <div
      className={`card mb-3 max-h-full overflow-hidden bg-primary shadow-xl ${
        post.coverImage ? "image-full" : "h-full"
      }`}
    >
      {post.coverImage ? (
        <figure className="h-full">
          <Image
            src={post.coverImage}
            alt={post.title}
            width={500}
            height={500}
          />
        </figure>
      ) : null}
      <div className="card-body max-h-full">
        <h2 className="card-title">
          {post.title}
        </h2>
        <p
          style={{
            display: "-webkit-box",
            WebkitLineClamp: "3",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {post.description}
        </p>
      </div>
    </div>
  );
}
