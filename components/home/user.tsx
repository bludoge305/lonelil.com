export default function user({ lonelil }: any) {
  return (
    <>
      <div className="flex items-center gap-4">
        <div className="avatar">
          <div
            className={`w-12 rounded-full ring ring-${
              !lonelil.loading ? lonelil.status.discord_status : "ring-primary"
            } ring-offset-base-100 ring-offset-2`}
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
              className="absolute scale-150"
              alt={`${lonelil.status.discord_user.username}'s Avatar Decoration`}
            ></img>
          ) : null}
        </div>
        <div className="flex flex-col">
          <h1 className="text-5xl">lonelil</h1>
          <p className="text-1xl">
            {!lonelil.loading ? (
              <>
                {lonelil.status.listening_to_spotify ? (
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
                ) : null}
                {lonelil.status.activities[0] &&
                !lonelil.status.listening_to_spotify ? (
                  <>
                    <div
                      className="tooltip tooltip-primary"
                      data-tip={lonelil.status.activities[0].assets.large_text}
                    >
                      <img
                        src={
                          lonelil.status.activities[0].assets.large_image.startsWith(
                            "mp:external"
                          )
                            ? lonelil.status.activities[0].assets.large_image.replace(
                                "mp:external",
                                "https://media.discordapp.net/external"
                              )
                            : `https://cdn.discordapp.com/app-assets/${lonelil.status.activities[0].application_id}/${lonelil.status.activities[0].assets.large_image}`
                        }
                        width={20}
                        height={20}
                        className="inline-block rounded-xl"
                        alt={lonelil.status.activities[0].assets.large_text}
                        loading="lazy"
                      />
                    </div>{" "}
                    Playing {lonelil.status.activities[0].name}
                    {lonelil.status.activities[0].details
                      ? `, ${lonelil.status.activities[0].details}`
                      : null}
                    {lonelil.status.activities[0].state
                      ? `, ${lonelil.status.activities[0].state}`
                      : null}
                  </>
                ) : null}
              </>
            ) : null}
          </p>
        </div>
      </div>
    </>
  );
}