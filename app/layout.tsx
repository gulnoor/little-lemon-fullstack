import "./globals.css";
import "./ui/material3-tokens/dark.css";
import "./ui/material3-tokens/light.css";
import "animate.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import ThemeProvider from "./lib/contexts/themeContext";
import MUICustomThemeProvider from "./lib/contexts/MuiThemeContext";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import App from "./ui/App";
import IsMountedProvider from "./lib/contexts/mountedContext";
// import dynamic from "next/dynamic";
// const NoSSRTokenProvider = dynamic(() => import("./lib/contexts/tokenContext"), { ssr: false });

// setup mongoose models
export const metadata: Metadata = {
  title: "Little Lemon",
  description:
    "Based in Chicago, Illinois, Little Lemon is a family-owned Mediterranean restaurant, focused on traditional recipes served with a modern twist",
  openGraph: {
    type: "website",
    url: "https://littlelemon.live",
    title: "Little Lemon",
    description: "Order online or book a table",
  },
};
const GoogleSans = localFont({
  src: "../public/assets/fonts/GoogleSans-Regular.ttf",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en" className="light">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            try{
              const userTheme = localStorage.getItem('theme');
              document.documentElement.classList.remove('dark');
              document.documentElement.classList.remove('light');
              if (userTheme) {
                document.documentElement.classList.add(userTheme);
                } else {
                  document.documentElement.classList.add('light');
              }
                if (userTheme) {
                document.documentElement.setAttribute("data-mui-color-scheme" ,userTheme);
                } else {
                  document.documentElement.setAttribute("data-mui-color-scheme",'light');
              }
              }catch (err){console.log(err)}
              `,
          }}
        />
      </head>
      <body className={`${GoogleSans.className}`}>
        <AppRouterCacheProvider>
          <MUICustomThemeProvider>
            <ThemeProvider>
              <IsMountedProvider>
                <App>{children}</App>
              </IsMountedProvider>
            </ThemeProvider>
          </MUICustomThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
