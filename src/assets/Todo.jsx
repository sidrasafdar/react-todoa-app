import "./todo.css";
import React from 'react';
import { useState } from 'react';


let nextId = 0;
function Todo() {

    const [input, setInput] = useState(""); 
    const [items, setItems] = useState([]); 
    const [showCompleted, setShowCompleted] = useState(false);


    function handleText(e) {
  setInput(e.target.value);
}

function handleAdd() {
  if (input.trim() === "") return;

  setItems([
    ...items,
    {
      id: nextId++,
      text: input,
      completed: false
    }
  ]);
  setInput("");

}

function handleDelete(id) {
  setItems(items.filter(item => item.id !== id));
}


function handleComplete(id) {
  setItems(
    items.map(item =>
      item.id === id
        ? { ...item, completed: !item.completed }
        : item
    )
  );
}

function showAllTasks() {
  setShowCompleted(false);
}


function showCompletedTasks() {
  setShowCompleted(true);
}


const filteredItems = items.filter(item => item.completed);


  return (
  <div className="todo-container">
    <h1>To-Do App</h1>

    <div className="input-section">
      <input
        type="text"
        placeholder="Enter Task"
        value={input}
        onChange={handleText}
      />

      <button onClick={handleAdd}>
        Add Task
      </button>
    </div>

    <div className="filter-buttons">
      <button onClick={showAllTasks}>
        Show All Tasks
      </button>

      <button onClick={showCompletedTasks}>
        Show Completed Tasks
      </button>
    </div>

    <ul className="task-list">
      {(showCompleted ? filteredItems : items).map((item) => (
        <li
          key={item.id}
          className={item.completed ? "completed" : ""}
        >
          <span>{item.text}</span>

          <div className="task-buttons">
            <button
              className="complete-btn"
              onClick={() => handleComplete(item.id)}
            >
              {item.completed ? "Undo" : "Complete"}
            </button>

            <button
              className="delete-btn"
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);
}

export default Todo;
