import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import { Router } from "react-router-dom";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user)=> {
      if(user){
        setIsLoggedIn(true);
        setUserObj(user); //현재사용자
        
      }else{
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : "Initializing..."}
      <footer>&copy; {new Date().getFullYear()} ZARI</footer>
    </>
  );
}

export default App;
