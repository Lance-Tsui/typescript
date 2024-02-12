import {
  SKContainer,
  SKLabel,
  Layout,
  SKButton,
} from "simplekit/imperative-mode";

// local imports
import { Observer } from "./observer";
import { Model } from "./model";
import { SKSquare } from "./container";

export class TodoView extends SKContainer implements Observer {


  update() {
    const todo = this.model.todo(this.todoId);
    if (!todo) return;
  }

  square = new SKSquare();

  constructor(private model: Model, public todoId: number, fillcolor: string) {
    super();
    // view design
    this.padding = 5;
    this.margin = 5;
    this.fill = fillcolor;
    this.width = 50;
    this.height = 50;
    this.border = "grey";
    
    // setup the view
    this.layoutMethod = Layout.makeFillRowLayout({ gap: 10 });

    this.addChild(this.square);

    // controllers
    this.square.addEventListener("action", () => {
      this.square.checked = !this.square.checked;
      model.update(todoId, { done: this.square.checked });
    });
    


    // register with the model when we're ready
    this.model.addObserver(this);
  }
}
