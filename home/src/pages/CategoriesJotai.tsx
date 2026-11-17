import { useState } from "react";
import { useAtom, useSetAtom } from "jotai";
import {
  categoriesAtom,
  addCategoryAtom,
  deleteCategoryAtom,
} from "../store/jotai/categoryAtoms";

function CategoriesJotai() {
  const [categories] = useAtom(categoriesAtom);

  const addCategory = useSetAtom(addCategoryAtom);
  const deleteCategory = useSetAtom(deleteCategoryAtom);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!name || !description) return;

    addCategory({ id: Date.now(), name, description });

    setName("");
    setDescription("");
  };

  return (
    <div>
      <h1>Categories Jotai</h1>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button onClick={handleSubmit}>Add</button>

      {categories.map((category) => (
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

export default CategoriesJotai;
