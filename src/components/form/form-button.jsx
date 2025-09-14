import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export const FormSubmit = ({ children, disabled, className }) => {
  return (
    <Button
      disabled={disabled}
      type="submit"
      size="sm"
      className={cn(className)}
    >
      {children}
    </Button>
  );
};
