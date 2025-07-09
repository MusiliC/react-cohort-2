import { useState } from "react";
import { TestContext } from "./context/TestContext";
import Navbar from "./navbar/Navbar";
import TodoListApp from "./views/TodoListApp";
import { BrowserRouter, Routes, Route } from "react-router";
import Messages from "./components/Messages";
import Notifications from "./components/Notifications";
import MessageOne from "./components/MessageOne";

const App = () => {
  const [testData, setTestData] = useState("Learning Context Api");
  const [name, setName] = useState("");

  return (
    <BrowserRouter>
      <TestContext value={{ testData, name, setTestData, setName }}>
        <Navbar />
        <div className="min-h-[80vh] w-1/2 mx-auto my-10">
          <Routes>
            <Route path="" element={<TodoListApp />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/messages/:name" element={<MessageOne />} />
            <Route path="/notifications" element={<Notifications />} />
          </Routes>
        </div>
        <Navbar />
      </TestContext>
    </BrowserRouter>
  );
};

export default App;
