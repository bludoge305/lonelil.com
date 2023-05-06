import { type NextPage } from "next";
import { useEffect, useState } from "react";
import { useLanyardWS } from "use-lanyard";
import { api } from "~/utils/api";
import { Lrc } from "react-lrc";
import Image from "next/image";
import Color from "color-thief-react";

const Home: NextPage = () => {
  const discordData = useLanyardWS("603129750638034957");
  const [musicElapsed, setMusicElapsed] = useState(0);

  const input = {
    song: discordData?.spotify?.song as string,
    artist: discordData?.spotify?.artist.split("; ")[0] as string,
  };

  const input2 = {
    enabled: !!discordData?.spotify,
  };

  const { data: qq } = api.lyrics.qqmusic.useQuery(input, {
    ...input2,
  });

  const { data: netease } = api.lyrics.netease.useQuery(input, {
    ...input2,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (discordData?.spotify) {
        const spotify = discordData.spotify;
        const currentTime = new Date().getTime();
        // const songLength = spotify.timestamps.end - spotify.timestamps.start;
        const timeElapsed = currentTime - spotify.timestamps.start;
        setMusicElapsed(timeElapsed);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [discordData?.spotify]);

  return (
    <div className="p-8">
      <div>
        <div className="flex flex-row items-center gap-2">
          <h1 className="text-2xl font-semibold">lonelil</h1>
          <div
            className="h-[1em] w-[1em] animate-pulse rounded-xl"
            style={{
              backgroundColor:
                discordData?.discord_status === "online"
                  ? "#23a55a"
                  : discordData?.discord_status === "idle"
                  ? "#f0b232"
                  : discordData?.discord_status === "dnd"
                  ? "#f23f43"
                  : discordData?.discord_status === "offline"
                  ? "#80848e"
                  : "",
            }}
          ></div>
        </div>

        <div className="flex flex-wrap gap-4">
          {discordData?.spotify && (
            <Color
              src={discordData.spotify.album_art_url as string}
              format="rgbString"
              crossOrigin="anonymous"
            >
              {({ data, loading }) => (
                <>
                  {discordData.spotify && !loading && (
                    <div
                      className="mt-4 w-full rounded-lg p-8 md:max-w-md"
                      style={{
                        backgroundColor: data?.replace(")", ", 0.7)"),
                      }}
                    >
                      <div className="mb-4 flex items-center space-x-4">
                        <Image
                          src={discordData.spotify.album_art_url as string}
                          alt={discordData.spotify.album}
                          width={50}
                          height={50}
                          className="rounded-lg shadow-lg"
                        />
                        <div>
                          <h1 className="text-lg font-semibold">
                            {discordData.spotify.song}
                          </h1>
                          <h2>{discordData.spotify.artist}</h2>
                        </div>
                      </div>
                      <div>
                        <div className="h-[10rem] overflow-hidden">
                          {qq?.success || netease?.result ? (
                            <Lrc
                              style={{ overflow: "hidden" }}
                              recoverAutoScrollInterval={0}
                              lrc={
                                qq?.success
                                  ? qq?.result
                                  : netease?.success
                                  ? netease?.result
                                  : ""
                              }
                              currentMillisecond={musicElapsed + 500}
                              verticalSpace={false}
                              className={`${
                                discordData.spotify.song.length > 50
                                  ? "h-[40rem]"
                                  : "h-[30rem]"
                              } `}
                              lineRenderer={({ active, line }) => (
                                <p
                                  className={`lyric-line ${
                                    active ? "active" : ""
                                  }`}
                                >
                                  {line.content}
                                </p>
                              )}
                            />
                          ) : null}
                        </div>
                        <p className="mt-2 text-xs text-zinc-400">
                          Lyrics provided by{" "}
                          {!qq?.success &&
                          netease?.success &&
                          netease?.lyricUser
                            ? `${netease.lyricUser as string} via`
                            : ""}{" "}
                          {qq?.success
                            ? "QQ Music"
                            : netease?.success
                            ? "Netease Music"
                            : ""}
                          .
                        </p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </Color>
          )}

          {discordData?.activities.map((activity) => {
            return (
              <>
                {activity.type !== 2 && (
                  <>
                    {activity.assets?.large_image ||
                    activity.assets?.small_image ? (
                      <>
                        <Color
                          src={
                            (activity.assets?.large_image.replace(
                              "mp:",
                              "https://media.discordapp.net/"
                            ) as string) ||
                            (activity.assets.small_image.replace(
                              "mp:",
                              "https://media.discordapp.net/"
                            ) as string)
                          }
                          format="rgbString"
                          crossOrigin="anonymous"
                        >
                          {({ data }) => (
                            <div
                              className="mt-4 flex w-full items-center rounded-lg p-8 md:max-w-sm"
                              style={{
                                backgroundColor: data?.replace(")", ", 0.7)"),
                              }}
                            >
                              <div className="flex items-center space-x-4">
                                <Image
                                  src={
                                    activity.assets?.large_image.replace(
                                      "mp:",
                                      "https://media.discordapp.net/"
                                    ) as string
                                  }
                                  alt={activity.assets?.large_text as string}
                                  width={50}
                                  height={50}
                                  className="rounded-lg shadow-lg"
                                />
                                <div>
                                  <h1 className="text-lg font-semibold">
                                    {activity.name}
                                  </h1>
                                  <h2 className="text-sm">
                                    {activity.details}
                                  </h2>
                                  <h3 className="text-xs">{activity.state}</h3>
                                </div>
                              </div>
                            </div>
                          )}
                        </Color>
                      </>
                    ) : (
                      <div className="mt-4 rounded-lg p-8 md:max-w-sm">
                        <div className="flex items-center space-x-4">
                          <div>
                            <h1 className="text-lg font-semibold">
                              {activity.name}
                            </h1>
                            <h2 className="text-sm">{activity.details}</h2>
                            <h3 className="text-xs">{activity.state}</h3>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
