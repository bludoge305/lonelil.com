import "../styles/globals.css";
import type { AppProps } from "next/app";
import localFont from "@next/font/local";
import Head from "next/head";
import { useLanyard } from "react-use-lanyard";

const billy = localFont({ src: "../fonts/Billy_2.0.ttf" });
//@ts-ignore
export default function App({ Component, pageProps }: AppProps) {
  const lonelil = useLanyard({
    userId: "603129750638034957",
    socket: true,
  });
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
      </main>
    </>
  );
}
