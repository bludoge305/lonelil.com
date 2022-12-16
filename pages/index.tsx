import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
//@ts-ignore
export default function Home({ allPostsData, lonelil }) {
  return (
    <>
      <div className="py-28 grid grid-cols-12">
        <div className="col-auto inline-grid"></div>
        <div className="col-span-3 inline-grid">
          <div className="mb-10">
            <div className="flex items-center gap-4">
              <div className="avatar">
                <div
                  className={`w-12 rounded-full ring ring-${
                    !lonelil.loading
                      ? lonelil.status.discord_status
                      : "ring-primary"
                  } ring-offset-base-100 ring-offset-2`}
                >
                  {!lonelil.loading ? (
                    <img
                      src={`https://cdn.discordapp.com/avatars/${lonelil.status.discord_user.id}/${lonelil.status.discord_user.avatar}.webp`}
                      loading="lazy"
                      alt={lonelil.status.discord_user.username}
                    ></img>
                  ) : null}
                </div>
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
                            data-tip={
                              lonelil.status.activities[0].assets.large_text
                            }
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
                              alt={
                                lonelil.status.activities[0].assets.large_text
                              }
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

            <p className="text-3xl mt-3">welcome to my website!</p>
          </div>
          <div>
            <h1 className="text-4xl">my blog:</h1>
            <ul className="mt-5">
              {/* 
              //@ts-ignore */}
              {allPostsData.map(({ id, date, title }) => (
                <Link href={`/posts/${id}`} key={id}>
                  <li className="card w-96 bg-primary shadow-xl mb-3">
                    <div className="card-body">
                      <h2 className="card-title">{title}</h2>
                      <p>{date}</p>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
        <div className="lg:col-span-7 lg:inline-grid hidden"></div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
