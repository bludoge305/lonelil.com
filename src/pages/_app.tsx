import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import localFont from "next/font/local";
import { NextSeo } from "next-seo";

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
    <main className={`min-h-[100dvh] overflow-hidden ${GoogleSans.className}`}>
      <NextSeo
        title="lonelil"
        description="Explore my personal portfolio and blog on lonelil.dev. Learn more about my projects and experiences as a skilled developer, and discover how I can help you achieve your technology goals. "
        openGraph={{
          siteName: "lonelil.dev",
        }}
        twitter={{
          handle: "@lonelilpublic",
          site: "@lonelilpublic",
          cardType: "summary_large_image",
        }}
        themeColor="#111"
      />
      <Component {...pageProps} />
    </main>
  );
};

export default api.withTRPC(MyApp);
