import React, { Component } from "react";
import GoogleApiWrapper from "./googlemap";
import Profile from "../routes/Profile";
import {Link} from "react-router-dom";

const StoreInfo = ({ storeObj, isOwner }) => (
    <div className="storeInfo">
        <Link to="/Home">
        <h3 className="storeInfo__name">
            매장이름: {storeObj.storeName}
        </h3>
        <h4 className="storeInfo__intro">
            매장정보: {storeObj.storeIntro}
        </h4>

        {isOwner && (
            <>
                <button>선택</button>
            </>
        )}
        </Link>
    </div>
)

export default StoreInfo;