const API = "https://to-dos-api.softclub.tj/api/to-dos";

export type Todo = {
  id: number;
  name: string;
  description: string;
  images: string[];
};

export const getTodos = async () => {
  const res = await fetch(API);
  const data = await res.json();

  return data.data;
};

export const addTodo = async (
  name: string,
  description: string,
  images: File[]
) => {
  const formData = new FormData();

  formData.append("Name", name);
  formData.append("Description", description);

  images.forEach((image) => {
    formData.append("Images", image);
  });

  const res = await fetch(API, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  return data.data;
};

export const deleteTodo = async (id: number) => {
  const res = await fetch(`${API}?id=${id}`, {
    method: "DELETE",
  });

  const data = await res.json();

  return data.data;
};
