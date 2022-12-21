import { Fragment } from "react";

export default function Activities({ user }: any) {
  return (
    <>
      {user.activities.map((a: any, i: number) => {
        return (
          <Fragment key={i}>
            {i > 0 ? <br /> : null}
            {a.type === 2 ? (
              <>
                <div
                  className="tooltip tooltip-primary"
                  data-tip={user.spotify.album}
                >
                  <img
                    src={user.spotify.album_art_url}
                    width={20}
                    height={20}
                    className="inline-block rounded-xl"
                    alt={user.spotify.album}
                    loading="lazy"
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
                  <img
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
                    loading="lazy"
                  />
                </div>{" "}
                Playing {a.name}
                {a.details ? `, ${a.details}` : null}
                {a.state ? `, ${a.state}` : null}
              </>
            )}
          </Fragment>
        );
      })}
    </>
  );
}
