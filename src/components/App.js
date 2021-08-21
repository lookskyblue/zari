import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import { Router } from "react-router-dom";
import {Provider } from 'react-redux'

var uObj;

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [location, setLocation] = useState();

  useEffect(() => {

    if (navigator.geolocation) { // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(pos => {
        setLocation(pos.coords);
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
  
  
    if (location !== undefined) {
      localStorage.setItem(
        "userLocation",
        JSON.stringify({
          latitude: location.latitude,
          longitude: location.longitude
        })
      );
    }

    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user); //현재사용자

      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
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