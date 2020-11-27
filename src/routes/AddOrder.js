import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import MenuLoad from "./MenuLoad"

const AddOrder = (StoreObj) => {
    const selectedStoreId = StoreObj.location.state.selectedStoreID
    const TableNo = StoreObj.location.state.obj.UniqueTableNo

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
    
    const AddOrder = (event) => {
        event.preventDefault();
        const { target: { value } } = event;
        console.log(value)
        console.log(TableNo)

         dbService.collection("Tables").doc(TableNo).set({
             value: 1
         }, {merge : true })
    }

    return(
        <div>
            <div>
            {menuList.map((obj) => (    //obj 는 menu 컬렉션의 하나하나의 문서들
                <div className="menu__container">
                { 
                    <div className="menu__obj">
                        <div className="menu__imgContainer">
                            {obj.attachmentUrl && <img className="menu__img" src={obj.attachmentUrl} />}
                        </div>
                        <div className="menu__info">
                            <h3>
                                메뉴 이름: {obj.Name}
                            </h3>
                            <h3>
                                메뉴 가격: {obj.Price} 원
                            </h3>

                            <div>
                                <button onClick={AddOrder} value={obj.Name}>+</button>
                                <button>-</button>
                                0
                            </div>
                        </div>
                        
                    </div>
                }
            </div>
                 ))}
            </div>
            
        </div>
    )
}

export default AddOrder;