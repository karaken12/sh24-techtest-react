import React, { useState } from "react";
import "./App.css";

interface PostcodeFormProps {
  handleSubmit: (postcode: string) => void;
}

function PostcodeForm(props: PostcodeFormProps) {
  const [postcode, setPostcode] = useState("");

  return (
    <form
      onSubmit={(event) => {
        props.handleSubmit(postcode);
        event.preventDefault();
      }}
    >
      <label id="postcode-label">
        Postcode:
        <input
          name="postcode"
          type="text"
          value={postcode}
          onChange={(event) => {
            setPostcode(event.target.value);
          }}
        />
      </label>
      <input type="submit" value="Check postcode" />
    </form>
  );
}

function App() {
  const [postcode, setPostcode] = useState("");
  return (
    <div className="App">
      <PostcodeForm
        handleSubmit={(postcode: string) => {
          setPostcode(postcode);
        }}
      />
      <div>Postcode: {postcode}</div>
    </div>
  );
}

export default App;
