import { LanyardData } from "react-use-lanyard";
import Image from "next/image";
import { Oval } from "react-loader-spinner";
import statusToColor from "@/utils/statusToColor";

export default function User({
  loading,
  status,
}: {
  loading: boolean;
  status: LanyardData;
}) {
  return (
    <div className="col-span-6 flex items-center justify-center overflow-hidden rounded-2xl bg-[#bd936c] dark:bg-[#b9885f] dark:backdrop-blur-2xl md:col-span-4 md:h-52">
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
  );
}
