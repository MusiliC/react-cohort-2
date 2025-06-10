import Navbar from "./navbar/Navbar";
import TodoListApp from "./views/TodoListApp";

// Todo -> Refactor App
// Todo -> components folder -> TodoItem, TodoList
// Todo -> container/views -> TodoApp.js
// Todo -> TodoList -> contains a map iterating todoItem
// Todo -> todoItem -> completed -> different styling
// TodoApp ->   const [filter, setFilter] = useState('all'); // <- NEW
// const filteredTodos = todos.filter((todo) => {
//   if (filter === "active") return !todo.completed;
//   if (filter === "completed") return todo.completed;
//   return true;
// });
{
  /* <div className="filter-group">
<button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>All</button>
<button onClick={() => setFilter('active')} className={filter === 'active' ? 'active' : ''}>Active</button>
<button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active' : ''}>Completed</button>
</div>

<TodoList
todos={filteredTodos}
onToggle={handleToggle}
onDelete={handleDelete}
/> */
}

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="w-1/2 mx-auto my-10">
        <TodoListApp />
      </div>
    </div>
  );
};

export default App;
