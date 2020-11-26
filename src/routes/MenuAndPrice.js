import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import MenuLoad from "./MenuLoad"

const MenuAndPrice = (StoreObj) => {
    const selectedStoreId = StoreObj.location.state.selectedStoreID

    const [menuList, setMenuList] = useState([]);

    useEffect(() => {
        dbService.collection("menu").where
        ("StoreID", "==", selectedStoreId).onSnapshot(snapshot => {
            const menuArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setMenuList(menuArray);
        });
    }, []);
    
    console.log(menuList)

    return(
        <div>
            <div>
            {menuList.map((obj) => (    //obj 는 menu 컬렉션의 하나하나의 문서들
                <MenuLoad key={obj.id} menus={obj} isStore={true}/>
                 ))}
            </div>
            
        </div>
    )
}

export default MenuAndPrice;