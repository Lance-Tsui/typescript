import {
  startSimpleKit,
  setSKDrawCallback,
  SKButton,
} from "simplekit/imperative-mode";

setSKDrawCallback((gc) => {
  gc.clearRect(0, 0, gc.canvas.width, gc.canvas.height);
});

startSimpleKit();
