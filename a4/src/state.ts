import { computed, signal } from "@preact/signals";
import { hueColor } from "./color";

export type Todo = {
  id: number;
  color: string;
  done: boolean;
};

//#region state

// the array of all Todos
export const todos = signal<Todo[]>([]);

export const num = computed(() => todos.value.length);

export const numDone = computed(
  () => todos.value.filter((t) => t.done).length
);

// selected todo ID (for editing)
export const selectedTodoId = signal<number | null>(null);

// // selected todo (just a shortcut, not used in demo)
// export const selectedTodo = computed(() => {
//   return selectedTodoId.value
//     ? getTodo(selectedTodoId.value)
//     : undefined;
// });

//#endregion

//#region convenience functions

// Read
export const getTodo = (id: number): Todo | undefined => {
  return todos.value.find((t) => t.id === id);
};

//#endregion

//#region mutations

// very simple unique id generator
let uniqueId = 1;

// model "business logic" (CRUD)

// Create
export const addTodo = (color: string) => {
  const newcolor = hueColor();
  // GOOD: assigns new array, signal will know
  todos.value = [
    ...todos.value,
    {
      id: uniqueId++,
      color: newcolor,
      done: false,
    },
  ];

  //   // BAD: this changes the array, but array ref is same
  //   // the signal won't know something changed (it's not reactive)
  //   todos.value.push({
  //     id: uniqueId++,
  //     color,
  //     done: false,
  //   });

  selectedTodoId.value = null;
};

// Update
export const updateTodo = (
  id: number,
  todo: { color?: string; done?: boolean }
) => {
  todos.value = todos.value.map((t) =>
    // if todo matches id, then spread it and replace
    // with defined properties in todo object argument
    t.id === id ? { ...t, ...todo } : t
  );
  selectedTodoId.value = null;
};

// Delete
export const deleteTodo = () => {
  // GOOD: assigns new array, signal will know
  todos.value = todos.value.filter(todo => !todo.done);

  // After deleting completed todos, it's safe to assume no todo is selected,
  // or you might be deleting the selected todo, so reset the selectedTodoId.
  selectedTodoId.value = null;
};

export const clearTodo = () => {
  // Assigns an empty array, signal will know the todos list has been cleared
  todos.value = [];
  // Reset the selectedTodoId as well since there are no todos left to select
  selectedTodoId.value = null;
};

export const getSelected = (): Todo | undefined => {
  return todos.value.find(todo => todo.done === true);
};

//#endregion
