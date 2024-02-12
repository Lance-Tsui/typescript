
var isShiftKeyDown = false;

export function setShiftKeyDown(state: boolean) {
  isShiftKeyDown = state;
}

export function getShiftKeyDown(): boolean {
  return isShiftKeyDown;
}