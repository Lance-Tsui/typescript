import { Drawable } from "./drawable";
import { Square } from "./square";
import { CallbackTimer } from "./timer";

export class Cat implements Drawable {
  public rotationTimer?: CallbackTimer;
  public rotation: number;
  public rotating: boolean;
  public hover: boolean;
  public hidden: boolean;
  public clickable: boolean;
  public bgcolor: string;
  
  constructor(public x: number, public y: number, public color: string, public position: string) {
      this.rotation = 0;
      this.rotating = false;
      this.hover = false;
      this.hidden = false;
      this.clickable = false;
      this.bgcolor = "white";
    }

  // setting up cover color
  setHover(hover: boolean): void {
    this.hover = hover;
  }

  // setting up hidden status
  setHidden(hidden: boolean): void {
    this.hidden = hidden;
  }

  // check if hidden or not
  isHidden(): boolean {
    return this.hidden;
  }

  // checking if cards match
  matches(other: Drawable): boolean {
    if (this.getType() != other.getType()){
      return false;
    }
    const others = other as Cat;
    if (this.x == others.x && this.y == others.y){
      return false;
    }
    if (this.color == others.color) {
      return true;
    }
    return false;
  }

  // draw
  draw(gc: CanvasRenderingContext2D) {
    gc.save();
    if (!this.hidden) {


      if (this.rotating) {
        gc.translate(this.x + 40, this.y + 40);
        gc.rotate(this.rotation * Math.PI / 180);
        gc.translate(-this.x - 40, -this.y - 40);
      }

      if (!this.clickable) {
        this.bgcolor = "#d6d6d6";
      }
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

  startRotationAnimation(time: number): void {
    if (!this.rotationTimer || !this.rotationTimer.isRunning) {
        this.rotation = 0; // Reset rotation to 0 at start
        this.rotationTimer = new CallbackTimer(1000, () => {
            // Callback after timer completes
            // Reset rotation or handle as needed
            this.rotation = 0;
        });

        // Start the timer with the current time
        this.rotationTimer.start(performance.now());


    }
}

update(time: number): void {
    // Call this from your main loop with the current time
    if (this.rotationTimer && this.rotationTimer.isRunning) {
        this.rotationTimer.update(time);
        // Here you can adjust the rotation as needed
        // For a simple linear rotation over one second:
        this.rotation = ((time % 1000) / 1000) * 360;
    }
}


  // check if mouse is over the object
  isMouseOver(mouseX: number, mouseY: number): boolean {
      return mouseX >= this.x - 40 && mouseX <= this.x + 40 && mouseY >= this.y - 40 && mouseY <= this.y + 40;
  }

  // return cat type
  getType(): string {
    return "cat";
  }

  // is the element clickable
  isClickable(): boolean {
    return this.clickable;
  }

  // set clickable
  setClickable(clickable: boolean): void {
    this.clickable = clickable;
  }
  
}
