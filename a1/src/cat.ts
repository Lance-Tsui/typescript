import { Drawable } from "./drawable";
import { Square } from "./square";

export class Cat implements Drawable {
  constructor(public x: number, public y: number, public color: string, public position: string, 
    public hidden: boolean, public hover: boolean, public bgcolor?: string) {
      this.bgcolor = bgcolor || "white";
    }

  setHover(hover: boolean): void {
    this.hover = hover;
  }

  setHidden(hidden: boolean): void {
    this.hidden = hidden;
  }

  isHidden(): boolean {
    return this.hidden;
  }

  matches(other: Drawable): boolean {
    return typeof(this) == typeof(other);
  }

  draw(gc: CanvasRenderingContext2D) {
    gc.save();
    if (!this.hidden) {

      const backgroundSquare = new Square(this.x, this.y, 80, this.bgcolor, "black", 4);
      backgroundSquare.draw(gc);

      gc.translate(this.x, this.y + 5);

      gc.fillStyle = this.color;

      gc.beginPath();
      gc.arc(0, 0, 30, 0, 2 * Math.PI);
      gc.stroke();

      gc.beginPath();
      gc.moveTo(-30, -36);
      gc.lineTo(-6, -27);
      gc.lineTo(-26.25, -10.5);
      gc.closePath();

      gc.moveTo(30, -36);
      gc.lineTo(6, -27);
      gc.lineTo(26.25, -10.5);
      gc.closePath();
      gc.stroke();
      gc.fill();

      gc.beginPath();
      gc.arc(0, 0, 30, 0, 2 * Math.PI);
      gc.fill();

      gc.strokeStyle = "black";
      gc.fillStyle = "white";
      gc.lineWidth = 1;
      gc.beginPath();

      gc.ellipse(-12, -6.75, 6, 10.5, 0, 0, Math.PI * 2);
      gc.fill();
      gc.stroke();

      gc.beginPath();
      gc.ellipse(12, -6.75, 6, 10.5, 0, 0, Math.PI * 2);
      gc.fill();
      gc.stroke();

      // eyebow
      let eyeoffset = 0

      if (this.position == "gauche") {
        eyeoffset = -3;
      } else if (this.position == "droite") {
        eyeoffset = 3;
      }

      gc.fillStyle = "black";
      gc.beginPath();
      gc.arc(-12 + eyeoffset, -6.75, 3.75, 0, Math.PI * 2);
      gc.fill();

      gc.beginPath();
      gc.arc(12 + eyeoffset, -6.75, 3.75, 0, Math.PI * 2);
      gc.fill();

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

  getType(): string {
    return "cat";
  }
  
}
