import type { Metadata } from "next";
import localFont from "next/font/local";

import "@/styles/globals.css";
import "@arco-design/web-react/dist/css/arco.css";

import { defaultMetadata } from "@/lib/seo";
// 可以判断一下 管理系统 可以不用这个
export const metadata: Metadata = defaultMetadata;
const geistSans = localFont({
  src: "../styles/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../styles/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
