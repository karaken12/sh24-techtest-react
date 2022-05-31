import React from "react";
import "./App.css";

function PostcodeForm() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <label id="postcode-label">
        Postcode:
        <input name="postcode" type="text" />
      </label>
      <input type="submit" value="Check postcode" />
    </form>
  );
}

function App() {
  return (
    <div className="App">
      <PostcodeForm />
    </div>
  );
}

export default App;
