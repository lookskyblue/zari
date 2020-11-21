import React, { useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import { Router } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
