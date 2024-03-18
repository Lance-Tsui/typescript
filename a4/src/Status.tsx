import "./Status.css";

import {num, numDone} from "./state";

export default function Status() {

  let leftText = ""; // Corrected variable name for consistency
  let rightText = ""; // Corrected variable name for consistency

  // Updating shape count text
  leftText = `${num} shape${num > 1 ? "s" : ""}`;

  // Updating completed shapes text. Removed 'this.model' for direct use of variable
  rightText += ` selected ${numDone}`;

  // Example condition for demonstration, adjusted to use 'num' directly
  if (num == 25) {
    leftText += " FULL";
  }

  // Return statement using corrected variable names in JSX
  return (
    <div id="status">
      <div class="status-columnleft">{leftText}</div>
      <div class="status-columnright">{rightText}</div>
    </div>
  );
}
