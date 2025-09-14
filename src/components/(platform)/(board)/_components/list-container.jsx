import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useDispatch } from "react-redux";

import { moveCardToList, updateCardOrder, updateListOrder } from "@/feature/slices/listSlice";
import ListForm from "./list-form";
import ListItem from "./list-item";

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
    setOrderedData(data);
  }, [data]);

  const onDragEnd = (result) => {
    const { destination, source, type } = result;
    if (!destination) return;

    // dropped in the same place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // moving a list
    if (type === "list") {
      const items = reorder(orderedData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      );
      setOrderedData(items);
      dispatch(updateListOrder({ boardId, items }));
    }

    // moving a card
    if (type === "card") {
      let newOrderedData = [...orderedData];
      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId
      );
      const destList = newOrderedData.find(
        (list) => list.id === destination.droppableId
      );

      if (!sourceList || !destList) return;

      if (!sourceList.cards) sourceList.cards = [];
      if (!destList.cards) destList.cards = [];

      // moving card inside same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        );
        reorderedCards.forEach((card, index) => (card.order = index));
        sourceList.cards = reorderedCards;
        setOrderedData(newOrderedData);

        dispatch(updateCardOrder({ boardId, listId: sourceList.id, items: reorderedCards }));
      } else {
        // moving card to different list
        const [movedCard] = sourceList.cards.splice(source.index, 1);
        movedCard.listId = destination.droppableId;
        destList.cards.splice(destination.index, 0, movedCard);

        sourceList.cards.forEach((card, index) => (card.order = index));
        destList.cards.forEach((card, index) => (card.order = index));

        setOrderedData(newOrderedData);

        dispatch(
          moveCardToList({
            boardId,
            sourceListId: sourceList.id,
            destListId: destList.id,
            cardId: movedCard.id,
            destIndex: destination.index,
          })
        );
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
            className="flex gap-x-3 h-full list-none p-0 m-0"
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
