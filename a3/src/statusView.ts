import View from "./view";
import { Model } from "./model";

import "./statusView.css";

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
      this.leftColumn = this.createStatusColumn('statusleft');
      this.rightColumn = this.createStatusColumn('statusright');
  
      // Append columns to the container
      this.container.appendChild(this.leftColumn);
      this.container.appendChild(this.rightColumn);
  
      // Update the view with initial values
      this.update();
  
      // Register with the model
      this.model.addObserver(this);
    }
  
    update() {
      // Assuming the model has methods to get textA and textB
      // Update these methods to retrieve data accordingly
      this.leftColumn.textContent = "left column"; // Example method
      this.rightColumn.textContent = "right column"; // Example method
    }
  
    private createStatusColumn(textId: string): HTMLDivElement {
      const column = document.createElement("div");
      column.classList.add("status-column");
      column.textContent = textId; // Initial text, can be removed or replaced as needed
      return column;
    }
  }
  