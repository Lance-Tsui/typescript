import { Drawable } from "./drawable";

export class Circle implements Drawable {
    private centerX: number;
    private centerY: number;
    private maxRadius: number;
    private step: number;
    private strokeColor: string;
    private lineWidth: number;
    private fillColors: string[];
    constructor(centerX: number, centerY: number, maxRadius: number, step: number, strokeColor: string = '#000', lineWidth: number = 3, fillColors: string[] = []) {
      this.centerX = centerX;
      this.centerY = centerY;
      this.maxRadius = maxRadius;
      this.step = step;
      this.strokeColor = strokeColor;
      this.lineWidth = lineWidth;
      this.fillColors = fillColors;
    }
  
    draw(ctx: CanvasRenderingContext2D) {
        for (let radius = this.maxRadius, i = 0; radius >= this.step; radius -= this.step, i++) {
        ctx.beginPath();
        ctx.arc(this.centerX, this.centerY, radius, 0, 2 * Math.PI);
        if (i < this.fillColors.length) {
            ctx.fillStyle = this.fillColors[i];
            ctx.fill();
          }
        ctx.strokeStyle = this.strokeColor;
        ctx.lineWidth = this.lineWidth;
        ctx.stroke();
      }
    }

    isMouseOver(mouseX: number, mouseY: number): boolean {
      return true;
    }

    setHover(hover: boolean): void{}

    setHidden(hidden: boolean): void{};
  }