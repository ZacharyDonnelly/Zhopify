"use client";

import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type FormSubmitButtonProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"button">;

const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({
  children,
  className,
  ...props
}) => {
  const { pending } = useFormStatus();
  return (
    <button
      {...props}
      type="submit"
      className={`${className}`}
      disabled={pending}
    >
      {pending && <span className="loading loading-spinner" />}
      {children}
    </button>
  );
};

export default FormSubmitButton;
