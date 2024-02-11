import {
  SKButton,
  SKContainer,
  Layout,
  SKTextfield,
  SKLabel,
} from "simplekit/imperative-mode";

// local imports
import { Observer } from "./observer";
import { Model } from "./model";
import { makeRowLayoutWithJustifyContent } from "./justifyRow";

export class StatusView extends SKContainer implements Observer {
  leftMessage = new SKLabel({ text: "?" });
  rightMessage = new SKLabel({ text: "?" });

  update(): void {
    const num = this.model.num;
    if (num === 20) {
      this.leftMessage.text = "FULL";
    } else if (this.model.selectId !== null) {
      this.leftMessage.text = `edit id#${this.model.selectId}`;
    } else {
      let text = `${num} shape${num > 1 ? "s" : ""}`;
      if (this.model.numDone > 0) {
        text += ` (${this.model.numDone} selected)`;
      }

      this.leftMessage.text = text;
    }
    this.rightMessage.text = "hello world";
  }

  constructor(private model: Model) {
    super();

    // Setup the view
    this.id = "bottom";
    this.fill = "lightgrey";
    this.fillWidth = 1;
    this.height = 50;

    // Use a row layout with space between to push messages to each side
    this.layoutMethod = makeRowLayoutWithJustifyContent();

    // Add messages to the view
    this.addChild(this.leftMessage);
    this.addChild(this.rightMessage);

    // Register with the model when we're ready
    this.model.addObserver(this);
  }
}
