import { atom } from "jotai";
import type { Category } from "../zustand/categoryStore";

export const categoriesAtom = atom<Category[]>([]);

export const addCategoryAtom = atom(null, (get, set, category: Category) => {
  set(categoriesAtom, [...get(categoriesAtom), category]);
});

export const deleteCategoryAtom = atom(null, (get, set, id: number) => {
  set(
    categoriesAtom,
    get(categoriesAtom).filter((item) => item.id !== id)
  );
});
