import "./globals.css";
import localFont from "@next/font/local";
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
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body
        className={`${GoogleSans.className} mx-auto grid max-w-4xl grid-cols-6 gap-6 px-6 pb-40 pt-12`}
      >
        {children}
      </body>
    </html>
  );
}
