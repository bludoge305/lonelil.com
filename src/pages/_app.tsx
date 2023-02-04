import { type AppType } from "next/app";
import "../styles/globals.css";
import localFont from "@next/font/local";
import Head from "next/head";
const GoogleSans = localFont({
  src: [
    {
      path: "../fonts/GoogleSans/400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/GoogleSans/500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/GoogleSans/600.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/GoogleSans/700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
});
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>lonelil.dev</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <main
        className={`${GoogleSans.className}`}
      >
        <Component {...pageProps} />
      </main>
    </>
  );
};

export default MyApp;
