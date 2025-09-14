import React, { forwardRef, useRef } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button"; 
import { FormSubmit } from "@/components/form/form-button";
import { FormTextarea } from "@/components/form/form-textarea";
import { useEventListener } from "@/hooks/useEventListener";
import { useOnClickOutside } from "@/hooks/useOutsideClick";
import { useDispatch, useSelector } from "react-redux";
import { addCard } from "@/feature/slices/listSlice";
import { useParams } from "react-router";

const CardForm = forwardRef(
  ({ listId, enableEditing, disableEditing, isEditing }, ref) => {
    const formRef = useRef(null);
    const dispatch=useDispatch();
    const {boardId}=useParams();
    const lists = useSelector((state) => state.list.byBoardId[boardId] || []);


    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        disableEditing();
      }
    };

    useOnClickOutside(formRef, disableEditing);
    useEventListener("keydown", onKeyDown);

    const onTextareaKeyDown = (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    };

    const onSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(formRef.current);
      const title = formData.get("title");
      const list = lists.find((l) => l.id === listId);
      const newOrder = list?.cards.length || 0;
    
      const newCard = {
        id: crypto.randomUUID(),
        title,
        order: newOrder,
        boardId,    
        listId,
        description: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    
      dispatch(addCard({ boardId, listId, card: newCard }));
      formRef.current?.reset();
    };
    
    if (isEditing) {
      return (
        <form
          ref={formRef}
          onSubmit={onSubmit}
          className="m-1 py-0.5 px-1 space-y-4"
        >
          <FormTextarea
            id="title"
            name="title"
            onKeyDown={onTextareaKeyDown}
            ref={ref}
            placeholder="Enter a title for this card"
          />
          <input hidden id="listId" name="listId" value={listId} />
          <div className="flex items-center gap-x-1">
            <FormSubmit>Add Activity</FormSubmit>
            <Button onClick={disableEditing} size="sm" variant="ghost">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      );
    }

    return (
      <div className="pt-2 px-2">
        <Button
          onClick={enableEditing}
          className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
          size="sm"
          variant="ghost"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add an Activity
        </Button>
      </div>
    );
  }
);

CardForm.displayName = "CardForm";
export default CardForm;
