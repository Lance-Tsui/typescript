import { Drawable } from "./drawable";

export class Square implements Drawable {
    constructor(
      public x: number,
      public y: number,
      public size: number,
      public fill?: string, // optional parameters
      public stroke?: string,
      public lineWidth?: number,
      public innerSquareColor?: string
    ) {}
  
    draw(gc: CanvasRenderingContext2D) {
      gc.beginPath();
      if (this.fill) gc.fillStyle = this.fill;
      if (this.stroke) gc.strokeStyle = this.stroke;
      if (this.lineWidth) gc.lineWidth = this.lineWidth;
      gc.rect(
        this.x - this.size / 2,
        this.y - this.size / 2,
        this.size,
        this.size
      );
      if (this.fill) gc.fill();
      if (this.lineWidth) gc.stroke();

      if (this.innerSquareColor) {
        gc.beginPath();
        gc.fillStyle = this.innerSquareColor;

        let innerSquareSize = 70;
        gc.rect(
          this.x - innerSquareSize / 2,
          this.y - innerSquareSize / 2,
          innerSquareSize,
          innerSquareSize
        );
        gc.fill();
      }
    }
  }