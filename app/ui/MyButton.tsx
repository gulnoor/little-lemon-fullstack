import Link from "next/link";
import React from "react";

const MyButton = ({ variant, children, href, style }) => {
  let bg = "bg-[var(--md-sys-color-primary)]";
  let textColor = "text-[var(--md-sys-color-on-primary)]";
  let border = "";
  if (variant === "outlined") {
    bg = "bg-transparent";
    textColor = "text-[var(--md-sys-color-primary)]";
    border = "border-2 border-[var(--md-sys-color-primary)]";
  }
  const css = `w-fit text-2xl min-h-[48px] rounded-full ${bg} ${textColor} ${border} text-[var(--md-sys-color-on-primary)] flex justify-center items-center px-4 py-3`;
  return (
    <Link style={style} href={href} className={css}>
      {children}
    </Link>
  );
};

export default MyButton;
