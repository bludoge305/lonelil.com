import { LanyardData, useLanyard } from "react-use-lanyard";
import User from "@/components/home/user";
import Spotify from "@/components/home/spotify";
import Discord from "@/components/home/discord";
import Roblox from "@/components/home/roblox";
import Github from "@/components/home/github";
import Battery from "@/components/home/battery";
export default function Home() {
  const { loading, status } = useLanyard({
    userId: "603129750638034957",
    socket: true,
  });

  return (
    <div className="mx-auto grid max-w-4xl grid-cols-6 gap-6 px-6 pb-40 pt-12">
      <User loading={loading} status={status as LanyardData} />
      <Battery loading={loading} status={status as LanyardData} />
      <Spotify loading={loading} status={status as LanyardData} />
      <Roblox />
      <Github />
      <Discord loading={loading} status={status as LanyardData} />
    </div>
  );
}
