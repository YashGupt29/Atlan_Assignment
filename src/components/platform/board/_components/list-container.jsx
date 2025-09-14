import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useDispatch } from "react-redux";

import { addCardAtIndex, moveCardToList, updateCardOrder, updateListOrder } from "@/feature/slices/listSlice";
import ListForm from "./list-form";
import ListItem from "./list-item";
import { toast } from "sonner";

function reorder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

const ListContainer = ({ data, boardId }) => {
  const [orderedData, setOrderedData] = useState(data);
  const dispatch = useDispatch();

  useEffect(() => {
    setOrderedData(data.map(list => ({
      ...list,
      cards: [...list.cards],
    })));
  }, [data]);
  

  const onDragEnd = (result) => {
    const { destination, source, type } = result;
    if (!destination) {
      console.log("Dropped outside any droppable");
      return;
    };

    // dropped in the same place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // moving a list
    if (type === "list") {
      const draggedList = orderedData[source.index];
    if (draggedList.title === "Activities") {
          toast.error("The Activities list cannot be moved!");
          return;
    }
      const items = reorder(orderedData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      );
      setOrderedData(items);
      dispatch(updateListOrder({ boardId, items }));
    }

    // moving a card
    if (type === "card") {
      console.log("Card move detected:", { source, destination });
      let newOrderedData = orderedData.map(list => ({
        ...list,
        cards: [...list.cards],
      }));
      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId
      );
      const destList = newOrderedData.find(
        (list) => list.id === destination.droppableId
      );

      if (!sourceList || !destList) return;

      if (!sourceList.cards) sourceList.cards = [];
      if (!destList.cards) destList.cards = [];

      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        ).map((card, index) => ({
          ...card,
          order: index, 
        }));
        sourceList.cards = reorderedCards;
        setOrderedData(newOrderedData);

        dispatch(updateCardOrder({ boardId, listId: sourceList.id, items: reorderedCards }));
        
      }
      else {
        const newOrderedData = orderedData.map(list => ({
          ...list,
          cards: [...list.cards],
        }));
      
        const sourceList = newOrderedData.find(list => list.id === source.droppableId);
        const destList = newOrderedData.find(list => list.id === destination.droppableId);
        if (!sourceList || !destList) return;
      
        if (!sourceList.cards) sourceList.cards = [];
        if (!destList.cards) destList.cards = [];
      
        if (sourceList.title === "Activities") {
          // Copy card from Activities to destination at correct index
          const cardToCopy = sourceList.cards[source.index];

          // Check if card with same title already exists
          const duplicate = destList.cards.find(c => c.title === cardToCopy.title);
          if (duplicate) {
            toast.error("Card already exists in this list!");
            return;
          }

          const newCard = {
            ...sourceList.cards[source.index],
            id: crypto.randomUUID(),
            listId: destList.id,
          };
      
          destList.cards.splice(destination.index, 0, newCard);
          
      
          // Reorder destination cards
          destList.cards = destList.cards.map((c, i) => ({ ...c, order: i }));
      
          // Update Redux
          dispatch(addCardAtIndex({
            boardId,
            listId: destList.id,
            card: newCard,
            index: destination.index,
          }));
        } else {
          const [movedCard] = sourceList.cards.splice(source.index, 1);
          const duplicate = destList.cards.find(c => c.title === movedCard.title);
          if (duplicate) {
            toast.error("Card already exists in this list!");
            sourceList.cards.splice(source.index, 0, movedCard);
            return;
          }
          destList.cards.splice(destination.index, 0, { ...movedCard, listId: destList.id });
      
          // Reorder both lists
          sourceList.cards = sourceList.cards.map((c, i) => ({ ...c, order: i }));
          destList.cards = destList.cards.map((c, i) => ({ ...c, order: i }));
      
          setOrderedData(newOrderedData);
      
          // Update Redux
          dispatch(moveCardToList({
            boardId,
            sourceListId: sourceList.id,
            destListId: destList.id,
            cardId: movedCard.id,
            destIndex: destination.index,
          }));
        }
      
        setOrderedData(newOrderedData);
      }
      
            
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full list-none p-0 m-0 justify-center items-center mt-5"
          >
            {orderedData
              .slice()
              .sort((a, b) => a.order - b.order)
              .map((list, index) => (
                <ListItem key={list.id} index={index} data={list} />
              ))}
            {provided.placeholder}
            <ListForm boardId={boardId}/>
            <div className="flex-shrink-0 w-1" />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ListContainer;
