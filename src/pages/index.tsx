import { type NextPage } from "next";
import { useEffect, useState } from "react";
import { useLanyardWS } from "use-lanyard";
import { api } from "~/utils/api";
import { Lrc } from "react-lrc";
import Image from "next/image";
import Color from "color-thief-react";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import Link from "next/link";

import { FaDiscord, FaGithub, FaTwitter } from "react-icons/fa";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getDiscordRPCAsset(input: string, applicationID: any) {
  return input.includes("mp")
    ? input.replace("mp:", "https://media.discordapp.net/")
    : `https://cdn.discordapp.com/app-assets/${
        applicationID as string
      }/${input}.png`;
}

const linksCard = [
  {
    title: "GitHub",
    description:
      "Here you can find all my projects and contributions to other projects.",
    icon: FaGithub,
    href: "https://github.com/lonelil",
    color: "#24292f",
  },
  {
    title: "Discord",
    description: "My Discord to contact me or just to chat with me.",
    icon: FaDiscord,
    href: "https://discord.com/users/603129750638034957",
    color: "#5865F2",
  },
  {
    title: "Twitter",
    description: "My Twitter to contact me or just to chat with me.",
    icon: FaTwitter,
    href: "https://twitter.com/lonelilpublic",
    color: "#1DA1F2",
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

        {discordData?.kv.battery && (
          <div className="ml-auto flex items-center gap-1">
            <HiOutlineDevicePhoneMobile />
            <span className="text-sm">
              {discordData.kv.battery
                .replace(`{"battery":"`, "")
                .replace(`"}`, "")}
              %
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
                            className="flex w-full items-center rounded-lg p-8 md:max-w-md"
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
                    <div className="w-full rounded-lg p-8 md:max-w-md">
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

        {linksCard.map((link, i: number) => {
          return (
            <Link
              className="flex w-full items-center rounded-lg p-8 md:max-w-md"
              href={link.href}
              key={i}
              rel={link.href.startsWith("https") ? "noopener noreferrer" : ""}
              target={link.href.startsWith("https") ? "_blank" : ""}
              style={{
                backgroundColor: link.color,
              }}
            >
              <div className="flex items-center space-x-4">
                <link.icon size={50} />
                <div>
                  <h1 className="text-lg font-semibold">{link.title}</h1>
                  <h2 className="text-sm">{link.description}</h2>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
