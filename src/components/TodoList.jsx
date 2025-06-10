import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({todos}) => {

  // todos -> a list of 4 items 
  // todos -> when you map -> it will iterate through each item -> and render the output <4 times> in line 12 we are mapping todos accepted by props
  // todos -> ignore line 16 -> will understand later

  // ! Map Method in JS
  //? Given an array of list, the map method iterates through each item in the array
  return (
    <div>
      {todos.map((todo) => (
        // <p key={todo.id}> {todo.name}</p>
        // <TodoItem key={todo.id} todo = {todo} />
        <div key={todo.id} className="bg-gray-100  my-3 p-3 rounded-lg flex justify-between items-center">
          <div>
            <h1>
              <span className="font-semibold mr-2"> Name:</span> {todo.name}
            </h1>
            <h1>
              <span className="font-semibold mr-2">Desc: </span> {todo.desc}
            </h1>
          </div>
          <div>{todo.isComplete && "✅"}</div>
        </div>
       
      ))}
    </div>
  );
};

export default TodoList;
