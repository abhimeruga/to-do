import { createSlice } from "@reduxjs/toolkit";

const INITIAL_VALUE = {
  list: [],
  history: {
    "31-10-2025": [0, 1, 2, 3, 4],
    "30-10-2025": [0, 1, 3, 4, 5],
    "29-10-2025": [0, 1, 2, 4, 5],
    "28-10-2025": [1, 2, 3, 5],
  },
};

const todoSlice = createSlice({
  name: "todoList",
  initialState: INITIAL_VALUE,
  reducers: {
    addToList(state, action) {
      state.list.push(action.payload);
    },
    addAllToList(state, action) {
      state.list = action.payload;
    },
    removeFromList(state, action) {
      state.list = state.list.filter((item) => item.id !== action.payload);
    },
    addHistory(state, action) {
      state.history.push({
        [action.payload.date]: action.payload.data,
      });
    },
    addAllHistory(state, action) {
      state.history = action.payload;
    },
  },
});

export const todoListReducer = todoSlice.reducer;

export const { addToList, removeFromList, addAllToList, addAllHistory } =
  todoSlice.actions;
