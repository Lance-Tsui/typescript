import { Drawable } from "./drawable";
import { Square } from "./square";

export class Cat implements Drawable {
  constructor(public x: number, public y: number, public color: string, public scale = 1.0) {}

  draw(gc: CanvasRenderingContext2D) {

    gc.save();

    const backgroundSquare = new Square(this.x, this.y, 80, "white", "black", 3);
    backgroundSquare.draw(gc);

    gc.translate(this.x, this.y + 5);
    gc.scale(this.scale, this.scale);

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
    gc.fillStyle = "black";
    gc.beginPath();

    gc.arc(-12, -6.75, 3.75, 0, Math.PI * 2);
    gc.fill();

    gc.beginPath();
    gc.arc(12, -6.75, 3.75, 0, Math.PI * 2);
    gc.fill();

    gc.restore();

  }
}
