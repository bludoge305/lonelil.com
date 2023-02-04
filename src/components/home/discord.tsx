import { LanyardData } from "react-use-lanyard";
import Image from "next/image";
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
              <div
                className="relative col-span-3 flex h-52 overflow-hidden rounded-2xl md:col-span-2"
                key={i}
              >
                <div className="flex flex-1 flex-col justify-between p-6 text-white">
                  {a.assets.large_image && (
                    <div className="absolute inset-0 -z-10">
                      <Image
                        src={
                          a.assets.large_image.startsWith("mp:external")
                            ? a.assets.large_image.replace(
                                "mp:external",
                                "https://media.discordapp.net/external"
                              )
                            : `https://cdn.discordapp.com/app-assets/${a.application_id}/${a.assets.large_image}`
                        }
                        className="bg-black object-cover brightness-50"
                        fill
                        alt={a.assets.large_text}
                      />
                    </div>
                  )}
                  <div className="flex justify-between">
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
                  </div>

                  <div className="space-y-0.5">
                    <h2 className="font-title font-bold">{a.name}</h2>
                    <p className="text-sm">{a.state}</p>
                    <p className="text-xs">{a.details}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      ) : null}
    </>
  );
}
