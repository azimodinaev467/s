import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTodos, addTodo, deleteTodo } from "../../api/todosApi";
import type { Todo } from "../../api/todosApi";

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk("fetchTodos", getTodos);

export const createTodo = createAsyncThunk(
  "createTodo",
  async (data: { name: string; description: string; images: File[] }) => {
    const id = await addTodo(data.name, data.description, data.images);

    return {
      ...data,
      id,
      images: data.images.map((image) => URL.createObjectURL(image)),
    };
  }
);

export const removeTodo = createAsyncThunk(
  "removeTodo",
  async (id: number) => {
    await deleteTodo(id);
    return id;
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(
          (todo) => todo.id !== action.payload
        );
      });
  },
});

export const selectTodos = (state: { todos: TodoState }) =>
  state.todos.todos;

export default todoSlice.reducer;
