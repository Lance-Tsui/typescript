import { Drawable } from "./drawable";
import { Square } from "./square";
import { CallbackTimer } from "./timer";

export class Star implements Drawable {
  public rotation: number;
  public rotating: boolean;
  public hover: boolean;
  public hidden: boolean;
  public clickable: boolean;
  public bgcolor: string;

  constructor(public x: number, public y: number, public outerRadius: number, public innerRadius: number,
     public points: number, public fillColor: string, public strokeColor: string, public linewidth: number) {
      this.rotation = 0;
      this.rotating = false;
      this.hover = false;
      this.hidden = false;
      this.clickable = false;
      this.bgcolor = "white";
     }

  // draw
  draw(gc: CanvasRenderingContext2D): void {
      const step = Math.PI / this.points;

      let startAngle = Math.PI / 2;
      
      let angleOffset = Math.PI / this.points;

      if (this.points % 2 == 0) {
        angleOffset = Math.PI / 2;
      }

      gc.save();

      if (!this.clickable) {
        this.bgcolor = "#d6d6d6";
      }
      if (!this.hidden) {
        const backgroundSquare = new Square(this.x, this.y, 80, this.bgcolor, "black", 4);
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

  // setting up cover color
  setHover(hover: boolean): void{
    this.hover = hover;
  }

  setHidden(hidden: boolean): void{
    this.hidden = hidden;
  };

  isHidden(): boolean {
    return this.hidden;
  }

  // checking if cards match
  matches(other: Drawable): boolean {
    if (this.getType() != other.getType()){
      return false;
    }
    const others = other as Star;
    if (this.x == others.x && this.y == others.y){
      return false;
    }
    if (this.points == others.points) {
      return true;
    }
    return false;
  }

  // return star type
  getType(): string {
    return "star";
  }

  // is the element clickable
  isClickable(): boolean {
    return this.clickable;
  }

  // set clickable
  setClickable(clickable: boolean): void {
    this.clickable = clickable;
  }

  startRotationAnimation(time: number): void {
      
  }
}