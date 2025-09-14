import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import { useCardModal } from "@/hooks/use-card-modal";

const CardItem = ({ index, data }) => {
  const cardModal = useCardModal();
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={()=>cardModal.onOpen(data.id)}
          role="button"
          className="truncate border-2 border-transparent hover:border-black py-2 px-3 bg-white text-sm rounded-md shadow-sm"
        >
          {data.title}
        </div>
      )}
    </Draggable>
  );
};

export default CardItem;
