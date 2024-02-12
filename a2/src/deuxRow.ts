import {
    SKElement,
    LayoutMethod,
    Size,
  } from "simplekit/imperative-mode";
  
  // Enhanced factory function with "gap" parameter for spacing between elements
  export function makeDeuxRowLayout(gap = 0): LayoutMethod {
    return (boundsWidth: number, boundsHeight: number, elements: SKElement[]) => {
      return deuxRowLayout(boundsWidth, boundsHeight, elements);
    };
  }
  
  // Layout function for arranging elements in two rows
  export function deuxRowLayout(
    boundsWidth: number,
    boundsHeight: number,
    elements: SKElement[]
  ): Size {
    const newBounds: Size = { width: 0, height: 0 };
    let y = boundsHeight / 3;
  
    // Assuming the first element is for the first row
    elements = elements.slice(0, 3);
    if (elements.length > 0) {
      
      const firstElement = elements[0];
      firstElement.x = boundsWidth / 2;
      firstElement.y = y;
      if (firstElement.fillWidth) {
        firstElement.widthLayout = boundsWidth;
      }
      y += firstElement.heightLayout + 50; // Add gap after the first row
  
      newBounds.width = Math.max(newBounds.width, firstElement.widthLayout);
      newBounds.height = y;
    }
  
    // Elements for the second row (assuming remaining elements go here)
    let x = boundsWidth / 2;
    for (let i = 1; i < elements.length; i++) {
      const el = elements[i];
      el.x = x;
      el.y = y;
  
      if (el.fillWidth && elements.length - 1 > 1) {
        // If more than one element in the second row, adjust widths accordingly
        el.widthLayout = (boundsWidth - 25 * (elements.length - 2)) / (elements.length - 1);
        x += el.widthLayout + 25; // Add gap between elements
      } else {
        // If only one element or fillWidth is not set, use its layout width
        x += el.widthLayout + 25;
      }
  
      newBounds.width = Math.max(newBounds.width, x);
    }
  
    // Update the height of the layout based on the second row's elements
    if (elements.length > 1) {
      const secondRowHeight = elements[1].heightLayout; // Assuming same height for all elements in the second row
      newBounds.height += secondRowHeight;
    }
  
    return newBounds;
  }
  