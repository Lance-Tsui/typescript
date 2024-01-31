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
  SKKeyboardEvent,
} from "simplekit/canvas-mode"

import { Game } from "./game";

// handle events
setSKEventListener((e) => {
  switch (e.type) {
    case "keyup":
      const keyup = e as SKKeyboardEvent;
      if (keyup.key === 'x') {
        game.exitCheat();
      }
      break;
    case "mousemove":
      const mouse = e as MouseEvent;
      if (game.mode == "play") {
        game.playGame(false, mouse.x, mouse.y);
      }
      break;
    case "click":
      const click = e as MouseEvent;
      if (game.mode == "play") {
        game.playGame(true, click.x, click.y);
      }
      break;
    case "keydown":
      const keydown = e as SKKeyboardEvent;
      if (keydown.key === ' ') {
        if (game.getMode() == "start") {
          game.switchMode();
          game.toggleMode("play");
        } else if (game.getMode() == "win") {
          game.toggleMode("win");
        }
      }
      if (keydown.key === 'q') {
        game.toggleMode("start");
      }
      if (keydown.key === '+') {
        game.addPairs();
      }
      if (keydown.key === '-') {
        game.removePairs();
      }
      if (keydown.key === 'x') {
        game.enterCheat();
      }
      break;
    case "resize":
      const resize = e as SKResizeEvent;
      game.updateCanvas(resize.width, resize.height);
      break;
  }
});

startSimpleKit();

const game = new Game();





