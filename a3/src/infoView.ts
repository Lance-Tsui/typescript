// local imports
import View from "./view";
import { Model } from "./model";
import { getHue, getFixedColor, hueColor } from "./color";

import "./infoView.css";

export class InfoView implements View {
  // Editor elements

  constructor(private model: Model) {
    this.container = document.createElement("div");
    this.container.id = "info";
    this.model.addObserver(this);
  }

  update() {
    this.container.innerHTML = ''; // Clear previous contents

    const num = this.model.numDone;
    if (num === 1) {
      // Create the square display area
      const squareDisplay = document.createElement('div');
      squareDisplay.className = 'square-display';
      
      // Assuming model provides selected square's details
      const selectedSquare = this.model.get();

      var squareId = selectedSquare?.id;

      // The square representation, e.g., a div with background color
      const square = document.createElement('div');
      square.style.width = '100px'; // Scale as large as possible within the display area
      square.style.height = '100px';

      if (selectedSquare) {
        square.style.backgroundColor = selectedSquare.color;
      
      const editForm = document.createElement('div');
      editForm.className = 'edit-form';

      const hueRow = document.createElement('div');
      hueRow.className = 'form-row';

      const hueLabel = document.createElement('label');
      hueLabel.textContent = 'Hue:';
      hueLabel.htmlFor = 'hueInput';

      // Hue textfield
      const hueInput = document.createElement('input');
      hueInput.type = 'number';
      hueInput.id = 'hueInput'; // Set an id for the input to associate with the label
      const hueVal = getHue(selectedSquare.color); // getHue might return a number or null

      // Convert the hueValue to a string, or use an empty string if hueValue is null
      hueInput.value = hueVal !== null ? hueVal.toString() : "";

      hueInput.min = '0';
      hueInput.max = '360';
      hueInput.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement;
        const value = parseInt(target.value, 10);
        if (isNaN(value) || value < 0 || value > 360 || target.value.trim() === '') {
            target.classList.add('input-error');
        } else {
            target.classList.remove('input-error');
            
            if (squareId) {
                this.model.updatecolor(squareId, getFixedColor(value.toString()));
                square.style.backgroundColor = getFixedColor(value.toString());
            }
        }
        
      });
      squareDisplay.appendChild(square);
      
      hueRow.appendChild(hueLabel);
      hueRow.appendChild(hueInput);

      editForm.appendChild(hueRow);
            
      // Add both the display and form to the container
      this.container.appendChild(squareDisplay);
      this.container.appendChild(editForm);

        } 
      } else if (num == 0) {
        this.container.innerText = "Select One";
      } else if (num > 1) {
        this.container.innerText = "Too Many Selected";
      }
    }

  private container: HTMLDivElement;
  get root(): HTMLDivElement {
    return this.container;
  }
}
