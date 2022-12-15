import "../styles/globals.css";
import type { AppProps } from "next/app";
import localFont from "@next/font/local";

const myFont = localFont({ src: "./Billy_2.0.ttf" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={myFont.className}>
      <Component {...pageProps} />
    </main>
  );
}
