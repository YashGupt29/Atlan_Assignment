import React, { useRef, useState } from "react";
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
import { DatePicker } from "./form-date-picker";
import { toast } from "sonner";
import { useDispatch } from 'react-redux';
import { addBoard } from '@/feature/slices/boardSlice';
import { initializeBoardLists } from "@/feature/slices/listSlice";
import { useParams } from "react-router-dom";

export const FormPopover = ({
  children,
  side = "bottom",
  align,
  sideOffset = 0,
}) => {
  const closeRef = useRef(null);
  const dispatch = useDispatch();
  const [selectedDateRange, setSelectedDateRange] = useState();
  const { id: organizationId } = useParams();

  const onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const title = formData.get("title");
    const image = formData.get("image");

    if (!title || !image || !selectedDateRange?.from || !selectedDateRange?.to) {
      toast.error("Please fill all fields and select a date range.");
      console.log("Please fill all fields and select a date range.")
      return;
    }

    const imageThumbUrl = image.split('|')[1];
    const imageFullUrl = image.split('|')[2];

    const newBoard = {
      id: Date.now().toString(),
      title,
      imageThumbUrl,
      imageFullUrl,
      startDate: selectedDateRange.from.toISOString(),
      endDate: selectedDateRange.to.toISOString(),
      organizationId,
    };
    dispatch(addBoard(newBoard));
    dispatch(initializeBoardLists({ boardId: newBoard.id }))
    toast.success("Board created!");
    closeRef.current?.click();
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
             <DatePicker onChange={setSelectedDateRange} />
          </div>
          <FormSubmit className="w-full bg-black text-white">Create</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
