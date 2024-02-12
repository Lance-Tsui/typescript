import {
  startSimpleKit,
  setSKRoot,
  SKContainer,
  Layout,
  Settings,
  SKEvent,
  setSKEventListener,
  SKResizeEvent,
} from "simplekit/imperative-mode";

// local imports
import { Model } from "./model";
import { FormView } from "./formView";
import { ListView } from "./listView";
import { TodoView } from "./todoView";
import { makeStackColLayout } from "./stackCol";
import { InfoView } from "./infoView";
import { StatusView } from "./statusView";
import { SKCheckbox } from "./checkbox";

import { eventBus } from "./eventbus";


setSKEventListener((e: SKEvent) => {
  if (e.type === 'resize') {
    const {width: width, height: height} = e as SKResizeEvent;

    eventBus.emit('resize', { width, height });
  }
});



// data
const model = new Model();

// user interface

// root container
const root = new SKContainer();
root.id = "root";
root.layoutMethod = Layout.makeFillRowLayout();

const left = new SKContainer();
left.fillWidth = 1;
left.layoutMethod = makeStackColLayout();

// add views to left (will be stacked vertically)
left.addChild(new FormView(model));
left.addChild(new ListView(model));
left.addChild(new StatusView(model));

// add views to root (will be left and right areas)
root.addChild(left);
root.addChild(new InfoView(model));

// const checkbox = new SKCheckbox();
// checkbox.margin = 10;
// root.addChild(checkbox);

setSKRoot(root);

startSimpleKit();

// Settings.debug = true;
