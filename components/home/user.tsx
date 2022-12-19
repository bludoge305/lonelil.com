import { Fragment } from "react";

export default function user({ lonelil }: any) {
  return (
    <>
      <div className="flex items-center gap-4">
        <div className="avatar">
          <div
            className={`w-12 rounded-full ring ring-${
              !lonelil.loading ? lonelil.status.discord_status : "ring-primary"
            } `}
          >
            {!lonelil.loading ? (
              <>
                <img
                  src={`https://cdn.discordapp.com/avatars/${lonelil.status.discord_user.id}/${lonelil.status.discord_user.avatar}.webp`}
                  loading="lazy"
                  alt={lonelil.status.discord_user.username}
                ></img>
              </>
            ) : null}
          </div>
          {!lonelil.loading && lonelil.status.discord_user.avatar_decoration ? (
            <img
              src={`https://cdn.discordapp.com/avatar-decorations/${lonelil.status.discord_user.id}/${lonelil.status.discord_user.avatar_decoration}.webp`}
              loading="lazy"
              className="absolute scale-125"
              alt={`${lonelil.status.discord_user.username}'s Avatar Decoration`}
            ></img>
          ) : null}
        </div>
        <div className="flex flex-col">
          <h1 className="text-5xl">lonelil</h1>
          <div className="text-1xl">
            {!lonelil.loading ? (
              <>
                {lonelil.status.activities.map((a: any, i: number) => {
                  return (
                    <Fragment key={i}>
                      {i > 0 ? <br /> : null}
                      {a.type === 2 ? (
                        <>
                          <div
                            className="tooltip tooltip-primary"
                            data-tip={lonelil.status.spotify.album}
                          >
                            <img
                              src={lonelil.status.spotify.album_art_url}
                              width={20}
                              height={20}
                              className="inline-block rounded-xl"
                              alt={lonelil.status.spotify.album}
                              loading="lazy"
                            />
                          </div>{" "}
                          Listening to {lonelil.status.spotify.song} by{" "}
                          {lonelil.status.spotify.artist}
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
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
