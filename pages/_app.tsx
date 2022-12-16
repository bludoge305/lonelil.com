import "../styles/globals.css";
import type { AppProps } from "next/app";
import localFont from "@next/font/local";

const billy = localFont({ src: "../fonts/Billy_2.0.ttf" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${billy.className} min-h-screen`}>
      <Component {...pageProps} />
    </main>
  );
}
