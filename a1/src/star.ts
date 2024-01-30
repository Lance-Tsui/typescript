import { Drawable } from "./drawable";
import { Square } from "./square";

export class Star implements Drawable {
  constructor(public x: number, public y: number, public outerRadius: number, public innerRadius: number,
     public points: number, public fillColor: string, public strokeColor: string, public linewidth: number, 
     public hidden: boolean, public hover: boolean) {}

  draw(gc: CanvasRenderingContext2D): void {
      const step = Math.PI / this.points;

      let startAngle = Math.PI / 2;
      let angleOffset = Math.PI / this.points;

      gc.save();
      if (!this.hidden) {
        const backgroundSquare = new Square(this.x, this.y, 80, "white", "black", 4);
        backgroundSquare.draw(gc);
      gc.beginPath();
      for (let i = 0; i < this.points; i++) {
          gc.lineTo(
              this.x + this.outerRadius * Math.cos(startAngle - angleOffset + step * i * 2),
              this.y + this.outerRadius * Math.sin(startAngle - angleOffset + step * i * 2)
          );
          gc.lineTo(
              this.x + this.innerRadius * Math.cos(startAngle - angleOffset + step * (i * 2 + 1)),
              this.y + this.innerRadius * Math.sin(startAngle - angleOffset + step * (i * 2 + 1))
          );
      }
      gc.closePath();

      gc.fillStyle = this.fillColor;
      gc.fill();
      gc.strokeStyle = this.strokeColor;
      gc.lineWidth = this.linewidth;
      gc.stroke();
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
}