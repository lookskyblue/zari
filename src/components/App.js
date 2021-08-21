import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import { Router } from "react-router-dom";

var uObj;

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [location, setLocation] = useState(null);


  const getLocation = () => {
    if (navigator.geolocation) { // GPS를 지원하면
        navigator.geolocation.getCurrentPosition(pos => {
        setLocation(pos.coords);
        setInit(true);//위치를 받아온다음에 초기화 완료뜨게함.

        localStorage.setItem(
          "userLocation",
          JSON.stringify({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          })
        );
      },
        error => {
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
  }

  useEffect(() => {
    getLocation();
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user); //현재사용자
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  uObj = userObj;
  
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} location={location} /> : "Initializing..."}
      <footer>&copy; {new Date().getFullYear()} ZARI</footer>
    </>
  );
}

export default App;
export var uObj;