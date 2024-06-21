import Link from "next/link";
import React from "react";

const MyButton = ({
  variant,
  children,
  href = "",
  style,
  onClick,
  textSize,
  disable,
}) => {
  let bg = disable
    ? "bg-[var(--md-sys-color-surface-container-high)]"
    : "bg-[var(--md-sys-color-primary)]";
  let textColor = disable
    ? "text-[var(--md-sys-color-on-surface-variant)]"
    : "text-[var(--md-sys-color-on-primary)]";
  let border = "";
  if (variant === "outlined") {
    bg = "bg-transparent";
    textColor = "text-[var(--md-sys-color-primary)]";
    border = "border-2 border-[var(--md-sys-color-primary)]";
  } else if (variant === "text") {
    bg = "bg-transparent";
    textColor = "text-[var(--md-sys-color-primary)]";
    border = "";
  }
  const tailwindCSS = `
  ${bg} ${textColor} ${border} 
  flex justify-center items-center 
  px-4 py-3 
  w-full xsm:w-fit
  min-h-[48px] 
  rounded-full 
  ${style}
  `;

  return (
    <Link
      onClick={disable ? (e) => e.preventDefault() : onClick}
      href={disable ? "" : href}
      className={tailwindCSS}
    >
      <h4 className={`${textSize}`}>{children}</h4>
    </Link>
  );
};

export default MyButton;
