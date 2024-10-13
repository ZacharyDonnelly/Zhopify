"use client";
import { cn } from "@/lib/utils/classnames";
import type { ChangeEventHandler } from "react";
import Label from "../Label";

interface CheckboxProps {
  id: string;
  labelText: string;
  checked: boolean;
  name: string;
  changeHandler: ChangeEventHandler<HTMLInputElement>;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  name,
  checked,
  changeHandler,
  labelText,
  className = "",
}) => (
  <div
    className={cn("checkbox", {
      [className]: className,
    })}
  >
    <input
      type="checkbox"
      className="checkbox_input"
      id={id}
      name={name}
      checked={checked}
      onChange={changeHandler}
    />
    <Label className="checkbox_label" id={id} text={labelText} />
  </div>
);

export default Checkbox;
