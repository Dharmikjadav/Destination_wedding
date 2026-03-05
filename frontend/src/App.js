import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from "./components/AppRouter";
import { UserProvider } from "./context/UserContext";
import "./App.css";

function App() {
  return (
    <Router>
      <UserProvider>
        <AppRouter />
      </UserProvider>
    </Router>
  );
}

export default App;
