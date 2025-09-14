import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { FormTextarea } from "@/components/form/form-textarea";
import { FormSubmit } from "@/components/form/form-button";
import { AlignLeft } from "lucide-react";
import { toast } from "sonner";
import { updateCardDescription } from "@/feature/slices/listSlice";
import { useEventListener } from "@/hooks/useEventListener";
import { useOnClickOutside } from "@/hooks/useOutsideClick";

export const Description = ({ data }) => {
  const dispatch = useDispatch();

  const { boardId, id: cardId, description: cardDescription } = data;

  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef(null);
  const textareaRef = useRef(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  const disableEditing = () => setIsEditing(false);

  const onKeyDown = (e) => {
    if (e.key === "Escape") disableEditing();
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const description = formData.get("description");
  
    dispatch(
      updateCardDescription({
        boardId,
        listId: data.listId,
        cardId,
        description,
      })
    );
  
    toast.success("Card description updated");
    disableEditing();
  };
  

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);
  if (!data) return null;
  return (
    <div className="flex items-start gap-x-3 w-full">
      <AlignLeft className="h-5 w-5 mt-0.5 text-neutral-700" />
      <div className="w-full">
        <p className="font-semibold text-neutral-700 mb-2">Description</p>
        {isEditing ? (
          <form ref={formRef} onSubmit={onSubmit} className="space-y-2">
            <FormTextarea
              ref={textareaRef}
              id="description"
              defaultValue={cardDescription || ""}
              className="w-full mt-2"
              placeholder="Add a more detailed description"
            />
            <div className="flex items-center gap-x-2">
              <FormSubmit>Save</FormSubmit>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={disableEditing}
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div
            role="button"
            onClick={enableEditing}
            className="min-h-[78px] bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md"
          >
            {cardDescription || "Add a more detailed description"}
          </div>
        )}
      </div>
    </div>
  );
};

Description.Skeleton = function DescriptionSkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <div className="h-6 w-6 bg-neutral-200 rounded-full" />
      <div className="w-full">
        <div className="w-24 h-6 mb-2 bg-neutral-200 rounded" />
        <div className="w-full h-[78px] bg-neutral-200 rounded" />
      </div>
    </div>
  );
};
