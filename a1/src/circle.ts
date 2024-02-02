import { Drawable } from "./drawable";
import { Square } from "./square";
import { CallbackTimer } from "./timer";

export class Circle implements Drawable {

    public rotation: number;
    public rotating: boolean;
    public hover: boolean;
    public hidden: boolean;
    public clickable: boolean;
    public bgcolor: string;

    constructor(public x: number, public y: number, public maxRadius: number, public step: number, 
      public strokeColor: string = '#000', public lineWidth: number = 3, public fillColors: string[] = []) {
        this.rotation = 0;
        this.rotating = false;
        this.hover = false;
        this.hidden = false;
        this.clickable = false;
        this.bgcolor = "white";
    }
  
    draw(gc: CanvasRenderingContext2D) {
      gc.save();

      if (!this.clickable) {
        this.bgcolor = "#d6d6d6";
      }
      if (!this.hidden) {
        const backgroundSquare = new Square(this.x, this.y, 80, this.bgcolor, "black", 4);
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

    // check if mouse is over the object
    isMouseOver(mouseX: number, mouseY: number): boolean {
      return mouseX >= this.x - 40 && mouseX <= this.x + 40 && mouseY >= this.y - 40 && mouseY <= this.y + 40;
    }

    // setting up cover color
    setHover(hover: boolean): void{
      this.hover = hover;
    }

    // setting up hidden status
    setHidden(hidden: boolean): void{
      this.hidden = hidden;
    };

    // check if hidden or not
    isHidden(): boolean {
      return this.hidden;
    }

    // checking if cards match
    matches(other: Drawable): boolean {
      if (this.getType() != other.getType()){
        return false;
      }
      const others = other as Circle;
      if (this.x == others.x && this.y == others.y){
        return false;
      }
      if (this.fillColors == others.fillColors) {
        return true;
      }
      return false;
    }

    // return cat type
    getType(): string {
      return "circle";
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