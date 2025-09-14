import React, { useRef, useState } from "react";
import { toast } from "sonner";
import ListOptions from "./list-options";
import { useDispatch } from "react-redux";
import { useEventListener } from "@/hooks/useEventListener";
import {  updateListTitle } from "@/feature/slices/listSlice";
const ListHeader = ({ data, onAddCard }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef(null);
  const inputRef = useRef(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "" || title === data.title) {
      return disableEditing();
    }
    dispatch(updateListTitle({ id: data.id, title }));
    toast.success(`Renamed to "${title}"`);
    disableEditing();
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  const onKeyDown = (event) => {
    if (event.key === "Escape") {
      formRef.current?.requestSubmit();
    }
  };

  useEventListener("keydown", onKeyDown);

  return (
    <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2">
      {isEditing ? (
        <form ref={formRef} onSubmit={handleSubmit} className="flex-1 px-[2px]">
          <input
            ref={inputRef}
            id="title"
            name="title"
            placeholder="Enter list title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={onBlur}
            className="text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
          />
          <button hidden type="submit" />
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent cursor-pointer"
        >
          {data.title}
        </div>
      )}
      <ListOptions
        onAddCard={onAddCard}
        data={data}
        onDeleteList={() =>
          toast.info(`Delete logic here for list "${data.title}"`)
        }
        onCopyList={() =>
          toast.info(`Copy logic here for list "${data.title}"`)
        }
      />
    </div>
  );
};

export default ListHeader;
