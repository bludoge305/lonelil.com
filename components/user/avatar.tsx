import Image from "../Image";

export default function Avatar({ user }: any) {
  return (
    <div className="avatar">
      <div
        className={`w-14 rounded-full ring ring-${
          user.discord_status ? user.discord_status : "ring-primary"
        }`}
      >
        <Image
          src={`https://cdn.discordapp.com/avatars/${user.discord_user.id}/${user.discord_user.avatar}.webp`}
          alt={user.discord_user.username}
          width={128}
          height={128}
        />
      </div>
      {user.discord_user.avatar_decoration ? (
        <Image
          src={`https://cdn.discordapp.com/avatar-decorations/${user.discord_user.id}/${user.discord_user.avatar_decoration}.webp`}
          className="absolute scale-125"
          alt={`${user.discord_user.username}'s Avatar Decoration`}
          width={70}
          height={70}
        />
      ) : null}
    </div>
  );
}
