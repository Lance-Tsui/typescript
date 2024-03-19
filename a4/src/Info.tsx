import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import "./Info.css";
import { selectedTodoId, todos, updateTodo, numDone, getSelected } from "./state";
import { getFixedColor, getHue } from './color';

export default function Info() {
  const [hue, setHue] = useState('');

  useEffect(() => {
    if (numDone.value === 1) {
      const todo = getSelected()
      console.log(todo?.color)
      if (todo) {
        setHue(getHue(todo.color.toString())); // Assuming todo.color is a string that represents the hue
      }
    }
  }, [selectedTodoId.value, todos.value]);

  const handleHueChange = (e) => {
    const value = e.target.value;
    const numValue = Number(value);
    if (value === '' || numValue < 0 || numValue > 360) {
      e.target.style.borderColor = 'red';
    } else {
      e.target.style.borderColor = ''; // Reset to default
      setHue(value); // Update internal hue state
      if (numDone.value === 1 && numValue >= 0 && numValue <= 360) {
        updateTodo(getSelected().id, { color: getFixedColor(numValue.toString()) }); // Ensure this function call is correct
      }
    }
  };

  return (
    <div id="info">
      {numDone.value === 0 ? "Select One" : numDone.value === 1 ? (
        <div className="editor">
          <div className="display-area">
            {/* Render the selected square here */}
          </div>
          <div className="form">
            <label>
              Hue:
              <input type="number" value={hue} onChange={handleHueChange} min="0" max="360" />
            </label>
          </div>
        </div>
      ) : "Too Many Selected"}
    </div>
  );
}