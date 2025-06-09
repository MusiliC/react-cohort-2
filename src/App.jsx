// Expressions and variables
// {{}} -> Are used to enter in javascript 'world'
// jsx -> rendering htm inside javascript
// rafce -> 
// comments
// first component
// conditional rendering


import TodoList from "./components/TodoList";
import Navbar from "./navbar/Navbar";

// styling
//! external
// internal
// inline

const App = () => {

  const applicationName = "Todo List App"

  const prop2 = "Prop 2"

  const todo3 = "Reading novel"

  const isComplete = false;

  return (
    <div>
      <Navbar appTitle={applicationName} nameY={prop2} />
      <TodoList newTodo={todo3} newTodo2="Going to supermarket" isComplete = {isComplete} />
    </div>
  );
};

export default App;