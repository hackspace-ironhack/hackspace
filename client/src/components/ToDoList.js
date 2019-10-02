import React from "react";
import { Link } from "react-router-dom";

const ToDoList = props => {
  return (
    <div>
      {props.todos.length > 0 && <h2>Tasks:</h2>}
      {props.todos.map(todo => {
        return (
          <div key={todo._id}>
            <Link to={`/tasks/${todo._id}`}>
              <h3>{todo.title}</h3>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default ToDoList;
