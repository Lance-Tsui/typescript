import { Model } from "./model";
import { FormView } from "./formView";
import { ListView } from "./listView";
import { InfoView } from "./infoView";
import { StatusView } from "./statusView";

import "./main.css";

console.log("todo");

const model = new Model();

// root container (the div already in index.html)
const root = document.querySelector("div#app") as HTMLDivElement;

// create div to hold left-side views
const left = document.createElement("div");
left.id = "left";

// add views to left (will be stacked vertically)
left.appendChild(new FormView(model).root);
left.appendChild(new ListView(model).root);
left.appendChild(new StatusView(model).root);

// add views to root (will be left and right areas)
root.appendChild(left);
root.appendChild(new InfoView(model).root);
