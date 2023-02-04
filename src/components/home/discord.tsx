import { LanyardData } from "react-use-lanyard";
import Image from "next/image";
import { HiOutlineExternalLink } from "react-icons/hi";
import { SiDiscord } from "react-icons/si";

export default function Discord({
  loading,
  status,
}: {
  loading: boolean;
  status: LanyardData;
}) {
  return (
    <>
      {!loading ? (
        <>
          {status.activities.map((a: any, i: number) => {
            if (a.type === 2) return;
            return (
              <div className="relative col-span-3 flex h-full overflow-hidden rounded-2xl md:col-span-2">
                <span className="flex flex-1 flex-col justify-between p-6 text-white">
                  {a.assets.large_image && (
                    <span className="absolute inset-0 -z-10">
                      <Image
                        src={
                          a.assets.large_image.startsWith("mp:external")
                            ? a.assets.large_image.replace(
                                "mp:external",
                                "https://media.discordapp.net/external"
                              )
                            : `https://cdn.discordapp.com/app-assets/${a.application_id}/${a.assets.large_image}`
                        }
                        className="bg-white brightness-50"
                        fill
                        alt={a.assets.large_text}
                        style={{ objectFit: "cover" }}
                      />
                    </span>
                  )}
                  <span className="flex justify-between">
                    <SiDiscord className="text-2xl" />
                    {a.assets.small_image && (
                      <Image
                        src={
                          a.assets.small_image.startsWith("mp:external")
                            ? a.assets.small_image.replace(
                                "mp:external",
                                "https://media.discordapp.net/external"
                              )
                            : `https://cdn.discordapp.com/app-assets/${a.application_id}/${a.assets.small_image}`
                        }
                        alt={a.assets.small_image}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                    )}
                  </span>

                  <div className="space-y-0.5">
                    <h2 className="font-title font-bold">{a.name}</h2>
                    <p className="text-sm">{a.state}</p>
                    <p className="text-xs">{a.details}</p>
                  </div>
                </span>
              </div>
            );
          })}
        </>
      ) : null}
    </>
  );
}
