import "../styles/globals.css";
import type { AppProps } from "next/app";
import localFont from "@next/font/local";
import Head from "next/head";

const billy = localFont({ src: "../fonts/Billy_2.0.ttf" });

export default function App({ Component, pageProps }: AppProps) {
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
        <Component {...pageProps} />
      </main>
    </>
  );
}
