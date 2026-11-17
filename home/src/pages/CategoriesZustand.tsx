import { useState } from "react";
import useCategoryStore from "../store/zustand/categoryStore";

function CategoriesZustand() {
    const { categories, addCategory, deleteCategory } = useCategoryStore();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        addCategory({ id: Date.now(), name, description });

        setName("");
        setDescription("");
    };

    return (
        <div>
            <h1>Categories Zustand</h1>

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

                <button type="submit">Add</button>
            </form>

            {categories.map((category: any) => (
                <div key={category.id}>
                    <h3>{category.name}</h3>
                    <p>{category.description}</p>

                    <button onClick={() => deleteCategory(category.id)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}

export default CategoriesZustand;
