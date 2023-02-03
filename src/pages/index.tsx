import Image from "next/image";
import { useLanyard } from "react-use-lanyard";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { HiOutlineExternalLink } from "react-icons/hi";
import { SiSpotify } from "react-icons/si";
import { Oval } from "react-loader-spinner";
import statusToColor from "@/utils/statusToColor";

export default function Home() {
  const { loading, status } = useLanyard({
    userId: "603129750638034957",
    socket: true,
  });

  return (
    <>
      <div className="col-span-3 flex items-center justify-center overflow-hidden rounded-2xl bg-[#bd936c] dark:bg-[#b9885f] dark:backdrop-blur-2xl md:col-span-4 md:h-52">
        <div className="flex flex-col items-center space-y-4 py-8 px-6 md:flex-row md:space-y-0 md:space-x-4">
          {!loading ? (
            <Image
              src={`https://cdn.discordapp.com/avatars/${status?.discord_user.id}/${status?.discord_user.avatar}.webp?size=4096`}
              height={96}
              width={96}
              className="h-24 w-24 rounded-full border-2 object-cover"
              alt={status?.discord_user.username || "lonelil"}
              style={{
                borderColor: statusToColor(status?.discord_status),
              }}
            />
          ) : (
            <Oval
              height={80}
              width={80}
              color="black"
              visible={true}
              secondaryColor="black"
            />
          )}

          <div className="space-y-1 text-center text-black md:text-left">
            <h1 className="text-xl font-bold tracking-tight">lonelil</h1>
            <p>full stack dev</p>
          </div>
        </div>
      </div>

      
          {status?.listening_to_spotify ? (
            <a
              href={`https://song.link/s/${status?.spotify?.track_id}`}
              className="relative col-span-3 flex h-full overflow-hidden rounded-2xl md:col-span-2"
            >
              <span className="absolute inset-0 -z-10">
                <Image
                  src={status?.spotify?.album_art_url || ""}
                  className="bg-black brightness-50"
                  fill
                  alt="Album cover art"
                  style={{ objectFit: "cover" }}
                />
              </span>

              <span className="flex flex-1 flex-col justify-between p-6 text-white">
                <span className="flex justify-between">
                  <SiSpotify className="text-2xl" />
                  <HiOutlineExternalLink className="text-xl opacity-50 transition duration-500 group-hover:opacity-100" />
                </span>

                <div className="space-y-0.5">
                  <h2 className="font-title font-bold">
                    {status?.spotify?.song}
                  </h2>

                  <p className="text-sm">
                    by {status?.spotify?.artist} on {status?.spotify?.album}.
                  </p>
                </div>
              </span>
            </a>
          ) : (
            <div className="relative col-span-3 flex h-full overflow-hidden rounded-2xl md:col-span-2">
              <span className="flex flex-1 flex-col justify-between p-6 text-white">
                <span className="flex justify-between">
                  <SiSpotify className="text-2xl" />
                  <HiOutlineExternalLink className="text-xl opacity-50 transition duration-500 group-hover:opacity-100" />
                </span>

                <div className="space-y-0.5">
                  <h2 className="font-title font-bold">Nothing</h2>

                  <p className="text-sm">lonelil is not using spotify.</p>
                </div>
              </span>
            </div>
          )}
       

      <div className="col-span-2 flex h-52 items-center justify-center rounded-2xl bg-[#49d663] text-4xl text-black">
        <HiOutlineDevicePhoneMobile /> 50%
      </div>
    </>
  );
}
