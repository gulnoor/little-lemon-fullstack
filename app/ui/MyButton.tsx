import Link from "next/link";
import React from "react";

const MyButton = ({ variant, children, href = "", style, onClick }) => {
  let bg = "bg-[var(--md-sys-color-primary)]";
  let textColor = "text-[var(--md-sys-color-on-primary)]";
  let border = "";
  if (variant === "outlined") {
    bg = "bg-transparent";
    textColor = "text-[var(--md-sys-color-primary)]";
    border = "border-2 border-[var(--md-sys-color-primary)]";
  }
  const css = `${style} w-fit text-2xl min-h-[48px] rounded-full ${bg} ${textColor} ${border} text-[var(--md-sys-color-on-primary)] flex justify-center items-center px-4 py-3`;
  return (
    <Link onClick={onClick} href={href} className={css}>
      <h4>{children}</h4>
    </Link>
  );
};

export default MyButton;
