import { Drawable } from "./drawable";

export class Star implements Drawable {
  constructor(private x: number, private y: number, private outerRadius: number, private innerRadius: number, private points: number, private fillColor: string, private strokeColor: string, private linewidth: number) {}

  draw(ctx: CanvasRenderingContext2D): void {
      const step = Math.PI / this.points;

      let startAngle = Math.PI / 2;
      let angleOffset = Math.PI / this.points;

      ctx.beginPath();
      for (let i = 0; i < this.points; i++) {
          ctx.lineTo(
              this.x + this.outerRadius * Math.cos(startAngle - angleOffset + step * i * 2),
              this.y + this.outerRadius * Math.sin(startAngle - angleOffset + step * i * 2)
          );
          ctx.lineTo(
              this.x + this.innerRadius * Math.cos(startAngle - angleOffset + step * (i * 2 + 1)),
              this.y + this.innerRadius * Math.sin(startAngle - angleOffset + step * (i * 2 + 1))
          );
      }
      ctx.closePath();

      ctx.fillStyle = this.fillColor;
      ctx.fill();
      ctx.strokeStyle = this.strokeColor;
      ctx.lineWidth = this.linewidth;
      ctx.stroke();
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