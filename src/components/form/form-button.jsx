import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export const FormSubmit = ({ children, disabled, className, variant = "primary" }) => {
  return (
    <Button
      disabled={disabled}
      type="submit"
      variant={variant}
      size="sm"
      className={cn(className)}
    >
      {children}
    </Button>
  );
};
