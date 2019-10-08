import React from "react";
import { Link } from "react-router-dom";

const ToDoList = props => {
  return (
    <div>
       {props.todos.map(todo => {
        return (
          <div key={todo._id}>
            <Link to={`/todo/${todo._id}`}>
              <h3>{todo.title}</h3>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default ToDoList;
