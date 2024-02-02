
export interface Drawable {
  isHidden(): boolean;  // is the item hidden
  setHidden(hidden: boolean): void; // set the hidden status
  setHover(hover: boolean): void; // set hover color
  isMouseOver(mouseX: number, mouseY: number): boolean; // is mouse over
  draw: (gc: CanvasRenderingContext2D) => void; // draw object
  matches(other: Drawable): boolean;  // if matches
  getType(): string;  // get type
  isclickable(): boolean; // is clickable
}
