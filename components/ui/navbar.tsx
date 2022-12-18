import Link from "next/link";

export default function Navbar({ lonelil }: any) {
  return (
    <div className="navbar bg-base-100 min-h-0 h-12">
      <div className="navbar-start">
        <a className="btn btn-ghost btn-circle avatar">
          <Link className="w-8 rounded-full" href="/">
            <div className="avatar">
              <div
                className={`w-8 rounded-full ring ring-${
                  !lonelil.loading
                    ? lonelil.status.discord_status
                    : "ring-primary"
                } ring-offset-base-100 ring-offset-2`}
              >
                {!lonelil.loading ? (
                  <>
                    <img
                      src={`https://cdn.discordapp.com/avatars/${lonelil.status.discord_user.id}/${lonelil.status.discord_user.avatar}.webp`}
                      loading="lazy"
                      alt={lonelil.status.discord_user.username}
                    ></img>
                  </>
                ) : null}
              </div>
              {!lonelil.loading &&
              lonelil.status.discord_user.avatar_decoration ? (
                <img
                  src={`https://cdn.discordapp.com/avatar-decorations/${lonelil.status.discord_user.id}/${lonelil.status.discord_user.avatar_decoration}.webp`}
                  loading="lazy"
                  className="absolute scale-150"
                  alt={`${lonelil.status.discord_user.username}'s Avatar Decoration`}
                ></img>
              ) : null}
            </div>
          </Link>
        </a>
      </div>
    </div>
  );
}
