import React, { useRef, useState } from "react";
import { ListWrapper } from "./list-wrapper";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useEventListener } from "@/hooks/useEventListener";
import { useOnClickOutside } from "@/hooks/useOutsideClick";
import { useDispatch } from "react-redux";
import { addList } from "@/feature/slices/listSlice";

const ListForm = ({ boardId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef(null);
  const inputRef = useRef(null);
  const [hover, setHover] = useState(false);
  const dispatch=useDispatch();


  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const onSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    if (!title.trim()) {
      toast.error("List title cannot be empty");
      return;
    }
    const newList = {
      id: crypto.randomUUID(),    
      title,
      order: Date.now(),  
      cards: [],
      boardId
    };
    dispatch(addList(newList));
    toast.success(`List "${title}" created`);
    disableEditing();
  };

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          onSubmit={onSubmit}
          ref={formRef}
          className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"
        >
          <input
            ref={inputRef}
            id="title"
            name="title"
            className="text-sm px-2 py-1 h-7 font-medium border rounded-md w-full focus:outline-none focus:border-blue-500"
            placeholder="Enter list title..."
          />
          <input hidden value={boardId} name="boardId" />
          <div className="flex items-center gap-x-1">
            <Button type="submit" size="sm">
              Add list
            </Button>
            <Button onClick={disableEditing} size="sm" variant="ghost">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      <button
         style={{
          backgroundColor: hover
            ? "rgba(255, 255, 255, 0.5)" 
            : "rgba(255, 255, 255, 0.8)",
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="w-full rounded-md  transition p-3 flex items-center font-medium text-sm"
        onClick={enableEditing}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add a list
      </button>
    </ListWrapper>
  );
};

export default ListForm;
