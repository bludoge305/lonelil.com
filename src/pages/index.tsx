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
  const [musicLyrics, setMusicLyrics] = useState("");

  const { mutate: netease } = api.lyrics.netease.useMutation();
  //console.log(data);

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

  useEffect(() => {
    if (discordData?.spotify) {
      netease(
        {
          song: discordData.spotify.song,
          artist: discordData.spotify.artist.split("; ")[0] as string,
        },
        {
          onSuccess: (data) => {
            if (data.success) {
              setMusicLyrics(data.result);
            }
          },
        }
      );
    }
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
                        {musicLyrics && (
                          <Lrc
                            style={{ overflow: "hidden" }}
                            recoverAutoScrollInterval={0}
                            lrc={musicLyrics}
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
                        )}
                      </div>
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
