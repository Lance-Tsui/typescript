
import "./Status.css";

export default function Status() {
  // Assuming some static values for demonstration
  const num = 10; // Example number of shapes
  const numDone = 5; // Example number of selected shapes

  let leftText = `${num} shape${num > 1 ? "s" : ""}`;
  let rightText = `selected ${numDone}`;
  
  return (
    <div id="status">
      <div class="status-columnleft">{leftText}</div>
      <div class="status-columnright">{rightText}</div>
    </div>
  );
};
