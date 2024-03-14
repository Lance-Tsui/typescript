import { Subject } from "./observer";
import { getFixedColor, hueColor, isHueStringValid } from "./color";

type Todo = {
  id: number;
  done: boolean;
  color: string;
};

// super simple "id generator"
let uniqueId = 1;

export class Model extends Subject {
  // model data (i.e. model state)
  private todos: Todo[] = [];

  // information methods
  get num() {
    return this.todos.length;
  }

  get numDone() {
    return this.todos.filter((t) => t.done).length;
  }

  // model "business logic" (CRUD)

  // Create
  create(task: string) {
    if (this.num < 25) {
      const newcolor = hueColor();
      this.todos = [
        ...this.todos,
        { id: uniqueId++, done: false, color: newcolor },
      ];
      this.notifyObservers();
    }
  }

  // Read
  todo(id: number): Todo | undefined {
    return this.todos.find((t) => t.id === id);
    // no need to notify observers since data not changed
  }

  all(): Todo[] {
    // return a copy (avoids bugs if views try to edit)
    return [...this.todos];
  }

  get(): Todo | undefined {
    return this.todos.find((t) => t.done === true);
  }

  // Update
  update(id: number, todo: { text?: string; done?: boolean }) {
    this.todos = this.todos.map((t) =>
      // if todo matches id, then spread it and replace
      // with defined properties in todo object argument
      t.id === id ? { ...t, ...todo } : t
    );
    this._selectId = null;
    this.notifyObservers();
  }

  updatecolor(id: number, color: string) {
      this.todos = this.todos.map((t) =>
        t.id === id ? { ...t, color: color } : t
      );
      this.notifyObservers();
  }


  // select a todo to edit
  private _selectId: number | null = null;
  get selectId() {
    return this._selectId;
  }
  select(id: number) {
    this._selectId = id;
    this.notifyObservers();
  }

  // Delete
  delete(id: number) {
    this.todos = this.todos.filter((t) => t.id !== id);
    // edge case if editing a todo that is deleted
    if (this._selectId === id) this._selectId = null;
    this.notifyObservers();
  }

  deselectOther(selectedId: number) {
    this.todos = this.todos.map(todo => {
      if (todo.id !== selectedId) {
        return { ...todo, done: false };
      }
      return todo;
    });
    this.notifyObservers();
  }

  deselectAll() {
    this.todos = this.todos.map(todo => ({
      ...todo,
      done: false
    }));
    this.notifyObservers();
  }  
}
