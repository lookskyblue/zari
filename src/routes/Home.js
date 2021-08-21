import { authService, dbService, storageService } from "fbase";
import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import ShowStoreList from "./ShowStoreList";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";    // 랜덤 숫자 생성
import { useSelector } from "react-redux";//유저 정보 가져오기 위해

const Home = () => {

    const user = useSelector(state => state.user);//state에서 user를 가져온다.(user에 대한 모든정보.)
    const [location, setLocation] = useState({});
    const [storeName, setStoreName] = useState("");
    const [storeIntro, setStoreIntro] = useState("");
    const [storeTime, setStoreTime] = useState("");
    const [attachment, setAttachment] = useState("");

    const [storeCollection, setStoreCollection] = useState([]);

    const history = useHistory();

    console.log(user);
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

    useEffect(async()=>{
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
    },[])

    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = "";
        if (attachment !== "") {
            const attachmentfileRef = storageService.ref().child(`${user.data.uid}/${uuidv4()}`);
            // 매장 등록에 사용한 이미지는 Storage에 user id 이름의 폴더에 랜덤 이름으로 저장됨.
            const response = await attachmentfileRef.putString(attachment, "data_url");
            attachmentUrl = await response.ref.getDownloadURL();
        }

        await dbService.collection("storeinfo").add({
            attachmentUrl,
            storeName,
            location: new firebase.firestore.GeoPoint(location.latitude, location.longitude), //위치
            storeIntro,
            storeOnwer: user.data.email,
            UID: user.data.uid, // 사용자 유니크 id
            storeTime,
            tableN: 0,
            TodaySales: 0
        });

        setAttachment("");
        setStoreName("");
        setStoreIntro("");
        setStoreTime("");
        history.push("/");  //showlist로 리다이렉트
    };
    const onChange1 = (event) => {
        const { target: { value } } = event;
        setStoreName(value);
    }
    const onChange2 = (event) => {
        const { target: { value } } = event;
        setStoreIntro(value);
    }
    const onChange3 = (event) => {
        const { target: { value } } = event;
        setStoreTime(value);
    }

    const onFileChange = (event) => {
        const { target: { files } } = event;
        const theFile = files[0];
        if (theFile) {  // 파일 선택을 누르고 취소했을 때를 대비한 if문
            const reader = new FileReader();
            reader.onloadend = (finishedEvent) => {
                const { currentTarget: { result } } = finishedEvent;
                setAttachment(result);
            }
            reader.readAsDataURL(theFile);
        }
    }

    const onClearAttachment = () => setAttachment(null);

    return (
        <div className="register__container">
            <div className="register__logo">
                <div>
                    <div className="register__text">매장 로고를 선택하세요.</div>
                    <input type="file" accept="image/*" onChange={onFileChange} />
                </div>
                {attachment && (
                    <div>
                        <img className="register__img" src={attachment} />
                        <button onClick={onClearAttachment}>취소</button>
                    </div>)
                }
            </div>
            <form className="register__form" on onSubmit={onSubmit}>
                <input value={storeName} onChange={onChange1} type="text" placeholder="매장 이름" maxLength={20} required />
                <input value={storeIntro} onChange={onChange2} type="text" placeholder="매장 설명" maxLength={200} required />
                <input value={storeTime} onChange={onChange3} type="text" placeholder="매장 영업 시간" maxLength={200} required />
                <input type="submit" value="등록" />
            </form>
        </div>
    );//css수정필요

};

export default Home;