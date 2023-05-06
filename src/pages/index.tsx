import { type NextPage } from "next";
import { useEffect, useState } from "react";
import { useLanyardWS } from "use-lanyard";
import { api } from "~/utils/api";
import { Lrc } from "react-lrc";
import Image from "next/image";
import Color from "color-thief-react";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import Link from "next/link";

function getDiscordRPCAsset(input: string, applicationID: any) {
  return input.includes("mp")
    ? input.replace("mp:", "https://media.discordapp.net/")
    : `https://cdn.discordapp.com/app-assets/${
        applicationID as string
      }/${input}.png`;
}

const navbarLinks = [
  {
    name: "Github",
    href: "https://github.com/lonelil",
  },
];

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
      <div className="flex flex-row items-center gap-2">
        {discordData?.discord_user.avatar && (
          <Image
            src={`https://cdn.discordapp.com/avatars/${discordData.discord_user.id}/${discordData.discord_user.avatar}.png`}
            alt="Avatar"
            width={40}
            height={40}
            className={`rounded-full ring ring-${discordData.discord_status} mr-1`}
          />
        )}
        <h1 className="text-2xl font-semibold">lonelil</h1>
        <svg
          fill="none"
          height="32"
          shape-rendering="geometricPrecision"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1"
          viewBox="0 0 24 24"
          width="32"
          className="block min-h-[32px] min-w-[32px] text-zinc-400"
        >
          <path d="M16.88 3.549L7.12 20.451"></path>
        </svg>
        {navbarLinks.map((link, i: number) => (
          <Link
            href={link.href}
            key={i}
            rel={link.href.startsWith("https") ? "noopener noreferrer" : ""}
            target={link.href.startsWith("https") ? "_blank" : ""}
            className="rounded-md px-4 py-2 font-semibold shadow-sm transition ease-in-out hover:bg-[#464444]"
          >
            {link.name}
          </Link>
        ))}
        {discordData?.kv.battery && (
          <div className="ml-auto flex items-center gap-1">
            <HiOutlineDevicePhoneMobile />
            <span className="text-sm">
              {JSON.parse(discordData.kv.battery).battery as string}%
            </span>
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
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
                    className="w-full rounded-lg p-8 md:max-w-md"
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
                              discordData.spotify.song.length > 35
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
                        {!qq?.success && netease?.success && netease?.lyricUser
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
                          getDiscordRPCAsset(
                            activity.assets?.large_image,
                            activity.application_id
                          ) ||
                          getDiscordRPCAsset(
                            activity.assets?.small_image,
                            activity.application_id
                          )
                        }
                        format="rgbString"
                        crossOrigin="anonymous"
                      >
                        {({ data }) => (
                          <div
                            className="flex w-full items-center rounded-lg p-8 md:max-w-sm"
                            style={{
                              backgroundColor: data?.replace(")", ", 0.7)"),
                            }}
                          >
                            <div className="flex items-center space-x-4">
                              <Image
                                src={getDiscordRPCAsset(
                                  activity.assets?.large_image as string,
                                  activity.application_id
                                )}
                                alt={activity.assets?.large_text as string}
                                width={50}
                                height={50}
                                className="rounded-lg shadow-lg"
                              />
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
                      </Color>
                    </>
                  ) : (
                    <div className="w-full rounded-lg p-8 md:max-w-sm">
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
  );
};

export default Home;
