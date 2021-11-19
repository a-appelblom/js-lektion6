import React from "react";

const Todocard = ({ todo, handleChecked, handleDelete }) => {
  return (
    <div
      key={todo.id}
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        padding: "1rem",
      }}
    >
      <div
        onClick={(e) => handleChecked(e, todo)}
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          padding: "1rem",
          borderBottom: "1px solid black",
        }}
      >
        <span>{todo.text}</span>
        <input type="checkbox" checked={todo.completed} readOnly />
      </div>
      <button onClick={() => handleDelete(todo)}>X</button>
    </div>
  );
};

export default Todocard;
