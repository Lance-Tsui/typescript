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



// handle events
setSKEventListener((e) => {
  switch (e.type) {
    case "keyup":
      break;
    case "keydown":
      break;
    case "resize":
      const re = e as SKResizeEvent;

      draw(re.width, re.height);

      break;
  }
});
startSimpleKit();

import { Cat } from "./cat";

import { Star } from "./star"

import { Circle } from "./circle"

import { Square } from "./square";

import { DisplayList } from "./displaylist";

import { Message } from "./message";

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
  const message = new Message(1);
  gc.fillText(message.getMessage(), x, y);

  const displayList = new DisplayList();


  const cat1 = new Cat(x - 50 , y * 2, "#CEA242");
  const cat2 = new Cat(x + 50, y * 2, "#CEA242");
  const star = new Star(100, 100, 50, 20, 6, "gold", "black", 3);

  
  displayList.add(cat1);
  displayList.add(cat2);
  // displayList.add(star);

  const fillColors = ['#FFDDC1', '#FFABAB', '#FFC3A0', '#FFD1BA', '#E7FFAC'];
  const circle = new Circle(x, y * 2, 48, 12, 'black', 3, fillColors);
  // displayList.add(circle);

  // displayList.add(new Square(60, 50, 80, "white", "black", 3));
  // displayList.add(new Square(190, 50, 80, "white", "black", 3));
  displayList.draw(gc);
  
  }
  draw();
