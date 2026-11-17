import { atom } from "jotai";
import {
  getTodos,
  addTodo,
  deleteTodo,
  type Todo,
} from "../../api/todosApi";

export const todosAtom = atom<Todo[]>([]);
export const loadingAtom = atom(false);

export const fetchTodos = async (set: any) => {
  set(loadingAtom, true);

  const data = await getTodos();

  set(todosAtom, data);
  set(loadingAtom, false);
};

export const fetchTodosAtom = atom(null, async (get, set) => {
  await fetchTodos(set);
});

export const addTodoAtom = atom(
  null,
  async (get, set, data: {
    name: string;
    description: string;
    images: File[];
  }) => {
    const id = await addTodo(data.name, data.description, data.images);

    set(todosAtom, [
      ...get(todosAtom),
      {
        id,
        name: data.name,
        description: data.description,
        images: data.images.map((image) => URL.createObjectURL(image)),
      },
    ]);
  }
);

export const deleteTodoAtom = atom(null, async (get, set, id: number) => {
  await deleteTodo(id);

  set(
    todosAtom,
    get(todosAtom).filter((todo) => todo.id !== id)
  );
});
