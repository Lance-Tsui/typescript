import { render } from "preact";

import Form from "./Form";
import List from "./List";
import Status from "./Status";
import Info from "./Info";

import "./main.css";

import * as State from "./state";

export default function App() {
  const id = State.selectedTodoId.value;

  return (
    <>
      <div id="left">
        <Form editId={id} />
        <List />
        <Status />
      </div>
      <Info />
    </>
  );
}

render(<App />, document.querySelector("div#app") as Element);
