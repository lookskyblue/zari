import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import { Router } from "react-router-dom";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  const [location, setLocation] = useState();
  
  if (navigator.geolocation) { // GPS를 지원하면
    navigator.geolocation.getCurrentPosition(pos=>{
        setLocation(pos.coords);
    },
    error =>{
        console.error(error);
    },
    {
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: Infinity
    }
    );
  } else {
    alert('위치정보 불러오기 실패');
  }

  
  console.log(location);
  localStorage.setItem(
    "userLocation",
    JSON.stringify({
      latitude: location,
      longitude: location
    })
  );
  console.log(localStorage.getItem("userLocation"));
  
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
      {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} location={location}/> : "Initializing..."}
      {console.log(location)}
      <footer>&copy; {new Date().getFullYear()} ZARI</footer>
    </>
  );
}

export default App;
