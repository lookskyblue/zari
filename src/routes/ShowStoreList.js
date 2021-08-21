import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import { authService } from "fbase";
import StoreName from "components/StoreName";
import userEvent from "@testing-library/user-event";
import MapAPI from "../components/googlemap"
import { useSelector } from "react-redux";//유저 정보 가져오기 위해

function distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") { dist = dist * 1.609344 }
        if (unit == "N") { dist = dist * 0.8684 }
        return dist;
    }
}

const ShowStoreList = ({ userObj }) => {
    const [storeList, setStoreList] = useState([]);
    const nearStoreList = [];
    const [location, setLocation] = useState({});

    const getLocation = () => {
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
    }

    useEffect( async() => { //컴포넌트가 마운트 되면 매장 정보를 가져 오겠다 2ㄱ
        await getLocation();
        
          if (location !== undefined) {
            localStorage.setItem(
              "userLocation",
              JSON.stringify({
                latitude: location.latitude,
                longitude: location.longitude
              })
            );
          }

        dbService.collection("storeinfo").onSnapshot(snapshot => {
            const storeArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setStoreList(storeArray);
        });

        storeList.forEach((obj) => {
            if (distance(location.latitude, location.longitude, obj.location.latitude, obj.location.longitude, 'K') < 5) {
                nearStoreList.push(obj);
            }
        });
    }, []);

    localStorage.removeItem("userInfo");
    localStorage.removeItem("userInfo2");
    localStorage.removeItem("storeMenu");
    localStorage.removeItem("StoreDetail");
    localStorage.removeItem("EditTable");
    localStorage.removeItem("AddOrder");

    console.log(location);
    useSelector(state => console.log(state))
    return (
        <div>
            <MapAPI initialCenter={{ lat: location.latitude, lng: location.longitude }} storeList={nearStoreList} />
            {nearStoreList.map((obj) => (
                <StoreName key={obj.id} storeObj={obj} isOwner={obj.storeOnwer === userObj.email} />
            ))}
        </div>
    );//여기서 css수정
};


export default ShowStoreList;
