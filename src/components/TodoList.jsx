import React from 'react'

const TodoList = (props) => {
    console.log(props);
    console.log(props.newTodo);
    
    
  return (
    <div>
      <p>Rendering my todoList</p>
      <p>Clean Code</p>
      <p>Close Sprint</p>
      <p>{props.newTodo}</p>
    </div>
  );
}

export default TodoList