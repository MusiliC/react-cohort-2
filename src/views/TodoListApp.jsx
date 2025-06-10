import TodoList from "../components/TodoList";


const TodoListApp = () => {


    const todos = [
      {
        id: 3,
        name: "Read Book",
        desc: "Finish chapter 5 of React guide",
        isComplete: true,
      },
      {
        id: 5,
        name: "Call Mom",
        desc: "Catch up over the weekend",
        isComplete: true,
      },
      {
        id: 1,
        name: "Doing Shopping",
        desc: "At QuickMart",
        isComplete: false,
      },

      {
        id: 4,
        name: "Write Blog Post",
        desc: "Topic: React hooks explained",
        isComplete: false,
      },
    ];
      
  return (
    <div>
        <h1 className="text-2xl text-gray-700 text-center font-bold">Todo List App</h1>

        <div className="my-5">
            {/* Add form to enter the todo list ->  form inputs -> name, desc, checkbox(isComplete) */}
            {/* Add todo form component  */}
        </div>

        <div>
            {/* div rendering our todo list items */}
            <TodoList todos ={todos}/>
        </div>
    </div>
  )
}

export default TodoListApp