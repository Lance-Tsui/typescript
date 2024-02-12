import {
  SKContainer,
  SKLabel,
  Layout,
  SKElement,
  SKEvent,
  SKResizeEvent,
} from "simplekit/imperative-mode";

import { eventBus } from './eventbus';

// local imports
import { Observer } from "./observer";
import { Model } from "./model";

export class InfoView extends SKContainer implements Observer {
  //#region observer pattern

  update(): void {
    const num = this.model.numDone;
    console.log(this.model);
    if (num === 0) {
      this.message.text = "Select One";
    } else if (this.model.numDone > 1) {
      this.message.text = "Too Many Selected";
    } else {
      this.message.text = `edit id#${this.model.selectId}`;
    }
  }

  //#endregion

  message = new SKLabel({ text: "?" });

  constructor(private model: Model) {
    super();

    this.width = 150;
    this.fill = "whitesmoke";
    this.fillHeight = 1;

    // setup the view
    this.layoutMethod = Layout.makeCentredLayout();

    this.addChild(this.message);

    // register with the model when we're ready
    this.model.addObserver(this);

    eventBus.on('resize', (e: SKResizeEvent) => {
      this.width = e.width / 3;

    });
  }

}
