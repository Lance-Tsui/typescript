import { Drawable } from "./drawable";

export class Star implements Drawable {
    constructor(private x: number, private y: number, private radius: number, private fillColor: string, private strokeColor: string,
        private linewidth: number) {}
  
    draw(ctx: CanvasRenderingContext2D): void {
      ctx.beginPath();
  
      for (let i = 0; i < 5; i++) {
        ctx.lineTo(
          this.x + this.radius * Math.cos((18 + i * 72) * Math.PI / 180),
          this.y - this.radius * Math.sin((18 + i * 72) * Math.PI / 180)
        );
        ctx.lineTo(
          this.x + this.radius * Math.cos((54 + i * 72) * Math.PI / 180) * 0.5,
          this.y - this.radius * Math.sin((54 + i * 72) * Math.PI / 180) * 0.5
        );
      }
  
      ctx.closePath();
      ctx.fillStyle = this.fillColor;
      ctx.fill();

      ctx.strokeStyle = this.strokeColor;
      ctx.lineWidth = this.linewidth;
      ctx.stroke();
    }
}