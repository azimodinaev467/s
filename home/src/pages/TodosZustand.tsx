import { useEffect, useState } from "react";
import useTodoStore from "../store/zustand/todoStore";

function TodosZustand() {
  const { todos, loading, fetchTodos, addTodo, deleteTodo } =
    useTodoStore();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");


  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addTodo(name, description, images);

    setName("");
    setDescription("");
  
  };

  return (
    <div>
      <h1>Todos Zustand</h1>

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

      {todos.map((todo: any) => (
        <div key={todo.id}>
          <h3>{todo.name}</h3>
          <p>{todo.description}</p>

          {todo.images?.map((image: string, index: number) => (
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

export default TodosZustand;
