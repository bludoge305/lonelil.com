import Image from "next/image";
import { ignoreLoader } from "../../lib/ignoreLoader";

export default function Avatar({ user, footer }: any) {
  return (
    <div className="avatar">
      <div
        className={`${footer ? "w-9" : "w-14"} rounded-full ring ring-${
          user.discord_status
        }`}
      >
        <Image
          src={`https://cdn.discordapp.com/avatars/${user.discord_user.id}/${user.discord_user.avatar}.webp?size=160`}
          alt={user.discord_user.username}
          width={128}
          height={128}
        />
      </div>
      {user.discord_user.avatar_decoration ? (
        <Image
          loader={ignoreLoader}
          src={`https://cdn.discordapp.com/avatar-decorations/${user.discord_user.id}/${user.discord_user.avatar_decoration}.png`}
          className="absolute scale-125"
          alt={`${user.discord_user.username}'s Avatar Decoration`}
          width={70}
          height={70}
        />
      ) : null}
    </div>
  );
}
