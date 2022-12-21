export default function Tags({ tags }: any) {
  return (
    <>
      {tags.map((tag: any) => {
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
    </>
  );
}
