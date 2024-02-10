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
        this.message.text = "hello world";
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
  
      this.layoutMethod = Layout.makeCentredLayout();
 
      this.addChild(this.message);

      // register with the model when we're ready
      this.model.addObserver(this);
    }
  }
  