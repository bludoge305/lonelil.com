import { LanyardData } from "react-use-lanyard";
import Image from "next/image";
import { HiOutlineExternalLink } from "react-icons/hi";
import { SiSpotify } from "react-icons/si";

export default function Spotify({
  loading,
  status,
}: {
  loading: boolean;
  status: LanyardData;
}) {
  return (
    <>
      {status?.listening_to_spotify ? (
        <a
          href={`https://song.link/s/${status?.spotify?.track_id}`}
          target="_blank"
          rel="noreferrer"
          className="relative col-span-3 flex h-52 overflow-hidden rounded-2xl md:col-span-2"
        >
          <div className="absolute inset-0 -z-10">
            <Image
              src={status?.spotify?.album_art_url || ""}
              className="object-cover brightness-50 "
              fill
              alt={status?.spotify?.song || "Album"}
            />
          </div>

          <div className="flex flex-1 flex-col justify-between p-6 text-white">
            <div className="flex justify-between">
              <SiSpotify className="text-2xl" />
              <HiOutlineExternalLink className="text-xl opacity-50" />
            </div>

            <div className="space-y-0.5">
              <h2 className="font-title font-bold">{status?.spotify?.song}</h2>
              <p className="text-sm">
                by {status?.spotify?.artist} on {status?.spotify?.album}.
              </p>
            </div>
          </div>
        </a>
      ) : (
        <div className="relative col-span-3 flex h-52 overflow-hidden rounded-2xl md:col-span-2">
          <div className="flex flex-1 flex-col justify-between p-6 text-white">
            <div className="absolute inset-0 -z-10">
              <Image
                src={"roblox-backgrounds/dark.png"}
                className="object-cover brightness-50 "
                fill
                alt={"Background"}
              />
            </div>

            <div className="flex justify-between">
              <SiSpotify className="text-2xl" />
              <HiOutlineExternalLink className="text-xl opacity-50 transition duration-500 group-hover:opacity-100" />
            </div>

            <div className="space-y-0.5">
              <h2 className="font-title font-bold">Nothing</h2>

              <p className="text-sm">lonelil is not using spotify.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
