import { Drawable } from "./drawable";
import { Square } from "./square";

export class Circle implements Drawable {

    constructor(public x: number, public y: number, public maxRadius: number, public step: number, 
      public strokeColor: string = '#000', public lineWidth: number = 3, public fillColors: string[] = [],
      public hidden: boolean, public hover: boolean) {
    }
  
    draw(gc: CanvasRenderingContext2D) {
      gc.save();
      if (!this.hidden) {
        const backgroundSquare = new Square(this.x, this.y, 80, "white", "black", 4);
        backgroundSquare.draw(gc);

          for (let radius = this.maxRadius, i = 0; radius >= this.step; radius -= this.step, i++) {
          gc.beginPath();
          gc.arc(this.x, this.y, radius, 0, 2 * Math.PI);
          if (i < this.fillColors.length) {
              gc.fillStyle = this.fillColors[i];
              gc.fill();
            }
          gc.strokeStyle = this.strokeColor;
          gc.lineWidth = this.lineWidth;
          gc.stroke();
        }
      } 
      else {

        const backgroundSquare = new Square(this.x, this.y, 80, "white", "black", 4, "lightblue");
        backgroundSquare.draw(gc);
        if (this.hover) {
            gc.strokeStyle = 'yellow';
            gc.lineWidth = 2;
            gc.strokeRect(this.x - 42, this.y - 42, 83, 83);
        } else {
            gc.strokeStyle = 'black';
            gc.lineWidth = 2;
            gc.strokeRect(this.x - 42, this.y - 42, 83, 83);
        }
      }
      gc.restore();
    }

    isMouseOver(mouseX: number, mouseY: number): boolean {
      return mouseX >= this.x - 40 && mouseX <= this.x + 40 && mouseY >= this.y - 40 && mouseY <= this.y + 40;
    }

    setHover(hover: boolean): void{
      this.hover = hover;
    }

    setHidden(hidden: boolean): void{
      this.hidden = hidden;
    };

    isHidden(): boolean {
      return this.hidden;
    }

    matches(other: Drawable): boolean {
      return true;
    }

    getType(): string {
      return "circle";
    }
  }