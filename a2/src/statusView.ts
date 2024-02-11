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
  
  export class StatusView extends SKContainer implements Observer {
    //#region observer pattern
  
    update(): void {
      const num = this.model.num;
      if (num === 20) {
        this.message.text = "FULL";
      } else if (this.model.selectId !== null) {
        this.message.text = `edit id#${this.model.selectId}`;
      } else {
        let text = `${num} shape${num > 1 ? "s" : ""}`;
        if (this.model.numDone > 0) {
          text += ` (${this.model.numDone} selected)`;
        }
  
        this.message.text = text;
      }
    }
    
    message = new SKLabel({ text: "?" });

    constructor(private model: Model) {
      super();
  
      // setup the view
      this.id = "bottom";
      this.fill = "lightgrey";
      this.padding = 10;
  
      // try removing fillWidth and/or height
      this.fillWidth = 1;
      this.height = 50;

      this.message.margin = 15;
  
      this.layoutMethod = Layout.makeFillRowLayout();
 
      this.addChild(this.message);

      // register with the model when we're ready
      this.model.addObserver(this);
    }
  }
  