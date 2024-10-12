"use client";

import { cn } from "@/lib/utils/classnames";
import type { ReactNode } from "react";

interface ButtonProps {
  submit?: boolean;
  btnText?: string;
  className?: string;
  children?: ReactNode;
  mask?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  btnText = "",
  submit = false,
  className = "",
  mask = false,
}) => (
  <button
    type={submit ? "submit" : "button"}
    className={cn("noted_button", {
      [className]: className,
      imageMask: mask,
    })}
    onClick={onClick}
  >
    {children}
    {btnText}
  </button>
);

export default Button;
