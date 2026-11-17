import { useEffect, useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import {
  todosAtom,
  loadingAtom,
  fetchTodosAtom,
  addTodoAtom,
  deleteTodoAtom,
} from "../store/jotai/todoAtoms";

function TodosJotai() {
  const todos = useAtomValue(todosAtom);
  const loading = useAtomValue(loadingAtom);

  const fetchTodos = useSetAtom(fetchTodosAtom);
  const addTodo = useSetAtom(addTodoAtom);
  const deleteTodo = useSetAtom(deleteTodoAtom);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addTodo({ name, description, images });

    setName("");
    setDescription("");
    setImages([]);
  };

  return (
    <div>
      <h1>Todos Jotai</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setImages(Array.from(e.target.files || []))}
          required
        />

        <button type="submit">Add Todo</button>
      </form>

      {loading && <p>Loading...</p>}

      {todos.map((todo) => (
        <div key={todo.id}>
          <h3>{todo.name}</h3>
          <p>{todo.description}</p>

          {todo.images?.map((image, index) => (
            <img key={index} src={image} width="100" alt={todo.name} />
          ))}

          <button onClick={() => deleteTodo(todo.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default TodosJotai;
