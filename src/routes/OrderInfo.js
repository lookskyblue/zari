import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";

const OrderInfo = (obj) => {
    const [orderList, setOrderList] = useState([]);
    const TableNo = obj.TableNo
    const menuName = obj.Name

    useEffect(() => {
    dbService.collection("Tables").doc(TableNo).onSnapshot(function(doc) {
        setOrderList(doc.data().OrderArray)
    })
}, [])

    //console.log("주문리스트야")

    const orderInfo = () =>{
    console.log(orderList)

        for(var i = 0; i < orderList.length; i++) {
        if(orderList[i].menuName == menuName)
        {
            return(<div>{orderList[i].orderQuantity}</div>)
        }
    }
    }

    return(
        <div>
            {
                console.log("orderInfo.js"),
                orderInfo()
            }
        </div>
    )
}

export default OrderInfo;