import { Oval } from "react-loader-spinner";
import Avatar from "../components/user/avatar";
import Image from "next/image";
import { AiFillGithub } from "react-icons/ai";
import { FaDiscord, FaSpotify, FaTwitter } from "react-icons/fa";

export default function Links({ lonelil }: any) {
  return (
    <section className="h-full min-h-screen items-center py-16 lg:px-96">
      <div className="container mx-auto flex flex-col items-center justify-center">
        <div className="max-w-md text-center">
          {!lonelil.loading ? (
            <Avatar user={lonelil.status} links={true} />
          ) : (
            <Oval
              height={96}
              width={96}
              color="#4c3b2d"
              visible={true}
              secondaryColor="#4c3b2d"
            />
          )}

          <div className="mt-4 flex items-center">
            <div>
              <div className="text-3xl">
                lonelil
                <div
                  className="tooltip tooltip-primary"
                  data-tip="This account is verified because it's notable."
                >
                  <Image
                    src="/images/verified.svg"
                    width={20}
                    height={20}
                    alt={"verified"}
                    className="mb-1.5 ml-1 inline-block"
                  />
                </div>
              </div>
              <span>dev</span>
            </div>
          </div>
        </div>
        <div className="mt-10 w-full px-4">
          <p className="mb-4 text-center">Featured</p>

          <a
            className="btn-primary btn-block btn mb-5 gap-1 hover:btn-secondary"
            href="https://github.com/lonelil"
            target={"_blank"}
            rel={"noreferrer"}
          >
            <AiFillGithub size={21} />
            Github
          </a>
          <a
            className="btn-primary btn-block btn mb-5 gap-1 hover:btn-secondary"
            href="https://discord.com/users/603129750638034957"
            target={"_blank"}
            rel={"noreferrer"}
          >
            <FaDiscord size={21} />
            Discord
          </a>
          <a
            className="btn-primary btn-block btn mb-5 gap-1 hover:btn-secondary"
            href="https://open.spotify.com/user/313nbftyxt3lhn2htnz2tsmvaz4m"
            target={"_blank"}
            rel={"noreferrer"}
          >
            <FaSpotify size={21} />
            Spotify
          </a>
          <a
            className="btn-primary btn-block btn mb-5 gap-1 hover:btn-secondary"
            href="https://twitter.com/lonelilpublic"
            target={"_blank"}
            rel={"noreferrer"}
          >
            <FaTwitter size={21} />
            Twitter
          </a>
        </div>
      </div>
    </section>
  );
}
