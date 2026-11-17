
import TodosRedux from "./pages/TodosRedux";
import TodosZustand from "./pages/TodosZustand";
import TodosJotai from "./pages/TodosJotai";
import CategoriesZustand from "./pages/CategoriesZustand";
import CategoriesJotai from "./pages/CategoriesJotai";

export default function App() {
  return (
    <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 30 }}>
      <section>
        <h2>Async (Todos)</h2>

        <div style={{ display: "flex", gap: 24 }}>
          <TodosRedux />
          <TodosZustand />
          <TodosJotai />
        </div>
      </section>

      <section>
        <h2>Sync (Categories)</h2>

        <div style={{ display: "flex", gap: 24 }}>
          <CategoriesZustand />
          <CategoriesJotai />
        </div>
      </section>
    </div>
  );
}
