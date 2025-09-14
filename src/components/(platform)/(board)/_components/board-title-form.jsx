
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button"; 
import { FormInput } from "@/components/form/form-input";
import { useDispatch } from "react-redux";
import { updateBoard } from "@/feature/slices/boardSlice";

const BoardTitleForm = ({ data }) => {
  const formRef = useRef(null);
  const inputRef = useRef(null);
  const dispatch=useDispatch();
  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);

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

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const newTitle = formData.get("title");
    dispatch(updateBoard({ boardId: data.id, title: newTitle }));
    setTitle(newTitle);
    disableEditing();
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  if (isEditing) {
    return (
      <form
        onSubmit={onSubmit}
        ref={formRef}
        className="flex items-center gap-x-2"
      >
        <FormInput
          ref={inputRef}
          id="title"
          name="title"
          onBlur={onBlur}
          defaultValue={title}
          className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
        />
      </form>
    );
  }

  return (
    <Button
      onClick={enableEditing}
      className="font-bold text-lg h-auto w-auto p-1 px-2"
      variant="transparent"
    >
      {title}
    </Button>
  );
};

export default BoardTitleForm;
