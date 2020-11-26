/* 
    사용자가 StoreName.js에서 매장의 이름을 클릭시 이 페이지로 넘어옴 
    매장의 세부 정보를 볼 수 있는 페이지
    StoreName.js에서 storObj, isOwner 받아옴.
*/
import React, { useEffect, useState } from "react";
import { authService, dbService } from "fbase";
import ReviewPage from "./ReviewPage";
import { Link } from "react-router-dom";
import MenuLoad from "./MenuLoad";
import Menu from "./Menu";
import { uObj } from "../components/App";

const StoreDetail = (storeObj, isNear) => {

    /*
    const refesh = () => {
        const [location, setLocation] = storeObj.location;
        //로컬 스토리지에 저장해서 새로고침해도 상관없도록!
        if (location.state !== undefined) {
            localStorage.setItem(
                "userInfo",
                JSON.stringify({
                    location: location,
                    history: storeObj.history
                })
            );
        }
    }
    refesh();
    */

    if (storeObj !== undefined) {
        localStorage.setItem(
            "userInfo2",
            JSON.stringify({
                location: storeObj.location
            }),

        );
    } else {
        setting();
    }

    const [loadLocalStorage, setLoadLocalStorage] = useState("");
    const [isClicked, setIsClicked] = useState(false);
    const [ownerId, setOwnerId] = useState(storeObj.location.state.storeObj.id);
    const [storeName, setStoreName] = useState(storeObj.location.state.storeObj.storeName);
    const [storeIntro, setStoreIntro] = useState(storeObj.location.state.storeObj.storeIntro);
    const [storeTime, setStoreTime] = useState(storeObj.location.state.storeObj.storeTime);

    const [editing, setEditing] = useState(false);
    const [newStoreName, setNewStoreName] = useState(storeObj.location.state.storeObj.storeName);
    const [newStoreIntro, setNewStoreIntro] = useState(storeObj.location.state.storeObj.storeIntro);
    const [newStoreTime, setNewStoreTime] = useState(storeObj.location.state.storeObj.storeTime);

    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`storeinfo/${storeObj.location.state.storeObj.id}`).update({
            storeName: newStoreName,
            storeIntro: newStoreIntro,
            Time: newStoreTime
        })
        setEditing(false);
    }
    const onChange1 = (event) => {
        const {target: {value}} = event;
        setNewStoreName(value);
    }
    const onChange2 = (event) => {
        const {target: {value}} = event;
        setNewStoreIntro(value);
    }
    const onChange3 = (event) => {
        const {target: {value}} = event;
        setNewStoreTime(value);
    }

    const setting = () => {
        setLoadLocalStorage(JSON.parse(localStorage.getItem("userInfo2")));
        setOwnerId(loadLocalStorage.location.state.storeObj.id)
        setStoreName(loadLocalStorage.location.state.storeObj.storeName)
        setStoreIntro(loadLocalStorage.location.state.storeObj.storeIntro)
        setStoreTime(loadLocalStorage.location.state.storeObj.storeTime)
    }

    //console.log(storeObj);

    /*
   if (storeObj !== undefined) {
    localStorage.setItem(
        "userInfo2",
        JSON.stringify({
            location: storeObj.location
        }),
        
    );
    setOwnerId(storeObj.location.state.storeObj.id);
    setStoreName(storeObj.location.state.storeObj.storeName);
    setStoreIntro(storeObj.location.state.storeObj.storeIntro);
    setStoreTime(storeObj.location.state.storeObj.storeTime);
    console.log(storeName);//여기까지는 넣어지고
    } else {
        setting();
    }

    console.log(localStorage.getItem("userInfo2"));
*/

    const SpreadReview = () => {  // 토글
        setIsClicked(!isClicked);
    };

    const [menuList, setMenuList] = useState([]);

    useEffect(() => {
        dbService.collection("menu").onSnapshot(snapshot => {
            const menuArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setMenuList(menuArray);
        });
    }, []);

    console.log(uObj.uid);
    console.log(storeObj.location.state.storeObj.UID);

    return (
        <div>
            {
                editing ?
                    <>
                        <form onSubmit={onSubmit}>
                            <input type="text" placeholder="새로운 매장 이름" value={newStoreName} onChange={onChange1} required />
                            <input type="text" placeholder="새로운 매장 설명" value={newStoreIntro} onChange={onChange2} required />
                            <input type="text" placeholder="새로운 매장 영업 시간" value={newStoreTime} onChange={onChange3} required />
                            <input type="submit" value="수정" />
                        </form>
                        <button onClick={toggleEditing}>취소</button>
                    </> :
                    <>
                        {uObj.uid=== storeObj.location.state.storeObj.UID && <button onClick={toggleEditing}>매장 정보 수정</button>}
                        <ul className="storeDetail">
                            <li className="storeDetail__Logo">
                                매장 로고 : 로고 이미지
                            </li>
                            <li className="storeDetail__Name">
                                {storeName}
                            </li>
                            <li className="storeDetail__Intro">
                                매장 소개 : {storeIntro}
                            </li>
                            <li className="storeDetail__Time">
                                매장 영업시간 : {storeTime}
                            </li>
                        </ul>
                        <div className="storeDetail__menu">
                            <p>Menu</p>
                            {menuList.map((obj) => (    //obj 는 menu 컬렉션의 하나하나의 문서들
                                <MenuLoad key={obj.id} menus={obj} isStore={obj.StoreID === ownerId} />
                            ))}
                        </div>
                        <div className="storeDetail__Btn">
                            <button onClick={SpreadReview} >리뷰</button>
                        </div>
                        <div>
                            {isClicked ? <ReviewPage storeName={storeName} ownerId={ownerId} /> : ""}
                        </div>
                    </>
            }
        </div>
    )
}

export default StoreDetail;