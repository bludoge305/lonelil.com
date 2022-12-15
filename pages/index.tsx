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
        <div className="lg:col-span-7 lg:inline-grid hidden"></div>
      </div>
    </>
  );
}
