import {
  SKContainer,
  SKLabel,
  Layout,
  SKResizeEvent,
  SKTextfield,
} from "simplekit/imperative-mode";

import { eventBus } from './eventbus';

// local imports
import { Observer } from "./observer";
import { Model } from "./model";
import { getHueFromHSL } from "./colorScheme";
import { makeStackColLayout } from "./stackCol";

export class InfoView extends SKContainer implements Observer {
  //#region observer pattern

  public squareDisplay: SKContainer;
  public hueInput: SKTextfield;
  public hueDisplay: SKLabel;

  update(): void {
    const num = this.model.numDone;
    if (num == 1) {
      this.removeChild(this.message);
      
      var color = this.model.get()?.color;
      
      if (color) {
        this.squareDisplay.fill = color;
        this.hueInput.text = getHueFromHSL(color);
        this.addChild(this.squareDisplay);
        // this.addChild(this.hueDisplay);
        this.addChild(this.hueInput);
        
      }

    }
    else if (num === 0) {
      this.removeChild(this.squareDisplay);
      this.removeChild(this.hueInput);
      this.removeChild(this.hueDisplay);
      this.message.text = "Select One";
      this.addChild(this.message);
    } else if (this.model.numDone > 1) {
      this.removeChild(this.squareDisplay);
      this.removeChild(this.hueInput);
      this.removeChild(this.hueDisplay);
      this.message.text = "Too Many Selected";
      this.addChild(this.message);
    }

  }

  //#endregion

  message = new SKLabel({ text: "?" });

  constructor(private model: Model) {
    super();

    this.fill = "whitesmoke";
    this.fillHeight = 1;

    this.squareDisplay = new SKContainer();
    this.squareDisplay.width = 100;
    this.squareDisplay.height = 100;
    this.layoutMethod = Layout.makeCentredLayout();
    this.hueInput = new SKTextfield({});
    this.hueInput.width = 50;
    this.hueDisplay = new SKLabel({ text: "Hue" });
    this.addChild(this.message);

    // register with the model when we're ready
    this.model.addObserver(this);

    eventBus.on('resize', (e: SKResizeEvent) => {
      this.width = e.width / 3;
    });
  }

}
