// simple version SKContainer
// (version in SimpleKit has more features)

import { SKElement, SKElementProps, SKEvent, SKMouseEvent } from "simplekit/imperative-mode";

type SKContainerProps = SKElementProps & { fill?: string };


export class SKSquare extends SKElement {
  public checked: boolean = false;
  constructor({ fill = "", ...elementProps }: SKContainerProps = {}) {
    super(elementProps);
    this.fill = fill;
  }

  // background colour
  public state: "idle" | "hover" | "down" = "idle";
  public fill: string;


  draw(gc: CanvasRenderingContext2D) {
    gc.save();
    // set coordinate system to padding box
    gc.translate(this.x, this.y);

    // draw background colour if set
    if (this.fill) {
      gc.fillStyle = this.fill;
      gc.fillRect(0, 0, this.width, this.height);
    }

    if (this.state == "hover") {
      gc.strokeStyle = 'blue'; // 假设这是 SimpleKit 的高亮颜色
      gc.lineWidth = 2; // 悬停状态的边框更粗
      gc.strokeRect(2, 2, this.width - 4, this.height - 4);
    }

    if (this.checked) {
      gc.strokeStyle = 'darkblue';
      gc.lineWidth = 2;
      gc.strokeRect(2, 2, this.width - 4, this.height - 4); // 绘制边框，稍微偏移
    }

    gc.restore();


  }

  public toString(): string {
    return `SKSquare `;
  }
}
