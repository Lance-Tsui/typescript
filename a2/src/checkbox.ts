import {
  SKElement,
  SKElementProps,
  SKEvent,
  SKKeyboardEvent,
  SKMouseEvent,
  Style,
} from "simplekit/imperative-mode";

import { getShiftKeyDown } from "./shiftDown";

export type SKCheckboxProps = SKElementProps & { checked?: boolean, color?: string };

export class SKCheckbox extends SKElement {
  constructor({
    checked = false,
    color = "",
    ...elementProps
  }: SKCheckboxProps = {}) {
    super(elementProps);
    this.checked = checked;
    this.color = color;
    this.width = 50;
    this.height = 50;
    this.calculateBasis();
    this.doLayout();
  }

  public state: "idle" | "hover" | "down" = "idle";

  public checked: boolean;

  public color: string;

  handleMouseEvent(me: SKMouseEvent) {
    switch (me.type) {
      case "mousedown":
        this.state = "down";
        return true;
        break;
      case "mouseup":
        this.state = "idle";
        this.checked = !this.checked;
        // return true if a listener was registered
        return this.sendEvent({
          source: this,
          timeStamp: me.timeStamp,
          type: "action",
        } as SKEvent);
        break;
      case "mouseenter":
        this.state = "hover";
        return true;
        break;
      case "mouseexit":
        this.state = "idle";
        return true;
        break;
    }
    return false;
  }

  draw(gc: CanvasRenderingContext2D) {
    // to save typing "this" so much

    gc.save();

    const w = this.paddingBox.width;
    const h = this.paddingBox.height;

    gc.translate(this.margin, this.margin);


    // checked state
    if (this.checked === true) {
      gc.beginPath();
      gc.rect(this.x, this.y, w, h);
      gc.strokeStyle = Style.focusColour;
      gc.lineWidth = 8;
      gc.stroke();
    }

    // thick highlight rect
    if (this.state == "hover" || this.state == "down") {
      gc.beginPath();
      gc.rect(this.x, this.y, w, h);
      gc.strokeStyle = Style.highlightColour;
      gc.lineWidth = 8;
      gc.stroke();
    }

    // normal background
    gc.beginPath();
    gc.rect(this.x, this.y, w, h);
    gc.fillStyle = this.color;
    gc.strokeStyle = "black";
    // change fill to show down state
    gc.lineWidth = this.state == "down" ? 4 : 2;
    gc.fill();
    gc.stroke();
    gc.clip(); // clip text if it's wider than text area



    gc.restore();

    // element draws debug viz if flag is set
    super.draw(gc);
  }

  public toString(): string {
    return `SKCheckbox`;
  }
}
