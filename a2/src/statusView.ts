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
    let lefttext = "";
    let righttext = "";
    if (this.model.selectId !== null) {
      this.leftMessage.text = `edit id#${this.model.selectId}`;
    } else {
      lefttext = `${num} shape${num > 1 ? "s" : ""}`;
      if (this.model.numDone > 0) {
        righttext += `selected ${this.model.numDone}`;
      }

      if (this.model.num == 20) {
        lefttext += " FULL";
      }

      this.leftMessage.text = lefttext;
    }
    this.rightMessage.text = righttext;
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
