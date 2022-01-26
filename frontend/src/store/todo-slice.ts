import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Task } from "types/Task";

interface TodoState {
  todos: Task[];
}

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    replaceAllTodos(state, action: PayloadAction<Task[]>) {
      state.todos = action.payload;
    },
    updateTodoById(state, actions: PayloadAction<{ task: Task; id: string }>) {
      const { id, task } = actions.payload;
      const todoIndex = +id - 1;
      state.todos[todoIndex] = task;
    },
  },
});

export default todoSlice.reducer;

export const todoActions = todoSlice.actions;
