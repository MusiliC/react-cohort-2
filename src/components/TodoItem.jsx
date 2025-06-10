
const TodoItem = ({todo}) => {
  return (
    <div className="bg-gray-100  my-3 p-3 rounded-lg flex justify-between items-center">
      <div>
        <h1>
        
          <span className="font-semibold mr-2"> Name:</span> {todo.name}
        </h1>
        <h1><span className="font-semibold mr-2" >Desc: </span> {todo.desc}</h1>
      </div>
      <div>{todo.isComplete && "✅"}</div>
    </div>
  );
}

export default TodoItem