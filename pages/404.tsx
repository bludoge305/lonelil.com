import Link from "next/link";

export default function Custom404() {
  return (
    <section className="flex h-full items-center p-16">
      <div className="container mx-auto my-8 flex flex-col items-center justify-center px-5">
        <div className="max-w-md text-center">
          <h2 className="mb-8 text-9xl font-extrabold text-primary">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">Sorry</p>
          <p className="mt-4 mb-8 text-xl">
            We couldn&apos;t find the page that you&apos;re looking for!
          </p>
          <Link
            href={"/"}
            className="rounded bg-primary px-8 py-3 font-semibold"
          >
            Home Page
          </Link>
        </div>
      </div>
    </section>
  );
}
