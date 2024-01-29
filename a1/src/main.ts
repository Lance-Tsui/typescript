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
      break;
    case "mousemove":
      const mouse = e as MouseEvent;
      if (game.isPlayMode) {
        game.playGame(false, mouse.x, mouse.y);
      }
      break;
    case "click":
      const click = e as MouseEvent;
      if (game.isPlayMode) {
        game.playGame(true, click.x, click.y);
      }
      break;
    case "keydown":
      const keydown = e as SKKeyboardEvent;
      if (keydown.key === ' ') {
        game.togglePlayMode(false);
      }
      if (keydown.key === 'q') {
        game.togglePlayMode(true);
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
game.initGame();

