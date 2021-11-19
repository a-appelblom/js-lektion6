import React from "react";

const Button = ({ setCount }) => {
  return (
    <button
      onClick={() => {
        // count += 1;

        // useState har en setter funktion som tar antiongen ett nytt värde eller en callback som returnerar det ny statet.
        setCount((prevCount) => prevCount + 1);
      }}
    >
      Increase count
    </button>
  );
};

export default Button;
