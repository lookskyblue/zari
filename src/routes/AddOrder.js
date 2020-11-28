import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import MenuLoad from "./MenuLoad"
import OrderInfo from "./OrderInfo";

const AddOrder = (StoreObj) => {
    const selectedStoreId = StoreObj.location.state.selectedStoreID
    const TableNo = StoreObj.location.state.tableObj.id

    const [menuList, setMenuList] = useState([]);
    const [orderList, setOrderList] = useState([]);
    const [totalPrice, setTotalPrice] = useState(999);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
         dbService.collection("Tables").doc(TableNo).onSnapshot(function(doc) {
             setOrderList(doc.data().OrderArray)
             setTotalPrice(doc.data().TotalPrice)
         })

        dbService.collection("menu").where
        ("StoreID", "==", selectedStoreId).onSnapshot(snapshot => {
            const menuArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setMenuList(menuArray);
        });
    }, [refresh]);

    const SaveOrder = () => {

        console.log("SaveOrder")

        dbService.collection("Tables").doc(TableNo).set({
            TotalPrice: totalPrice,
            OrderArray: orderList
            }, {merge : true })
            
            setRefresh(1)
    }

    const MinusOrder = (event) => {
        event.preventDefault();
        const { target: { value } } = event;

        for(var i = 0; i < orderList.length; i++) {
            if(orderList[i].menuName == value)
            {
                orderList[i].orderQuantity -= 1
                orderList[i].totalPrice = 
                orderList[i].singlePrice * 
                orderList[i].orderQuantity
                setTotalPrice(totalPrice + orderList[i].totalPrice)
                SaveOrder()
                break
            }
        }
    }
     
    
    const AddOrder = (event) => {
        event.preventDefault();
        const { target: { value } } = event;

        for(var i = 0; i < orderList.length; i++) {
            if(orderList[i].menuName == value)
            {
                orderList[i].orderQuantity += 1
                orderList[i].totalPrice = 
                orderList[i].singlePrice * 
                orderList[i].orderQuantity
                setTotalPrice(totalPrice + orderList[i].totalPrice)
                console.log(totalPrice)
                SaveOrder()
                break
            }
        }
    }
    
    const ShowOrderInfo = (menuName) => { // 배열객체 포문 돌려서 메뉴이름 일치하는 인덱스의 수량 리턴해 
       for(var i = 0; i < orderList.length; i++) {
            if(orderList[i].menuName == menuName)
            {
                return(
                <div>
                    <ul>
                        <li>
                            주문 수량: {orderList[i].orderQuantity}
                        </li>
                        <li>
                            현재 메뉴 가격: {orderList[i].totalPrice}
                        </li>
                        <li>
                            총 가격: {totalPrice}
                        </li>
                    </ul>
                </div>
                )
            }
        }
    }

    return(
        <div>
            <div>
                현재 테이블 총 주문 금액: {totalPrice}
            </div>
            <div>
            { menuList.map((obj) => (    //obj 는 menu 컬렉션의 하나하나의 문서들
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
                                <button onClick={MinusOrder} value={obj.Name}>-</button>
                                    {
                                        ShowOrderInfo(obj.Name)
                                        //< OrderInfo obj={obj} TableNo={TableNo} />
                                    }
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