import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import "./Info.css";
import { todos, selectedTodoId, numDone, getTodo } from "./state";

export default function Info() {
  // 使用useState来存储选中的颜色值
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    const todo = getTodo(selectedTodoId.value); // 使用getTodo函数获取当前选中的todo项
    if (todo) {
      setSelectedColor(todo.color); // 如果找到了todo，就更新selectedColor状态
    } else {
      setSelectedColor(''); // 否则，重置selectedColor
    }
  }, [selectedTodoId.value]); // 依赖于selectedTodoId的变化

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
              <input type="number" value={selectedColor} min="0" max="360" />
            </label>
          </div>
        </div>
      ) : "Too Many Selected"}
    </div>
  );
}
