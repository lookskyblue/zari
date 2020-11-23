import React, { Component } from "react";
import GoogleApiWrapper from "./googlemap";

const StoreInfo = ({storeObj,isOwner})=>(
    <div >
                <h3>
                    매장이름: {storeObj.storeName}
                </h3>
                <h4>매장정보: {storeObj.storeIntro}</h4>
                
                {isOwner && (
                    <>
                    <button>선택</button>
                    </>
                )}
    </div>
    
        
    
)

export default StoreInfo;