import {
  SKButton,
  SKContainer,
  Layout,
  SKTextfield,
} from "simplekit/imperative-mode";

import { Observer } from "./observer";
import { Model } from "./model";

export class FormView extends SKContainer implements Observer {

  // Define the new buttons
  addButton = new SKButton({ text: "Add", width: 80 });
  addStarButton = new SKButton({ text: "Add Star", width: 80 });
  deleteButton = new SKButton({ text: "Delete", width: 80 });
  clearButton = new SKButton({ text: "Clear", width: 80 });

  constructor(private model: Model) {
    super();
    this.id = "entry";
    this.fill = "lightgrey";
    this.padding = 10;
    this.fillWidth = 1;
    this.height = 50; // Adjust height if necessary to fit buttons
    this.layoutMethod = Layout.makeFillRowLayout({ gap: 10 });



    // Add widgets to the view
    this.addChild(this.addButton);
    this.addChild(this.addStarButton);
    this.addChild(this.deleteButton);
    this.addChild(this.clearButton);

    // Setup event listeners for buttons
    this.addButton.addEventListener("action", () => {
        if (model.selectId !== null) {
          model.update(model.selectId, {  });
        } else {
          model.create();
        }
    });
    this.addStarButton.addEventListener("action", () => {/* Handle Add Star action */});
    this.deleteButton.addEventListener("action", () => {
      this.model.all().forEach(todo => {
        if (todo.done) {
          model.delete(todo.id);
        }
      });
    });
    this.clearButton.addEventListener("action", () => {
      this.model.all().forEach(todo => {
        if (todo) {
          model.delete(todo.id);
        }
      });
    });

    // Update method and other configurations remain unchanged
  }

  update(): void {
    // Your existing update logic here
  }
}
