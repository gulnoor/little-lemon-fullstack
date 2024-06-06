import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import TokenProvider from "../lib/contexts/tokenContext";
import NavRail from "./NavRail";
import Footer from "./footer";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const LINKS = [
  {
    name: "Home",
    href: "/",
    image: "/assets/nav-icons/home_FILL0_wght400_GRAD0_opsz24 (1).svg",
  },
  {
    name: "Menu",
    href: "/menu",
    image: "/assets/nav-icons/restaurant_menu_FILL0_wght400_GRAD0_opsz24.svg",
  },
  {
    name: "Reservation",
    href: "/reservation",
    image: "/assets/nav-icons/table_restaurant_FILL0_wght400_GRAD0_opsz24.svg",
  },
];
const RootComponent = ({children}) => {
  return (
    <html lang="en">
      <AppRouterCacheProvider>
        <body className={`${inter.className}`}>
          <TokenProvider>
            <NavRail links={LINKS}></NavRail>
            <main className="md:ml-[136px]">{children}</main>
            <Footer />
          </TokenProvider>
        </body>
      </AppRouterCacheProvider>
    </html>
  );
};

export default RootComponent;
