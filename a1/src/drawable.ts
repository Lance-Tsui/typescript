
export interface Drawable {
  setHover(hover: boolean): void;
  isMouseOver(mouseX: number, mouseY: number): boolean;
  draw: (gc: CanvasRenderingContext2D) => void;
}
