/* 
    사용자가 StoreName.js에서 매장의 이름을 클릭시 이 페이지로 넘어옴 
    매장의 세부 정보를 볼 수 있는 페이지
    StoreName.js에서 storObj, isOwner 받아옴.
*/
import React, { useEffect, useState } from "react";
import MenuAdd from "./MenuAdd";
import { authService, dbService } from "fbase";
import MenuLoad from "./MenuLoad";

const Menu = (storeObj) => {
    const [isLoading, setisLoading] = useState(false);

    const SpreadMenuAdd = () => {
        setisLoading(!isLoading);
    }

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

    const selectedStoreID = storeObj.location.state.storeObj;  // selectedStoreID는 내가 선택한 매장의 storeID

    console.log(storeObj);

    return (
        <div>
            <div>
                {menuList.map((obj) => (    //obj 는 menu 컬렉션의 하나하나의 문서들
                    <MenuLoad key={obj.id} menus={obj} isStore={obj.StoreID === selectedStoreID} />
                ))}
            </div>

            <button onClick={SpreadMenuAdd}>메뉴 추가</button>
            <div>
                {isLoading ? <MenuAdd storeObj={selectedStoreID} /> : ""}
            </div>
        </div>
    );
}

export default Menu;