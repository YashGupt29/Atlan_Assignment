import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  byBoardId: {}, // { [boardId]: [ {id, title, order, boardId, cards: []}, ... ] }
};

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    addList: (state, action) => {
      const list = action.payload; // {id, title, order, boardId, cards: []}
      if (!state.byBoardId[list.boardId]) {
        state.byBoardId[list.boardId] = [];
      }
      state.byBoardId[list.boardId].push(list);
    },

    removeList: (state, action) => {
      const { boardId, listId } = action.payload;
      state.byBoardId[boardId] = state.byBoardId[boardId].filter(
        (list) => list.id !== listId
      );
    },

    updateListTitle: (state, action) => {
      const { boardId, listId, title } = action.payload;
      const list = state.byBoardId[boardId]?.find((l) => l.id === listId);
      if (list) list.title = title;
    },

    updateListOrder: (state, action) => {
      // payload: { boardId, items: [{id, order}, ...] }
      const { boardId, items } = action.payload;
      state.byBoardId[boardId] = items;
    },

    addCard: (state, action) => {
      // payload: { boardId, listId, card }
      const { boardId, listId, card } = action.payload;
      const list = state.byBoardId[boardId]?.find((l) => l.id === listId);
      if (list) list.cards.push(card);
    },

    updateCardOrder: (state, action) => {
      // payload: { boardId, listId, items: [{id, order}, ...] }
      const { boardId, listId, items } = action.payload;
      const list = state.byBoardId[boardId]?.find((l) => l.id === listId);
      if (list) {
        list.cards = list.cards.map((card) => ({
          ...card,
          order: items.find((i) => i.id === card.id)?.order ?? card.order,
        }));
      }
    },

    moveCardToList: (state, action) => {
      // payload: { boardId, sourceListId, destListId, cardId, destIndex }
      const { boardId, sourceListId, destListId, cardId, destIndex } =
        action.payload;

      const sourceList = state.byBoardId[boardId]?.find(
        (l) => l.id === sourceListId
      );
      const destList = state.byBoardId[boardId]?.find(
        (l) => l.id === destListId
      );
      if (!sourceList || !destList) return;

      const cardIndex = sourceList.cards.findIndex((c) => c.id === cardId);
      if (cardIndex === -1) return;

      const [movedCard] = sourceList.cards.splice(cardIndex, 1);
      movedCard.listId = destListId;

      destList.cards.splice(destIndex, 0, movedCard);

      // reorder
      sourceList.cards.forEach((c, i) => (c.order = i));
      destList.cards.forEach((c, i) => (c.order = i));
    },
  },
});

export const {
  addList,
  removeList,
  updateListTitle,
  updateListOrder,
  addCard,
  updateCardOrder,
  moveCardToList,
} = listSlice.actions;

export default listSlice.reducer;
