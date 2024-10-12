"use client";
import { cn } from "@/lib/utils/classnames";

interface LabelProps {
  id: string;
  text: string;
  className?: string;
}

const Label: React.FC<LabelProps> = ({ id, text, className = "" }) => (
  <label
    className={cn("form_label", {
      [className]: className,
    })}
    htmlFor={id}
  >
    {text}
  </label>
);

export default Label;
