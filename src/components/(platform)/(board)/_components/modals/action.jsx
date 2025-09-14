import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { useCardModal } from "@/hooks/use-card-modal";
import { removeCard } from "@/feature/slices/listSlice";
export const DeleteAction = ({ data }) => {
    const {boardId}=data;
  const dispatch = useDispatch();
  const cardModal = useCardModal();

  const onDelete = () => {
    if (!data || !boardId) return;

    dispatch(removeCard({ 
      boardId, 
      listId: data.listId, 
      cardId: data.id 
    }));

    toast.success(`Card "${data.title}" deleted successfully`);
    cardModal.onClose();
  };

  return (
    <div className="space-y-2 mt-2">
      <p className="text-xs font-semibold">Actions</p>
      <Button
        className="w-full justify-start bg-gray-200 text-gray-800 pr-5 pl-2 py-2"
        size="inline"
        onClick={onDelete}
      >
        Delete
        <Trash className="h-4 w-4 mr-2 ml-2" />
      </Button>
    </div>
  );
};
