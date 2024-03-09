// local imports
import View from "./view";
import { Model } from "./model";

import "./todoView.css";

export class TodoView implements View {
  //#region observer pattern

  update(): void {
    const todo = this.model.todo(this.todoId);
    if (!todo) return;
    this.checkbox.checked = todo.done;
  }

  //#endregion

  checkbox = document.createElement("input");

  // the view root container
  private container: HTMLDivElement;
  get root(): HTMLDivElement {
    return this.container;
  }

  constructor(private model: Model, private todoId: number) {
    // setup the view root container
    this.container = document.createElement("div");
    this.container.className = "todo";

    // setup the view
    this.checkbox.type = "checkbox";

    // add widgets to the view
    this.container.appendChild(this.checkbox);

    // controllers
    this.checkbox.addEventListener("click", () => {
      model.update(todoId, { done: this.checkbox.checked });
    });

    // register with the model
    this.model.addObserver(this);
  }
}