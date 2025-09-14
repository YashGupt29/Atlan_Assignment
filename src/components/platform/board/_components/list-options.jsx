import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { MoreHorizontal, X } from "lucide-react";

const ListOptions = ({  onAddCard }) => {
  const closeRef = useRef(null);

  return (
    <Popover>
      <PopoverTrigger>
        <Button className="h-auto w-auto p-2" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Activity actions
        </div>

        <PopoverClose asChild ref={closeRef}>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>

        <Button
          onClick={onAddCard}
          className="rounded-none w-full h-auto p-2 px-5 font-normal text-sm justify-start"
          variant="ghost"
        >
         Add Activity...
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default ListOptions;
