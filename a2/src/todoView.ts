import {
  SKContainer,
  SKLabel,
  Layout,
  SKButton,
} from "simplekit/imperative-mode";

// local imports
import { Observer } from "./observer";
import { Model } from "./model";
import { SKCheckbox } from "./checkbox";

export class TodoView extends SKContainer implements Observer {
  //#region observer pattern

  update() {
    const todo = this.model.todo(this.todoId);
    if (!todo) return;
    this.checkbox.checked = todo.done;
  }

  //#endregion

  checkbox = new SKCheckbox();


  constructor(private model: Model, public todoId: number, public color: string) {
    super();

    this.margin = 5;
    this.padding = 5;
    this.width = 55;
    this.height = 55;
    // setup the view
    this.layoutMethod = Layout.makeFillRowLayout({ gap: 10 });
    const todo = this.model.todo(todoId);
    if (todo) {
        this.checkbox = new SKCheckbox({ checked: todo.done, color: todo.color });
        this.addChild(this.checkbox);
    }



    // controllers
    this.checkbox.addEventListener("action", () => {
      model.update(todoId, { done: this.checkbox.checked });
    });


    // register with the model when we're ready
    this.model.addObserver(this);
  }
}
