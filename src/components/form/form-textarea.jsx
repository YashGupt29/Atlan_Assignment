import React, { forwardRef } from "react";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { FormErrors } from "./form-errors";
import { Textarea } from "../ui/textarea";

export const FormTextarea = forwardRef(
  (
    {
      id,
      label,
      placeholder,
      required,
      disabled,
      errors,
      className,
      onBlur,
      onClick,
      onKeyDown,
      defaultValue,
    },
    ref
  ) => {
    return (
      <div className="space-y-2 w-full">
        <div className="space-y-1 w-full">
          {label && (
            <Label htmlFor={id} className="text-xs font-semibold text-neutral-700">
              {label}
            </Label>
          )}
          <Textarea
            ref={ref}
            name={id}
            id={id}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            onBlur={onBlur}
            onClick={onClick}
            onKeyDown={onKeyDown}
            className={cn(
              "resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm",
              className
            )}
            aria-describedby={`${id}-error`}
            defaultValue={defaultValue}
          />
          <FormErrors id={id} errors={errors} />
        </div>
      </div>
    );
  }
);

FormTextarea.displayName = "FormTextarea";
