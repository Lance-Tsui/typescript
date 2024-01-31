
export interface Drawable {
  isHidden(): boolean;
  setHidden(hidden: boolean): void;
  setHover(hover: boolean): void;
  isMouseOver(mouseX: number, mouseY: number): boolean;
  draw: (gc: CanvasRenderingContext2D) => void;
  matches(other: Drawable): boolean;
  getType(): string;
  isclickable(): boolean;
}
