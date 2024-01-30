import { Drawable } from "./drawable";

export class DisplayList {
  list: Drawable[] = [];

  add(drawable: Drawable) {
    this.list = [...this.list, drawable];
  }

  remove(drawable: Drawable) {
    this.list = this.list.filter((d) => d !== drawable);
  }

  draw(gc: CanvasRenderingContext2D) {
    this.list.forEach((d) => {
      d.draw(gc);
    });
  }

  forEach(callback: (drawable: Drawable, index: number, array: Drawable[]) => void) {
    this.list.forEach(callback);
  }

  clear() {
    this.list = [];
  }

  map<T>(callback: (item: Drawable, index: number, array: Drawable[]) => T): T[] {
      const result: T[] = [];
      for (let i = 0; i < this.list.length; i++) {
          result.push(callback(this.list[i], i, this.list));
      }
      return result;
  }

}
