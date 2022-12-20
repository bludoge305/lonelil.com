import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRef, useEffect } from "react";
import localFont from "@next/font/local";
import Head from "next/head";
import Script from "next/script";
import { useLanyard } from "react-use-lanyard";
import { loadCursor } from "../util/cursor";

const billy = localFont({ src: "../fonts/billy_2.0.woff2" });

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
        <meta name="theme-color" content="#3c455b" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          key="og_title"
          property="og:title"
          content={`lonelil's website`}
        />
        <meta
          key="twitter_title"
          property="twitter:title"
          content={`lonelil's website`}
        />
        <meta
          key="og_description"
          property="og:description"
          content={`welcome to lonelil's website!`}
        />
        <link
          key="oembed"
          type="application/json+oembed"
          href={encodeURI(
            `https://webembed.onrender.com/oembed?provider_name=lonelil.dev&provider_url=https://lonelil.dev/`
          )}
        />
      </Head>
      <Script id="fathom-load">
        {`(function(f, a, t, h, o, m){
    a[h]=a[h]||function(){
        (a[h].q=a[h].q||[]).push(arguments)
    };
    o=f.createElement('script'),
    m=f.getElementsByTagName('script')[0];
    o.async=1; o.src=t; o.id='fathom-script';
    m.parentNode.insertBefore(o,m)
})(document, window, '//better.lonelil.dev/tracker.js', 'fathom');
fathom('set', 'siteId', 'CDKEG');
fathom('trackPageview');`}
      </Script>
      <main className={`${billy.className} min-h-screen h-full`}>
        <Component {...pageProps} lonelil={lonelil} />
        <div
          ref={ballCanvas}
          className="ball-transitions pointer-events-none fixed z-30 h-6 w-6 rounded-full border border-black bg-transparent opacity-0 shadow-md duration-200 dark:border-white"
        />
      </main>
    </>
  );
}
