import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <form>
        <label id="postcode-label">
          Postcode:
          <input name="postcode" type="text" />
        </label>
        <input type="submit" value="Check postcode" />
      </form>
    </div>
  );
}

export default App;
