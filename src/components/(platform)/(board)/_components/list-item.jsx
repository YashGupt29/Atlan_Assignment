import React, { useRef, useState } from "react";
import ListHeader from "./list-header";
import  CardForm  from "./card-form";
import { cn } from "@/lib/utils";
import CardItem from "./card-item";
import { Draggable, Droppable } from "@hello-pangea/dnd";

const ListItem = ({ data, index }) => {
  const textareaRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const isActivities = data.title === "Activities";


  const disableEditing = () => {
    setIsEditing(false);
  };

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="shrink-0 h-full w-[372px] select-none ml-10 "
        >
          <div
            {...provided.dragHandleProps}
            className={cn(
              "w-full rounded-md shadow-md pb-2 min-h-[550px]",
              isActivities ? "bg-pink-100" : "bg-[#f1f2f4]"
            )}
          >
            <ListHeader onAddCard={enableEditing} data={data} boardId={data.boardId} />
            <Droppable droppableId={data.id} type="card">
              {(provided,snapshot) => (
                <ol
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={cn(
                  "mx-5 py-2 px-2 flex flex-col gap-y-2 min-h-[450px] rounded-md",
                  data.cards.length > 0 ? "mt-2" : "mt-0"
                )}
                style={snapshot.isDraggingOver ? { borderWidth: "2px",borderStyle: "dashed", borderColor: "#d1d5db" } : {}}
              >
              
              
                  {data.cards.length > 0 ? (
                  data.cards.map((card, index) => (
                  <CardItem index={index} key={card.id} data={card} />
                  ))
                 ) : (
                  <div className="flex-1 flex items-center justify-center text-gray-400 text-sm py-2">
                  Drop card here
                </div>
                )}
                  {provided.placeholder}
                </ol>
              )}
            </Droppable>
            <CardForm
              listId={data.id}
              ref={textareaRef}
              isEditing={isEditing}
              enableEditing={enableEditing}
              disableEditing={disableEditing}
            />
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default ListItem;
