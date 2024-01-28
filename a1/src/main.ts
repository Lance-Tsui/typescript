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
    case "keydown":
      const keydown = e as SKKeyboardEvent;
      if (keydown.key === ' ') {
        game.togglePlayMode();
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

