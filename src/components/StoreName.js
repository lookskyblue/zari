/* 
    매장의 이름만 리스트로 보여주는 페이지
    사용자는 매장의 이름을 클릭하면 StoreDetail.js로 넘어감
*/
import React, { Component } from "react";
import GoogleApiWrapper from "./googlemap";
import Pos from "../routes/Pos";
import { useHistory } from "react-router-dom";
import {Link} from "react-router-dom";

var SelectedStoreObj;  // 내가 선택한 매장의 객체를 저장하는 변수
const StoreName = ({storeObj,isOwner})=> {

    SelectedStoreObj = storeObj;

    return (
    <div className="storeInfo">
        <Link 
            to={{
                pathname: "/storeDetail",
                state: {
                    storeObj,
                    isOwner
                }
            }}
        >
                <h3>
                    매장이름: {storeObj.storeName}
                </h3>
            
                {isOwner && (
                    <>
                    <Link to={
                    {pathname:"/Pos",
                    state: {
                    storeObj,
                    isOwner}
                    }}>
                    <button className="infoEdit">관리</button>
                    </Link>
                    </>
                )}
                
            </Link>
    </div>
    );

}

export default StoreName;
export var SelectedStoreObj;