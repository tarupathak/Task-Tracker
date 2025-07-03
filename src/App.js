import React, { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import { getUser } from "./utils/localStorage";

function App() {
  const [username, setUsername] = useState(getUser());
  return <Login setUsername={setUsername} />;
}

export default App;
