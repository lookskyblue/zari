import { Link } from "react-router-dom";
import React, { Component, useState, useEffect } from "react";
import { dbService, storageService } from "fbase";

const MenuLoad = ({ menus, isStore }) => {

    const [tableArray, setTableArray] = useState([]);
    const storeId = menus.StoreID // 가게 고유 번호
    console.log(storeId)

    useEffect(() => {
        dbService.collection("Tables")
        .where("UniqueStoreId", "==", storeId).onSnapshot(snapshot => {
            const tableArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTableArray(tableArray);
        });
    }, []);

    console.log(tableArray)

    const onDeleteClick = async () => { // 메뉴 삭제
        const ok = window.confirm("메뉴를 삭제하시겠습니까? \n테이블에 해당 메뉴의 주문내역도 같이 삭제됩니다.");
        if (ok) {
            await dbService.doc(`menu/${menus.id}`).delete();
            await storageService.refFromURL(menus.attachmentUrl).delete();


            for(var i = 0; i < tableArray.length; i++) {    //테이블 돌면서 메뉴 삭제 반영
                //https://dgkim5360.tistory.com/entry/deleting-an-item-in-array-javascript
                //findIndex함수 문법 잘 모르니 문제있으면 참고.
                const idx = tableArray[i].OrderArray    
                .findIndex(function(item) {return item.menuName === menus.Name})
                const subPrice = tableArray[i].OrderArray[idx].totalPrice // 삭제할 메뉴의 주문 금액을 빼줘야함
                if(idx > -1) {tableArray[i].OrderArray.splice(idx, 1)}

                dbService.collection("Tables").doc(tableArray[i].id).set({
                     OrderArray: tableArray[i].OrderArray,
                     TotalPrice: tableArray[i].TotalPrice-subPrice

                 }, {merge: true})
            }
        }
    }

    return (
        <div className="menu__container">
            {isStore && (
                <div className="menu__obj">
                    <div className="menu__imgContainer">
                        {menus.attachmentUrl && <img className="menu__img" src={menus.attachmentUrl} />}
                    </div>
                    <div className="menu__info">
                        <h3>
                            메뉴 이름: {menus.Name}
                        </h3>
                        <h3>
                            메뉴 가격: {menus.Price} 원
                        </h3>
                    </div>
                    <button className="menu__delBtn" onClick={onDeleteClick}>메뉴 삭제</button>
                </div>
            )}
        </div>
    );
}

export default MenuLoad;