/**
 * SimpleKit Example Project
 *
 * uses a Drawable Square
 * sets event handler with "switch" dispatch
 * sets draw handler
 * starts SimpleKit
 */
import {
  SKResizeEvent,
  startSimpleKit,
  setSKDrawCallback,
  setSKEventListener,
  setSKAnimationCallback,
  addSKEventTranslator,
} from "simplekit/canvas-mode"

import { Point2, point, random } from "simplekit/utility";

// state to track canvas size
let width = 0;
let height = 0;


// handle events
setSKEventListener((e) => {
  switch (e.type) {
    case "resize":
      const re = e as SKResizeEvent;
      // update local canvas size state
      // (SimpleKit always sends resize event before first draw)
      width = re.width;
      height = re.height;

      draw(width, height);

      break;
  }
});
startSimpleKit();

import { Cat } from "./cat";

import { Star } from "./star"

import { Square } from "./square";

import { DisplayList } from "./displaylist";


function draw(width?: number, height?: number) {
  // create canvas element and add it to the DOM
  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);
  // set a background style
  canvas.style.setProperty("background", "darkgrey");
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  if(width) canvas.width = width;
  if(height) canvas.height = height;
  
  // get graphics context
  const gc = canvas.getContext("2d");
  if (!gc) return;
  const x = canvas.width / 2;
  const y = canvas.height / 4;
  gc.font = "24px sans-serif";
  gc.textAlign = "center";
  gc.textBaseline = "middle";
  gc.fillStyle = "white";
  gc.fillText("1 pair: Press SPACE to play", x, y);

  

  const displayList = new DisplayList();

  const cat1 = new Cat(100, 60, "#CEA242");
  const cat2 = new Cat(300, 60, "#CEA242");
  const star = new Star(100, 100, 50, "gold", "black", 3);
  displayList.add(cat1);
  displayList.add(cat2);
  displayList.add(star);

  displayList.add(new Square(60, 50, 50, "white", "black", 3));
  displayList.add(new Square(140, 50, 50, "white", "black", 3));
  displayList.draw(gc);
  
  }
  draw();
