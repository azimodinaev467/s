import { create } from "zustand";
import {
  getTodos,
  addTodo,
  deleteTodo,
} from "../../api/todosApi";
import type { Todo } from "../../api/todosApi";

const useTodoStore = create((set: any, get: any) => ({
  todos: [] as Todo[],
  loading: false,

  fetchTodos: async () => {
    set({ loading: true });

    const data = await getTodos();

    set({ todos: data, loading: false });
  },

  addTodo: async (name: string, description: string, images: File[]) => {
    const id = await addTodo(name, description, images);

    set({
      todos: [
        ...get().todos,
        {
          id,
          name,
          description,
          images: images.map((image) => URL.createObjectURL(image)),
        },
      ],
    });
  },

  deleteTodo: async (id: number) => {
    await deleteTodo(id);

    set({
      todos: get().todos.filter((todo: any) => todo.id !== id),
    });
  },
}));

export default useTodoStore;
