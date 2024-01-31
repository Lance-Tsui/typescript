import { Drawable } from "./drawable";

export class DisplayList {
  list: Drawable[] = [];

  add(drawable: Drawable) {
    this.list = [...this.list, drawable];
  }

  remove(item: Drawable) {
    const index = this.list.findIndex(x => x === item);
    if (index !== -1) {
        this.list.splice(index, 1);
      }
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

  every(callback: (drawable: Drawable, index?: number, array?: Drawable[]) => boolean): boolean {
    return this.list.every(callback);
  }
}
