// simple version SKContainer
// (version in SimpleKit has more features)

import { SKElement, SKElementProps } from "simplekit/imperative-mode";

type SKContainerProps = SKElementProps & { fill?: string };

export class SKSquare extends SKElement {
  checked: boolean | undefined;
  constructor({ fill = "", ...elementProps }: SKContainerProps = {}) {
    super(elementProps);
    this.fill = fill;
  }

  // background colour
  fill: string;

  draw(gc: CanvasRenderingContext2D) {
    gc.save();
    // set coordinate system to padding box
    gc.translate(this.x, this.y);

    // draw background colour if set
    if (this.fill) {
      gc.fillStyle = this.fill;
      gc.fillRect(0, 0, this.width, this.height);
    }

    gc.restore();
  }

  public toString(): string {
    return `SKSquare `;
  }
}
