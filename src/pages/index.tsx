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
        <h1 className="text-2xl font-semibold">lonelil</h1>

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
                    className="mt-4 max-w-md rounded-lg p-8"
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
                        className="rounded-lg"
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
                        {!qq?.success && netease?.success && netease.lyricUser
                          ? `${netease.lyricUser} via`
                          : ""}{" "}
                        {qq?.success ? "QQ Music" : "Netease Music"}
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </Color>
        )}
      </div>
    </div>
  );
};

export default Home;
