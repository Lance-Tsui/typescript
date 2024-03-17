import { useState } from 'preact/hooks';
import "./Form.css";
import * as State from "./state";

type FormProps = {
  editId: number | null;
};

export default function Form({ editId }: FormProps) {
  const [shape, setShape] = useState<string>("Square");

  function handleAdd() {
    // Assuming addTodo expects an object with shape and potentially other data
    State.addTodo({ shape });
    State.selectedTodoId.value = null;
  }

  function handleShapeChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    setShape(target.value);
  }

  function handleDelete() {
    // Implement delete logic here
    console.log("Delete action for", editId);
  }

  function handleClear() {
    // Implement clear logic here
    console.log("Clear action");
  }

  return (
    <div id="toolbar">
      <button onClick={handleAdd}>Add</button>
      <select value={shape} onChange={handleShapeChange}>
        <option value="Square">Square</option>
        <option value="Star">Star</option>
        <option value="Bullseye">Bullseye</option>
        <option value="Cat">Cat</option>
      </select>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleClear}>Clear</button>
    </div>
  );
}
