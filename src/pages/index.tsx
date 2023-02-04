import { LanyardData, useLanyard } from "react-use-lanyard";
import User from "@/components/home/user";
import Spotify from "@/components/home/spotify";
import Discord from "@/components/home/discord";
import Roblox from "@/components/home/roblox";
import Battery from "@/components/home/battery";
export default function Home() {
  const { loading, status } = useLanyard({
    userId: "603129750638034957",
    socket: true,
  });

  return (
    <>
      <User loading={loading} status={status as LanyardData} />
      <Spotify loading={loading} status={status as LanyardData} />
      <Discord loading={loading} status={status as LanyardData} />
      <Roblox />
      <Battery />
    </>
  );
}
