import "../styles/globals.css";
import type { AppProps } from "next/app";
import localFont from "@next/font/local";
import Head from "next/head";
import Script from "next/script";
import { useLanyard } from "react-use-lanyard";

const NeueHaasGroteskDisplay = localFont({
  src: [
    {
      path: "../fonts/NeueHaasGroteskDisplay/600.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/NeueHaasGroteskDisplay/700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

export default function App({ Component, pageProps }: AppProps) {
  const lonelil = useLanyard({
    userId: "603129750638034957",
    socket: true,
  });

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
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5836961899645264"
        strategy="beforeInteractive"
      ></Script>
      <Script id="fathom-load" strategy="lazyOnload">
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
      <main
        className={`${NeueHaasGroteskDisplay.className} min-h-screen h-full text-[#d4c2b6]`}
      >
        <Component {...pageProps} lonelil={lonelil} />
      </main>
    </>
  );
}
