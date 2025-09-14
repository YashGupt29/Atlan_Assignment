import React, {  useRef, useState } from "react";
import { Layout } from "lucide-react";
import { FormInput } from "@/components/form/form-input";
import { Skeleton } from "@/components/ui/skeleton";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { updateCardTitle } from "@/feature/slices/listSlice";

export const Header = ({ data }) => {
  const [title, setTitle] = useState(data?.title);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const onBlur = () => {
    inputRef.current?.form?.requestSubmit();
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      inputRef.current?.form?.requestSubmit();
    }
  };
  

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("clicked");
    const formData = new FormData(e.target);
    const newTitle = formData.get("title");
    if (newTitle === data.title) return;
  
    dispatch(updateCardTitle({
      boardId: data.boardId,
      listId: data.listId,
      cardId: data.id,
      title: newTitle
    }));
  
    toast.success(`Renamed to ${newTitle}`);
    setTitle(newTitle);
  };
  
  return (
    <div className="flex items-start gap-x-3 mb-6 w-full">
      <Layout className="h-5 w-5 mt-1 text-neutral-700" />
      <div className="w-full">
        <form onSubmit={onSubmit}>
          <FormInput
            ref={inputRef}
            id="title"
            defaultValue={title}
            className="font-semibold text-xl px-1 text-neutral-700 bg-transparent border-transparent relative -left-1.5
              w-[95%] focus-visible:bg-white focus-visible:border-input mb-0.5 truncate"
            onBlur={onBlur}
            onKeyDown={onKeyDown} 
          />
        </form>
        <p className="text-sm text-muted-foreground">
          in list <span className="underline">{data.listTitle}</span>
        </p>
      </div>
    </div>
  );
};

Header.Skeleton = function HeaderSkeleton() {
  return (
    <div className="flex items-start gap-x-3 mb-6">
      <Skeleton className="h-6 w-6 mt-1 bg-neutral-200" />
      <div>
        <Skeleton className="w-24 h-6 mb-1 bg-neutral-200" />
        <Skeleton className="w-12 h-4 bg-neutral-200" />
      </div>
    </div>
  );
};
