import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavRail from "./ui/NavRail";
import Footer from "./ui/footer";
import TokenProvider from "./lib/contexts/tokenContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const LINKS = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Reservation", href: "/reservation" },
    { name: "Login", href: "/login" },
  ];
  return (
    <html lang="en">
      <body className={inter.className}>
        <TokenProvider>
          <NavRail links={LINKS}></NavRail>
          {children}
        </TokenProvider>
        <Footer />
      </body>
    </html>
  );
}
