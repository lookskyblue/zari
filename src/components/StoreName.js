/* 
    매장의 이름만 리스트로 보여주는 페이지
    사용자는 매장의 이름을 클릭하면 StoreDetail.js로 넘어감
*/
import React, { Component } from "react";
import GoogleApiWrapper from "./googlemap";
import Review from "../routes/StoreDetail";
import { useHistory } from "react-router-dom";
import {Link} from "react-router-dom";

const StoreName = ({storeObj,isOwner})=> {
    
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
                    <button>선택</button>
                    </>
                )}

            </Link>
    </div>
    );

}

export default StoreName;