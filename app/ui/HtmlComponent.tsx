import TokenProvider from "../lib/contexts/tokenContext";
import NavRail from "./NavRail";
import { Inter } from "next/font/google";
import Footer from "./footer";
import { useContext, useRef } from "react";
import { ThemeContext as MyThemeContext } from "../lib/contexts/themeContext";

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
const HtmlComponent = ({ children }) => {
  const { theme } = useContext(MyThemeContext);
  const htmlRef = useRef(null);

  // const cssvarstheme = experimental_extendTheme({
  //   colorSchemes: {
  //     light: {
  //       palette: {
  //         primary: {
  //           main: "rgb(111 93 14)",
  //           contrastText: "rgb(255 255 255)",
  //         },
  //         secondary: {
  //           main: "rgb(103 94 64)",
  //         },
  //         error: {
  //           main: "rgb(186 26 26)",
  //         },
  //       },
  //     },
  //     dark: {
  //       palette: {
  //         primary: {
  //           main: "rgb(221 198 110)",
  //           contrastText: "rgb(58 48 0)",
  //         },
  //         secondary: {
  //           main: "rgb(210 198 161)",
  //         },
  //         error: {
  //           main: "rgb(255 180 171)",
  //         },
  //       },
  //     },
  //   },
  //   components: {
  //     MuiButton: {
  //       variants: [
  //         {
  //           props: {
  //             variant: "contained",
  //           },
  //           style: {
  //             borderRadius: "999px",
  //             minHeight: "48px",
  //           },
  //         },
  //         {
  //           props: {
  //             variant: "outlined",
  //           },
  //           style: {
  //             border: "2px solid",
  //             borderRadius: "999px",
  //             boxSizing: "border-box",
  //             minHeight: "48px",
  //             "&:hover": {
  //               border: "2px solid",
  //             },
  //           },
  //         },
  //       ],
  //     },
  //   },
  // });

  // const MUItheme = useMemo(
  //   () =>
  //     createTheme({
  //       palette: {
  //         mode: theme,
  //         primary: {
  //           main: theme === "light" ? "rgb(111 93 14)" : "rgb(221 198 110)",
  //           // light: will be calculated from palette.primary.main,
  //           // dark: will be calculated from palette.primary.main,
  //           contrastText:
  //             theme === "light" ? "rgb(255 255 255)" : "rgb(58 48 0)",
  //         },
  //         secondary: {
  //           main: theme === "light" ? "rgb(103 94 64)" : "rgb(210 198 161)",
  //         },
  //         error: {
  //           main: theme === "light" ? "rgb(186 26 26)" : "rgb(255 180 171)",
  //         },
  //       },
  //       components: {
  //         MuiButton: {
  //           variants: [
  //             {
  //               props: {
  //                 variant: "contained",
  //               },
  //               style: {
  //                 borderRadius: "999px",
  //                 minHeight: "48px",
  //               },
  //             },
  //             {
  //               props: {
  //                 variant: "outlined",
  //               },
  //               style: {
  //                 border: "2px solid",
  //                 borderRadius: "999px",
  //                 boxSizing: "border-box",
  //                 minHeight: "48px",
  //                 "&:hover": {
  //                   border: "2px solid",
  //                 },
  //               },
  //             },
  //           ],
  //         },
  //       },
  //     }),
  //   [theme]
  // );

  return (
    <html ref={htmlRef} className={theme} lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const userTheme = localStorage.getItem('theme');
              document.documentElement.classList.remove('dark');
              document.documentElement.classList.remove('light');
              if (userTheme) {
                document.documentElement.classList.add(userTheme);
                } else {
                  document.documentElement.classList.add('light');
              }
              try {
              console.log("setting mui attribute");
              const mode = localStorage.getItem('mui-mode');
              if (mode) {
              document.documentElement.setAttribute('data-mui-color-scheme', mode);
                }
              } catch (e) {} `,
          }}
        />
      </head>

      <body
        className={`${inter.className} text-[var(--md-sys-color-on-surface)] bg-[var(--md-sys-color-surface)]`}
      >
        <TokenProvider>
          <NavRail links={LINKS}></NavRail>
          <main className=" overflow-hidden md:ml-[136px]">{children}</main>
          <Footer />
        </TokenProvider>
      </body>
    </html>
  );
};

export default HtmlComponent;
