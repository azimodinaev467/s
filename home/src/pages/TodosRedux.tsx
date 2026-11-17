import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/redux/store";
import {
    fetchTodos,
    createTodo,
    removeTodo,
} from "../store/redux/todoSlice";

function TodosRedux() {
    const dispatch = useDispatch<AppDispatch>();
    const { todos, loading, error } = useSelector((state: RootState) => state.todos);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
   

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(createTodo({ name, description }));

        setName("");
        setDescription("");

    };

    return (
        <div>
            <h1>Todos Redux Toolkit</h1>

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
            {error && <p>{error}</p>}

            {todos.map((todo) => (
                <div key={todo.id}>
                    <h3>{todo.name}</h3>
                    <p>{todo.description}</p>

                    {todo.images?.map((image, index) => (
                        <img key={index} src={image} alt={todo.name} width="100" />
                    ))}

                    <button onClick={() => dispatch(removeTodo(todo.id))}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}

export default TodosRedux;
