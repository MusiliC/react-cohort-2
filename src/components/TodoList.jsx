import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ myTodos, handleDeleteTodo, handleUpdate }) => {
  return (
    <div>
      {myTodos.map((todo) => (
        <div
          key={todo.id}
          className="bg-gray-100  my-3 p-3 rounded-lg flex justify-between items-center"
        >
          <div>
            <h1>
              <span className="font-semibold mr-2"> Name:</span> {todo.todoName}
            </h1>
            <h1>
              <span className="font-semibold mr-2">Desc: </span> {todo.desc}
            </h1>
            <div>{todo.completed && "✅"}</div>
          </div>
          <div className="flex gap-2 items-center">
            <button className="p-2 bg-blue-600 rounded-md text-white" onClick={() => handleUpdate(todo.id)}>
              Update
            </button>
            <button
              className="p-2 bg-red-600 rounded-md text-white hover:cursor-pointer"
              onClick={() => handleDeleteTodo(todo.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
