import { SiGithub } from "react-icons/si";
import { HiOutlineExternalLink } from "react-icons/hi";
import Image from "next/image";
export default function Github() {
  return (
    <>
      <a
        href={"https://github.com/lonelil"}
        target="_blank"
        rel="noreferrer"
        className="relative col-span-3 flex h-52 overflow-hidden rounded-2xl md:col-span-2"
      >
        <div className="flex flex-1 flex-col justify-between p-6 text-white">
          <div className="absolute inset-0 -z-10">
            <Image
              src={"/github-hacker.gif"}
              className="object-cover brightness-50"
              fill
              alt="Hacker"
            />
          </div>

          <div className="flex justify-between">
            <SiGithub className="text-2xl" />
            <HiOutlineExternalLink className="text-xl opacity-50 transition duration-500 group-hover:opacity-100" />
          </div>

          <div className="space-y-0.5">
            <h2 className="font-title font-bold">Github</h2>

            <p className="text-sm">where my funny projects goes.</p>
          </div>
        </div>
      </a>
    </>
  );
}
