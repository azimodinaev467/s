import { create } from "zustand";

export type Category = {
  id: number;
  name: string;
  description: string;
};

const useCategoryStore = create((set: any) => ({
  categories: [] as Category[],

  addCategory: (category: Category) =>
    set((state: any) => ({
      categories: [...state.categories, category],
    })),

  deleteCategory: (id: number) =>
    set((state: any) => ({
      categories: state.categories.filter(
        (category: Category) => category.id !== id
      ),
    })),
}));

export default useCategoryStore;
