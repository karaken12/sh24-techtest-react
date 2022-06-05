import React, { useState } from "react";
import "./App.css";
import { isPostcodeShippable } from "./isPostcodeShippable";

interface PostcodeFormProps {
  handleSubmit: (postcode: string) => void;
}

const PostcodeForm = (props: PostcodeFormProps) => {
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
};

interface DisplayResultProps {
  postcode: string;
  shippable: boolean;
}

const DisplayResult = ({ postcode, shippable }: DisplayResultProps) => (
  <div>
    Postcode {postcode} is {shippable ? "shippable" : "not shippable"}
  </div>
);

const App = () => {
  const [postcode, setPostcode] = useState("");
  const [shippable, setShippable] = useState(false);
  const [waiting, setWaiting] = useState(false);

  return (
    <div className="App">
      <PostcodeForm
        handleSubmit={async (postcode: string) => {
          setPostcode(postcode);
          setWaiting(true);
          const isShippable = await isPostcodeShippable(postcode);
          setShippable(isShippable);
          setWaiting(false);
        }}
      />
      {waiting ? (
        <div>Please wait</div>
      ) : (
        postcode && <DisplayResult postcode={postcode} shippable={shippable} />
      )}
    </div>
  );
};

export default App;
