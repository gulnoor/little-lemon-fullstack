import type { Metadata } from "next";
import "./globals.css";
import dynamic from "next/dynamic";
import RootComponent from "./ui/RootComponent";

// const NoSSRTokenProvider = dynamic(() => import("./lib/contexts/tokenContext"), { ssr: false });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootComponent>{children}</RootComponent>;
}
