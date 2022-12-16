import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRef, useEffect } from "react";
import localFont from "@next/font/local";
import Head from "next/head";
import { useLanyard } from "react-use-lanyard";
import { loadCursor } from "../util/cursor";

const billy = localFont({ src: "../fonts/Billy_2.0.ttf" });
//@ts-ignore
export default function App({ Component, pageProps }: AppProps) {
  const lonelil = useLanyard({
    userId: "603129750638034957",
    socket: true,
  });
  const ballCanvas = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typeof window === "undefined" || !ballCanvas.current) {
      return;
    }

    return loadCursor(ballCanvas.current);
  }, []);
  return (
    <>
      <Head>
        <title>lonelil</title>
        <meta name="description" content="lonelil's website" />
        <link
          type="application/json+oembed"
          href="https://lonelil.dev/assets/oembed.json"
        />
        <meta name="theme-color" content="#3c455b" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={`${billy.className} min-h-screen`}>
        <Component {...pageProps} lonelil={lonelil} />
        <div
          ref={ballCanvas}
          className="ball-transitions pointer-events-none fixed z-30 h-6 w-6 rounded-full border border-black bg-transparent opacity-0 shadow-md duration-200 dark:border-white"
        />
      </main>
    </>
  );
}
