import { useState } from "react";
import Todocard from "./TodoCard";

// const initialTodos = [{ id: 0, text: "Create initial todo", completed: false }];

const saveToStorage = (val, key) => {
  window.localStorage.setItem(key, JSON.stringify(val));
  console.log(JSON.parse(window.localStorage.getItem("todos")));
};

const Todo = () => {
  // State för att spara våra todos. Vi lägger dem i en array så att vi kan lägga till hur många vi vill.
  const [todos, setTodos] = useState(() => {
    const todos = JSON.parse(window.localStorage.getItem("todos"));
    if (!todos) {
      return [];
    }
    return todos;
  });

  // Kontrollerar vårat input fålt så att vi har direktåtkomst till värdet i våran submitfunktion senare i koden.
  const [todoInput, setTodoInput] = useState("");

  // Bara en int som ökas för varje todo för att ge dem ett unikt ID.
  const [ids, setIds] = useState(() => {
    let ids = JSON.parse(window.localStorage.getItem("ids"));
    if (!ids) {
      ids = 0;
    }
    console.log(ids);
    return ids;
  });

  // Submit eventet i ett fomulär sker automatisk när man trycker enter i ett inputfält i fomruläret.
  const handleSubmit = (e) => {
    // Vi måste ghindra sidan från att laddas om. Inte minst för att bevara vårat state.
    e.preventDefault();

    console.log(todoInput);
    setIds((prev) => {
      const newIds = prev + 1;
      saveToStorage(newIds, "ids");
      setTodos((prev) => {
        const newTodos = [
          ...prev,
          { id: newIds, text: todoInput, completed: false },
        ];

        saveToStorage(newTodos, "todos");
        return newTodos;
      });
      return newIds;
    }); // Ökar id med 1 efter vi skapat den nya todon så att vi har ett unikt id till nästa

    // Näsr vi skapat en ny todo så vill vi lägga till den i våran array.

    setTodoInput(""); // Nollställer input-fältet
  };

  // Våran funktionen för att ändra status på våran Todo
  const handleChecked = (e, todo) => {
    // Vi måste skicka med våran todo i argumenten för att ha något att jämföra med.
    setTodos((prevTodos) => {
      const newTodos = prevTodos.map((item) => {
        // Vi returnerar en ny array som innehåller sammma element
        if (todo.id === item.id) {
          // Men här kontrollerar vi om elementet är det som vi vill ändra
          item = { ...item, completed: !item.completed }; // Är det det sp skapar vi ett nytt objekt som tar allt från det gamla förutom completed, som vi sätter till motsatsen.
        }
        return item;
      });

      saveToStorage(newTodos, "todos");
      return newTodos;
    });
  };

  // Funktion för att ta bort Todos ur våran array
  const handleDelete = (todo) => {
    let confirm = true; // En variabel för att spara user input i nästa steg
    if (!todo.completed) {
      // Kolla om Todon är completed
      confirm = window.confirm(
        // Är den inte det så frågar vi om den verkligen ska tas bort. Returnerar en boolean
        "Are you sure, this todo has not yet been completed"
      );
    }
    if (confirm) {
      // kollar om vi har fått bekräftelse
      setTodos((prev) => {
        const newTodos = prev.filter((item) => todo.id !== item.id); // Filtrerar ut alla element som inte passar mitt kondition. I detta fall så endast det som passat min todo.
        saveToStorage(newTodos, "todos");
        return newTodos;
      });
    }
  };

  return (
    <div>
      <h1>Todo</h1>
      {todos && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "400px",
            margin: "2rem auto",
          }}
        >
          {todos.map((todo) => (
            <Todocard
              key={todo.id}
              todo={todo}
              handleChecked={handleChecked}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add new todo..."
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
        />
      </form>
    </div>
  );
};

export default Todo;
