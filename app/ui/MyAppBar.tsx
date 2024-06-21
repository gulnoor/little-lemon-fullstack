import { AppBar } from "@mui/material";
import Image from "next/image";
import { MaterialUISwitch } from "./ToggleButton";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { IconButton, Toolbar } from "@mui/material";
import logo from "@/public/assets/images/Asset 9@4x.png";
import { TokenContext } from "../lib/contexts/tokenContext";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { ThemeContext } from "../lib/contexts/themeContext";

const MyAppBar = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const { loggedin } = useContext(TokenContext);
  const [transparent, setTransparent] = useState(true);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [checked, setChecked] = useState(false);
  const muitheme = useTheme();
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > 16) {
        setTransparent(false);
      } else {
        setTransparent(true);
      }
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    setIsMounted(true);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <AppBar
      style={{
        transform: isVisible ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.3s ease-in-out",
        // backgroundColor:transparent? "transparent":,
        background: transparent
          ? "none"
          : "var(--md-sys-color-surface-container-high)",
        boxShadow: transparent ? "none" : "0px 1px 12px #2c2828e5",
        color: "var(--md-sys-color-on-surface)",
      }}
      sx={{
        justifyContent: "center",
        minHeight: "60px",
        "@media screen and (min-width: 768px)": {
          display: "none",
        },
      }}
    >
      <Toolbar>
        <div className="flex flex-grow">
          <Image alt="company logo" src={logo} height={33} className=""></Image>
          <p className="flex ml-[12px] justify-center items-center text-[var(--md-sys-color-on-surface)]">
            LITTLE LEMON
          </p>
        </div>
        {isMounted && (
          <MaterialUISwitch
            className="animate__animated animate__faster animate__zoomIn"
            theme={muitheme}
            checked={theme === "dark" ? true : false}
            onChange={(e) => {
              setChecked(e.target.checked);
              toggleTheme();
            }}
          />
        )}
        {isMounted ? (
          loggedin ? (
            <IconButton
              className="animate__animated animate__faster animate__zoomIn"
              onClick={() => router.push("/dashboard")}
              edge={"end"}
            >
              <AccountCircle className="mx-3" />
            </IconButton>
          ) : (
            <Link
              style={{
                paddingLeft: "10px",
                color: "var(--md-sys-color-on-surface)",
              }}
              href={"/login"}
            >
              LOGIN
            </Link>
          )
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

export default MyAppBar;
