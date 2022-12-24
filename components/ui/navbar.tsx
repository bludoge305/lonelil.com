import Link from "next/link";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import { HiBars3 } from "react-icons/hi2";
import { AiOutlineUser } from "react-icons/ai";

export default function Navbar() {
  const scrollPosition = useScrollPosition();

  return (
    <div
      className={`navbar sticky top-0 z-50 transition-colors ${
        scrollPosition > 0
          ? "bg-opacity-60 bg-clip-padding shadow-none backdrop-blur-xl backdrop-filter"
          : "bg-base-200 shadow"
      }`}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn-ghost btn-circle btn">
            <HiBars3 size={30} />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-primary p-2 shadow"
          >
            <li>
              <Link href={"/"}>Homepage</Link>
            </li>
            <li>
              <Link href={"/links"}>Links</Link>
            </li>
            <li>
              <Link href={"/projects"}>Projects</Link>
            </li>
            <li>
              <Link href={"/blog"}>Blog</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <p className="text-xl normal-case">lonelil</p>
      </div>
      <div className="navbar-end">
        <Link href={"/links"} className="btn-ghost btn-circle btn">
          <AiOutlineUser size={30} />
        </Link>
      </div>
    </div>
  );
}
