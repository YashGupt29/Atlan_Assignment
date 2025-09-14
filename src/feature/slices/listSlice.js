import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  byBoardId: {}, // { [boardId]: [ {id, title, order, boardId, cards: []}, ... ] }
};

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    initializeBoardLists: (state, action) => {
      const { boardId } = action.payload;

      if (!state.byBoardId[boardId]) {
        const defaultLists = [
          { id: crypto.randomUUID(), title: "Activities", order: 0, boardId, cards: [] },
          { id: crypto.randomUUID(), title: "Saturday", order: 1, boardId, cards: [] },
          { id: crypto.randomUUID(), title: "Sunday", order: 2, boardId, cards: [] },
        ];
        state.byBoardId[boardId] = defaultLists;
      }
    },

    addList: (state, action) => {
      const list = action.payload;
      if (!state.byBoardId[list.boardId]) state.byBoardId[list.boardId] = [];
      state.byBoardId[list.boardId].push(list);
    },

    removeList: (state, action) => {
      const { boardId, listId } = action.payload;
      state.byBoardId[boardId] = state.byBoardId[boardId].filter((list) => list.id !== listId);
    },

    updateListTitle: (state, action) => {
      const { boardId, listId, title } = action.payload;
      const list = state.byBoardId[boardId]?.find((l) => l.id === listId);
      if (list) list.title = title;
    },

    updateListOrder: (state, action) => {
      const { boardId, items } = action.payload;
      state.byBoardId[boardId] = items;
    },

    addCard: (state, action) => {
      const { boardId, listId, card } = action.payload;
      const list = state.byBoardId[boardId]?.find((l) => l.id === listId);
      if (list) list.cards.push({ ...card, description: card.description || "" });
    },
    updateCardDescription: (state, action) => {
      const { boardId, listId, cardId, description } = action.payload;
      const list = state.byBoardId[boardId]?.find((l) => l.id === listId);
      if (!list) return;
      const card = list.cards.find((c) => c.id === cardId);
      if (card) card.description = description;
    },    
    updateCardTitle: (state, action) => {
      const { boardId, listId, cardId, title } = action.payload;
      const list = state.byBoardId[boardId]?.find((l) => l.id === listId);
      if (!list) return;
      const card = list.cards.find((c) => c.id === cardId);
      if (card) card.title = title;
    },   
    addCardAtIndex: (state, action) => {
      const { boardId, listId, card, index } = action.payload;
      const list = state.byBoardId[boardId]?.find((l) => l.id === listId);
      if (!list) return;
      list.cards.splice(index, 0, { ...card, description: card.description || "" });
      list.cards = list.cards.map((c, i) => ({ ...c, order: i }));
    },

    removeCard: (state, action) => {
      const { boardId, listId, cardId } = action.payload;
      const list = state.byBoardId[boardId]?.find((l) => l.id === listId);
      if (!list || !list.cards) return;
      list.cards = list.cards.filter((c) => c.id !== cardId);
    },

    updateCardOrder: (state, action) => {
      const { boardId, listId, items } = action.payload;
      const list = state.byBoardId[boardId]?.find((l) => l.id === listId);
      if (list) {
        list.cards = items.map((card, index) => ({ ...card, order: index }));
      }
    },

    moveCardToList: (state, action) => {
      const { boardId, sourceListId, destListId, cardId, destIndex } = action.payload;

      const sourceList = state.byBoardId[boardId]?.find((l) => l.id === sourceListId);
      const destList = state.byBoardId[boardId]?.find((l) => l.id === destListId);
      if (!sourceList || !destList) return;

      const cardIndex = sourceList.cards.findIndex((c) => c.id === cardId);
      if (cardIndex === -1) return;

      const [movedCard] = sourceList.cards.splice(cardIndex, 1);
      const updatedCard = { ...movedCard, listId: destListId };

      destList.cards.splice(destIndex, 0, updatedCard);

      // reorder
      sourceList.cards = sourceList.cards.map((c, i) => ({ ...c, order: i }));
      destList.cards = destList.cards.map((c, i) => ({ ...c, order: i }));
    },
  },
});

export const {
  addList,
  removeList,
  updateListTitle,
  updateListOrder,
  addCard,
  addCardAtIndex,
  removeCard,
  updateCardOrder,
  moveCardToList,
  initializeBoardLists,
  updateCardTitle,
  updateCardDescription,
} = listSlice.actions;

export default listSlice.reducer;
