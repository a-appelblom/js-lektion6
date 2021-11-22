import { useState } from "react";
import "./App.css";
import Button from "./Button";
import Printcount from "./PrintCount";
import Todo from "./Todo";
import Yatzy from "./yatzy/Yatzy";

function App() {
  const [demo, setDemo] = useState(false);

  const [count, setCount] = useState(0); // useState hook. En reaktiv variabel i react.
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log(text);
    setText("");
  }

  return (
    <div className="App">
      <button onClick={() => setDemo(!demo)}>Toggle Todo or Yatzy</button>
      {/* <h1>Hello</h1> */}
      {/* <p style={{ fontSize: "4rem", fontWeight: "bolder" }}>{count[0]}</p> */}
      {/* <Printcount count={count} />
      <Button setCount={setCount} />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          placeholder="Type here"
          onChange={(e) => setText(e.target.value)}
        />
      </form>
      <p>{text}</p> */}
      {/* 
      <button
        onClick={() => {
          // count += 1;

          // useState har en setter funktion som tar antiongen ett nytt värde eller en callback som returnerar det ny statet.
          setCount((prevCount) => prevCount + 1);
          console.log(count);
        }}
      >
        Increase count
      </button> */}
      {demo ? <Todo /> : <Yatzy />}
    </div>
  );
}

export default App;
