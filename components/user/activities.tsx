import Image from "next/image";

export default function Activities({ user }: any) {
  return (
    <>
      {user.activities[0] ? (
        <div className={`collapse`}>
          <input type="checkbox" className="min-h-0" />
          {user.activities.map((a: any, i: number) => {
            return (
              <div
                key={i}
                className={`${
                  i > 0
                    ? "collapse-content px-0"
                    : "collapse-title h-fit min-h-0 p-0"
                }`}
              >
                {a.type === 2 ? (
                  <>
                    <div
                      className="tooltip tooltip-primary"
                      data-tip={user.spotify.album}
                    >
                      <Image
                        src={user.spotify.album_art_url}
                        width={20}
                        height={20}
                        className="inline-block rounded-xl"
                        alt={user.spotify.album}
                      />
                    </div>{" "}
                    Listening to {user.spotify.song} by {user.spotify.artist}
                  </>
                ) : (
                  <>
                    <div
                      className="tooltip tooltip-primary"
                      data-tip={a.assets.large_text}
                    >
                      <Image
                        src={
                          a.assets.large_image.startsWith("mp:external")
                            ? a.assets.large_image.replace(
                                "mp:external",
                                "https://media.discordapp.net/external"
                              )
                            : `https://cdn.discordapp.com/app-assets/${a.application_id}/${a.assets.large_image}`
                        }
                        width={20}
                        height={20}
                        className="inline-block rounded-xl"
                        alt={a.assets.large_text}
                      />
                    </div>{" "}
                    Playing {a.name}
                    {a.details ? `, ${a.details}` : null}
                    {a.state ? `, ${a.state}` : null}
                  </>
                )}
                {i == 0 && user.activities[1] ? "..." : ""}
              </div>
            );
          })}
        </div>
      ) : null}
    </>
  );
}
