"use client";

import { cn } from "@/lib/utils/classnames";
import { FieldValues, UseFormRegister } from "react-hook-form";
import Label from "../Label";

interface InputProps {
  id: string;
  type: string;
  register: UseFormRegister<FieldValues>;
  label_text: string;
  className?: string;
  validationSchema?: Record<string, unknown>;
}

const Input: React.FC<InputProps> = ({
  type,
  id,
  validationSchema,
  register,
  label_text,
  className = "",
}) => (
  <div className="form_input">
    <div className="input_wrapper">
      <Label id={id} text={label_text} />
      <div>
        <input
          type={type}
          id={id}
          className={cn("form_input", {
            [className]: className,
          })}
          {...register(id, validationSchema)}
        />
      </div>
    </div>
  </div>
);

export default Input;
