import React from "react";
import { useSelector } from "react-redux";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCardModal } from "@/hooks/use-card-modal";
import { Header } from "./card-header";
import { Description } from "./description";
import { DeleteAction } from "./action";


const CardModal = ({ boardId }) => {
  const id = useCardModal((state) => state.id);
  const isOpen = useCardModal((state) => state.isOpen);
  const onClose = useCardModal((state) => state.onClose);

  const cardData = useSelector((state) => {
    const lists = state.list.byBoardId[boardId] || [];
    for (const list of lists) {
      const card = list.cards.find((c) => c.id === id);
      if (card) return { ...card, listTitle: list.title };
    }
    return null;
  });

  if (!cardData) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="fixed top-[40%] left-[65%] transform -translate-x-1/2 -translate-y-1/2 ">
        <Header data={cardData} />
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
             <Description data={cardData} />
            </div>
          </div>
          <DeleteAction data={cardData}/>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;
