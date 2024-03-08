// local imports
import View from "./view";
import { Model } from "./model";

import "./formView.css";

export class FormView implements View {
  private container: HTMLDivElement;
  private dropdown: HTMLSelectElement;
  private addButton: HTMLButtonElement;
  private deleteButton: HTMLButtonElement;
  private clearButton: HTMLButtonElement;

  get root(): HTMLDivElement {
    return this.container;
  }

  constructor(private model: Model) {
    this.container = document.createElement("div");
    this.container.id = "form";

    // Add button
    this.addButton = this.createButton("Add");
    this.container.appendChild(this.addButton);

    // Dropdown
    this.dropdown = document.createElement("select");
    const optionSquare = document.createElement("option");
    optionSquare.value = "square";
    optionSquare.text = "Square";
    this.dropdown.appendChild(optionSquare);
    this.container.appendChild(this.dropdown);

    // Delete button
    this.deleteButton = this.createButton("Delete");
    this.container.appendChild(this.deleteButton);

    // Clear button
    this.clearButton = this.createButton("Clear");
    this.container.appendChild(this.clearButton);

    // Setup event listeners (example for Add button, adapt as needed for others)
    this.addButton.addEventListener("click", () => {
      const shape = this.dropdown.value;
      // Implement logic for adding
      console.log(`Add: ${shape}`);
      // You would replace console.log with your model manipulation logic
    });

    this.deleteButton.addEventListener("click", () => {
      // Implement logic for delete
    });

    this.clearButton.addEventListener("click", () => {
      // Implement logic for clear
    });

    // register with the model
    this.model.addObserver(this);
  }

  update(): void {
    // Your existing update logic here, adapt if needed
  }

  private createButton(label: string): HTMLButtonElement {
    const button = document.createElement("button");
    button.innerText = label;
    return button;
  }
}

