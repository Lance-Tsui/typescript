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

    this.addButton.addEventListener("click", () => {
      const text = this.dropdown.value;
      if (model.selectId !== null) {
        model.update(model.selectId, { text });
      } else {
        model.create(text);
      }
    });
    this.container.appendChild(this.addButton);

    // Dropdown
    this.dropdown = document.createElement("select");

    // Define the options for the dropdown
    const options = [
      { value: "square", text: "Square" },
      { value: "star", text: "Star" },
      { value: "bullseye", text: "Bullseye" },
      { value: "cat", text: "Cat" }
    ];
    
    // Create and append the option elements to the dropdown
    options.forEach(optionInfo => {
      const option = document.createElement("option");
      option.value = optionInfo.value;
      option.text = optionInfo.text;
      this.dropdown.appendChild(option);
    });
    
    // Append the dropdown to the container
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
      this.model.all().forEach(todo => {
        if (todo.done) {
          model.delete(todo.id);
        }
      });
    });

    this.clearButton.addEventListener("click", () => {
      this.model.all().forEach(todo => {
        if (todo) {
          model.delete(todo.id);
        }
      });
    });

    // register with the model
    this.model.addObserver(this);
  }

  update(): void {
    if (this.model.num >= 25) {
      this.addButton.disabled = true;
    } else {
      this.addButton.disabled = false;
    }

    if (this.model.num == 0) {
      this.clearButton.disabled = true;
    } else {
      this.clearButton.disabled = false;
    }
  }

  private createButton(label: string): HTMLButtonElement {
    const button = document.createElement("button");
    button.innerText = label;
    return button;
  }
}

