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
    State.addTodo(shape);
    State.selectedTodoId.value = null;
  }

  function handleShapeChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    setShape(target.value);
  }

  // Function to handle deletion of the currently selected todo
  function handleDelete() {
    State.deleteTodo();
  }

  // Function to handle clearing all completed todos
  function handleClear() {
    // Filter out the todos that are done and update the todos list
    State.clearTodo()
  }


  return (
    <div id="toolbar">
      <button onClick={handleAdd} disabled={State.num.value == 25}>Add</button>
      <select value={shape} onChange={handleShapeChange}>
        <option value="Square">Square</option>
        <option value="Star">Star</option>
        <option value="Bullseye">Bullseye</option>
        <option value="Cat">Cat</option>
      </select>
      <button onClick={handleDelete} disabled={State.numDone.value == 0}>Delete</button>
      <button onClick={handleClear} disabled={State.num.value == 0}>Clear</button>
    </div>
  );
}
