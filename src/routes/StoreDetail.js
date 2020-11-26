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


const StoreDetail = (storeObj, isNear) => {
    if (!localStorage.getItem("userInfo2")) {
        localStorage.setItem(
            "userInfo2",
            JSON.stringify({
                location: storeObj.location,
            }),
        )};
    
       const [loadLocalStorage, setLoadLocalStorage] = useState("");
       const [isLoading, setIsLoading] = useState(false);
        const [ownerId, setOwnerId] = useState(JSON.parse(localStorage.getItem("userInfo2")).location.state.storeObj.id);
        const [storeName, setStoreName] = useState(JSON.parse(localStorage.getItem("userInfo2")).location.state.storeObj.storeName);
        const [storeIntro, setStoreIntro] = useState(JSON.parse(localStorage.getItem("userInfo2")).location.state.storeObj.storeIntro);
        const [storeTime, setStoreTime] = useState(JSON.parse(localStorage.getItem("userInfo2")).location.state.storeObj.storeTime);
    

    const SpreadReview = () => {  // 토글
        setIsLoading(!isLoading);
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
            <div>
                {menuList.map((obj) => (    //obj 는 menu 컬렉션의 하나하나의 문서들
                    <MenuLoad key={obj.id} menus={obj} isStore={obj.StoreID === ownerId} />
                ))}
            </div>
            <div className="storeDetail__Btn">
                <button onClick={SpreadReview} >리뷰</button>
            </div>
            <div>
                {isLoading ? <ReviewPage storeName={storeName} ownerId={ownerId} /> : ""}
            </div>
        </div>
    )
}

export default StoreDetail;