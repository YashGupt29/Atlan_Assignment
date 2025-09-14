
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreHorizontal, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { deleteBoard } from "@/feature/slices/boardSlice";
import { useNavigate } from "react-router";

const BoardOptions = ({ id, organizationId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch=useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    setIsLoading(true);
    navigate(`/organization/${organizationId}`);
    setTimeout(() => {
      dispatch(deleteBoard({ boardId: id }));
      setIsLoading(false);
    }, 500);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="transparent">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Board Actions
        </div>

        <PopoverClose asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>

        <Button
          variant="ghost"
          onClick={handleDelete}
          disabled={isLoading}
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
        >
          Delete this board
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default BoardOptions;
