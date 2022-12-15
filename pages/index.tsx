import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>lonelil</title>
        <meta name="description" content="lonelil's website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="py-28 grid grid-cols-12">
        <div className="col-auto inline-grid"></div>
        <div className="col-span-3 inline-grid">
          <div className="mb-10">
            <h1 className="text-6xl">lonelil</h1>
            <p className="text-3xl mt-2">welcome to my website!</p>
          </div>
          <div>
            <h1 className="text-4xl">my blog:</h1>
            <div className="mt-5">
              <div className="card w-96 bg-base-100 shadow-xl image-full">
                <figure>
                  <img src="" alt="Image" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">Example Post</h2>
                  <p>Example Post</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-6 lg:inline-grid hidden"></div>
        <div className="lg:col-span-2 lg:inline-grid lg:items-center lg:justify-center hidden">
          <div className="bg-gray-900 h-[40rem] w-24 flex flex-col items-center justify-center rounded-2xl">
            <a
              href="https://github.com/lonelil"
              className="cursor-pointer"
            >
              <div className="relative flex justify-center items-centers">
                <img
                  src="/icons/Github.webp"
                  className="w-20 h-20 mt-[7.5px] mb-[7.5px] rounded-2xl"
                  width="75"
                  height="75"
                  alt=""
                />
              </div>
            </a>
            <a
              href="https://discord.com/users/603129750638034957"
              className="cursor-pointer"
            >
              <div className="relative flex justify-center items-centers">
                <img
                  src="/icons/Discord.webp"
                  className="w-20 h-20 mt-[7.5px] mb-[7.5px] rounded-2xl"
                  width="75"
                  height="75"
                  alt=""
                />
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
