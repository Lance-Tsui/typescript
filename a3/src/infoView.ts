// local imports
import View from "./view";
import { Model } from "./model";

import "./infoView.css";

export class InfoView implements View {
  //#region observer pattern

  update() {
    const num = this.model.numDone;
    if (num == 1) {

    }
    else if (num === 0) {
      this.container.innerText = "Select One";
    } else if (this.model.numDone > 1) {
      this.container.innerText = "Too Many Selected";
    }
  }

  //#endregion

  // the view root container
  private container: HTMLDivElement;
  get root(): HTMLDivElement {
    return this.container;
  }

  constructor(private model: Model) {
    // setup the view root container
    this.container = document.createElement("div");
    this.container.id = "info";

    // register with the model
    this.model.addObserver(this);
  }
}
