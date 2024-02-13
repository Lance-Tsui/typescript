import {
  SKElement,
  LayoutMethod,
  Size,
} from "simplekit/imperative-mode";

export function makeRowLayoutWithJustifyContent(): LayoutMethod {
  return (
    boundsWidth: number,
    boundsHeight: number,
    elements: SKElement[]
  ) => {
    return rowLayoutWithJustifyContent(boundsWidth, boundsHeight, elements);
  };
}

export function rowLayoutWithJustifyContent(
  boundsWidth: number,
  boundsHeight: number,
  elements: SKElement[]
): Size {
  if (elements.length < 2) return { width: boundsWidth, height: boundsHeight };

  // first element left
  elements[0].x = 75;
  elements[0].y = (boundsHeight - elements[0].heightLayout) / 2;

  // second row right
  const lastIndex = elements.length - 1;
  elements[lastIndex].x = boundsWidth - elements[lastIndex].widthLayout - 75;
  elements[lastIndex].y = (boundsHeight - elements[lastIndex].heightLayout) / 2;

  // fixed height
  elements.forEach(el => {
    el.heightLayout = 50;
  });

  return { width: boundsWidth, height: boundsHeight };
}
