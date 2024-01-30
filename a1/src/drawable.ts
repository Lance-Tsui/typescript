
export interface Drawable {
  isHidden(): unknown;
  setHidden(hidden: boolean): void;
  setHover(hover: boolean): void;
  isMouseOver(mouseX: number, mouseY: number): boolean;
  draw: (gc: CanvasRenderingContext2D) => void;
}
