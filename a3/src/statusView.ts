import View from "./view";
import { Model } from "./model";

import "./statusView.css";
import { getShiftKeyDown } from "./shiftDown";

export class StatusView implements View {
    private container: HTMLDivElement;
    private leftColumn: HTMLDivElement;
    private rightColumn: HTMLDivElement;
  
    get root(): HTMLDivElement {
      return this.container;
    }
  
    constructor(private model: Model) {
      this.container = document.createElement("div");
      this.container.id = "status";
  
      // Create and append the columns
      this.leftColumn = this.createStatusColumn('left');
      this.rightColumn = this.createStatusColumn('right');
  
      // Append columns to the container
      this.container.appendChild(this.leftColumn);
      this.container.appendChild(this.rightColumn);
  
      // Update the view with initial values
      this.update();
  
      // Register with the model
      this.model.addObserver(this);
    }
  
    update(): void {
      const num = this.model.num;
      let lefttext = "";
      let righttext = "";
  
      lefttext = `${num} shape${num > 1 ? "s" : ""}`;

      if(getShiftKeyDown()) {
        righttext += "SHIFT";
      }

      righttext += ` selected ${this.model.numDone}`;
  
      if (this.model.num == 25) {
        lefttext += " FULL";
      }
  
      this.leftColumn.textContent = lefttext;
      
      this.rightColumn.textContent = righttext;
    }
  
    private createStatusColumn(textId: string): HTMLDivElement {
      const column = document.createElement("div");
      column.classList.add("status-column" + textId);
      column.textContent = textId; // Initial text, can be removed or replaced as needed
      return column;
    }
  }
  