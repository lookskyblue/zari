import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import ShowStoreList from "./ShowStoreList";
import { useHistory } from "react-router-dom";

const Home = ({userObj}) =>{
    
    const [location, setLocation] = useState();
    const [storeName, setStoreName] = useState("");
    const [storeIntro, setStoreIntro] = useState("");
    
    const [storeCollection, setStoreCollection] = useState([]);
    const history = useHistory();
    
    const getStoreCollection = async () => { // 매장 컬렉션 가져오기
        const dbStoreInfo = await dbService.collection("storeinfo").where("storeOnwer","==",authService.currentUser.email).get();
        dbStoreInfo.forEach((document) => console.log(document.data()));
        
    };
    
    useEffect(() => { //컴포넌트가 마운트 되면 매장 정보를 가져 오겠다 2ㄱ
        getStoreCollection();
    }, []);


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
      //위치정보 불러오기
    const onSubmit = async (event) => {
       
        event.preventDefault();
        await dbService.collection("storeinfo").add({
            storeName,
            location: new firebase.firestore.GeoPoint(location.latitude,location.longitude), //위치
            storeIntro,
            storeOnwer: userObj.email,
        });
        
        setStoreName("");
        setStoreIntro("");
        history.push("/");  //showlist로 리다이렉트
    };
    const onChange1 = (event) =>{
        const { target:{value}} = event;
        setStoreName(value);
    }
    const onChange2 = (event) =>{
        const { target:{value}} = event;
        setStoreIntro(value);
    }
    return(<div>
        <form on onSubmit={onSubmit}>
            <input value={storeName} onChange={onChange1} type="text" placeholder="매장이름" maxLength={20}/>
        </form>

        <form on onSubmit={onSubmit}>
            <input value={storeIntro} onChange={onChange2} type="text" placeholder="매장설명" maxLength={200}/>
            <input type="submit" value="등록" />
        </form>
    </div>
    );//css수정필요

};

export default Home;