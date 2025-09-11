import React, { useRef } from "react";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { FormInput } from "./form-input";
import { FormSubmit } from "./form-button";
import { FormPicker } from "./form-picker";
import { toast } from "sonner";
import { useProModal } from "@/hooks/use-pro-modal";

export const FormPopover = ({
  children,
  side = "bottom",
  align,
  sideOffset = 0,
}) => {
  const proModal = useProModal();
  const closeRef = useRef(null);

  
  const onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const title = formData.get("title");
    const image = formData.get("image");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className="w-80 pt-3"
        side={side}
        sideOffset={sideOffset}
      >
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Create Board
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-4">
            <FormPicker id="image"/>
            <FormInput
              id="title"
              label="Board title"
              type="text"
            />
          </div>
          <FormSubmit className="w-full">Create</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
