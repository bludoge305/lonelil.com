export default function Avatar({ user }: any) {
  return (
    <div className="avatar">
      <div
        className={`w-14 rounded-full ring ring-${
          user.discord_status ? user.discord_status : "ring-primary"
        }`}
      >
        <img
          src={`https://cdn.discordapp.com/avatars/${user.discord_user.id}/${user.discord_user.avatar}.webp`}
          loading="lazy"
          alt={user.discord_user.username}
        ></img>
      </div>
      {user.discord_user.avatar_decoration ? (
        <img
          src={`https://cdn.discordapp.com/avatar-decorations/${user.discord_user.id}/${user.discord_user.avatar_decoration}.webp`}
          loading="lazy"
          className="absolute scale-125"
          alt={`${user.discord_user.username}'s Avatar Decoration`}
        ></img>
      ) : null}
    </div>
  );
}
