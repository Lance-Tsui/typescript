import { Drawable } from "./drawable";

export class Circle implements Drawable {

    constructor(public centerX: number, public centerY: number, public maxRadius: number, public step: number, 
      public strokeColor: string = '#000', public lineWidth: number = 3, public fillColors: string[] = [],
      public hidden: boolean, public hover: boolean) {
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

    isHidden(): boolean {
      return true;
    }
  }