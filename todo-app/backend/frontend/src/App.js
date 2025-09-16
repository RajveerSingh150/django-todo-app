import React, { useState } from "react";
import Login from "./Login";
import TaskList from "./components/TaskList";

function App() {
  const [auth, setAuth] = useState(localStorage.getItem("access"));

  const handleLogout = () => {
    localStorage.removeItem("access");
    setAuth(null);
  };

  return (
    <div>
      {auth ? <TaskList onLogout={handleLogout} /> : <Login setAuth={setAuth} />}
    </div>
  );
}

export default App;
