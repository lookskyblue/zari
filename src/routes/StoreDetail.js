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
import ShowStoreList from "./ShowStoreList";

const StoreDetail = (storeObj, isNear) => {
    if (!localStorage.getItem("userInfo2")) {
        localStorage.setItem(
            "userInfo2",
            JSON.stringify({
                location: storeObj.location,
                id: storeObj.location.state.storeObj.id,
                storeName: storeObj.location.state.storeObj.storeName,
                storeIntro: storeObj.location.state.storeObj.storeIntro,
                storeTime: storeObj.location.state.storeObj.storeTime
            }),
        )
    };

    if (!localStorage.getItem("StoreDetail")) {
        localStorage.setItem(
            "StoreDetail",
            JSON.stringify({
                storeName: storeObj.location.state.storeObj.storeName,
                storeIntro: storeObj.location.state.storeObj.storeIntro,
                storeTime: storeObj.location.state.storeObj.storeTime
            }),
        )
    };
    const [loadLocalStorage, setLoadLocalStorage] = useState("");
    const [isClicked, setIsClicked] = useState(false);
    const [ownerId, setOwnerId] = useState(JSON.parse(localStorage.getItem("userInfo2")).location.state.storeObj.id);
    const [storeName, setStoreName] = useState(JSON.parse(localStorage.getItem("userInfo2")).location.state.storeObj.storeName);
    const [storeIntro, setStoreIntro] = useState(JSON.parse(localStorage.getItem("userInfo2")).location.state.storeObj.storeIntro);
    const [storeTime, setStoreTime] = useState(JSON.parse(localStorage.getItem("userInfo2")).location.state.storeObj.storeTime);

    const [editing, setEditing] = useState(false);
  

    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`storeinfo/${storeObj.location.state.storeObj.id}`).update({
            storeName: storeName,
            storeIntro: storeIntro,
            storeTime: storeTime
        })
        localStorage.setItem(
            "StoreDetail",
            JSON.stringify({
                storeName: storeName,
                storeIntro: storeIntro,
                storeTime: storeTime
            }),
        )
        setEditing(false);
    }
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

    return (
        <div>
            {
                editing ?
                    <>
                        <form onSubmit={onSubmit}>
                            <input type="text" placeholder="새로운 매장 이름" value={storeName} onChange={onChange1} required />
                            <input type="text" placeholder="새로운 매장 설명" value={storeIntro} onChange={onChange2} required />
                            <input type="text" placeholder="새로운 매장 영업 시간" value={storeTime} onChange={onChange3} required />
                            <input type="submit" value="수정" />
                        </form>
                        <button onClick={toggleEditing}>취소</button>
                    </> :
                    <>
                        {uObj.uid === JSON.parse(localStorage.getItem("userInfo2")).location.state.storeObj.UID && <button onClick={toggleEditing}>매장 정보 수정</button>}
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
                            {isClicked ? <ReviewPage storeObj={storeObj} /> : ""}
                        </div>
                    </>
            }
        </div>
    )
}

export default StoreDetail;