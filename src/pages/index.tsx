import Image from "next/image";
import { useLanyard } from "react-use-lanyard";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { Oval } from "react-loader-spinner";

export default function Home() {
  const { loading, status } = useLanyard({
    userId: "603129750638034957",
    socket: true,
  });

  return (
    <>
      <div className="col-span-4 flex items-center justify-center overflow-hidden rounded-2xl bg-[#bd936c] dark:bg-[#b9885f] dark:backdrop-blur-2xl md:col-span-4 md:h-52">
        <div className="flex flex-col items-center space-y-4 py-8 px-6 md:flex-row md:space-y-0 md:space-x-4">
          {!loading ? (
            <>
              <Image
                src={`https://cdn.discordapp.com/avatars/${status?.discord_user.id}/${status?.discord_user.avatar}.webp?size=4096`}
                height={96}
                width={96}
                className="h-24 w-24 rounded-full border-2 object-cover"
                alt={status?.discord_user.username || "lonelil"}
                style={{
                  borderColor: `#${
                    status?.discord_status == "online"
                      ? "3ba55d"
                      : status?.discord_status == "idle"
                      ? "faa819"
                      : status?.discord_status == "dnd"
                      ? "ed4043"
                      : status?.discord_status == "offline"
                      ? "737e8c"
                      : null
                  }`,
                }}
              />

              <div className="space-y-1 text-center text-black md:text-left">
                <h1 className="text-xl font-bold tracking-tight">lonelil</h1>
                <p>full stack dev</p>
              </div>
            </>
          ) : (
            <Oval
              height={80}
              width={80}
              color="black"
              visible={true}
              secondaryColor="black"
            />
          )}
        </div>
      </div>
      <div className="col-span-2 flex items-center justify-center rounded-2xl bg-[#49d663] text-4xl text-black">
        <HiOutlineDevicePhoneMobile /> 50%
      </div>
    </>
  );
}
