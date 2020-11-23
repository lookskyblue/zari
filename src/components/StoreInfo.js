import React, { Component } from "react";
import GoogleApiWrapper from "./googlemap";
import Review from "../routes/Review";
import { useHistory } from "react-router-dom";
import {Link} from "react-router-dom";

const StoreInfo = ({storeObj,isOwner})=> {

    //   const callReview = () =>{
    //       <Review />
    //       console.log("Called")
    //   }

    //   const history = useHistory();
    
    return (
    <div>
        <Link 
            to={{
                pathname: "/review",
                state: {
                    storeObj,
                    isOwner
                }
            }}
        >
            
                <h3>
                    매장이름: {storeObj.storeName}
                </h3>
                <h4>
                    매장정보: {storeObj.storeIntro}
                </h4>

                {isOwner && (
                    <>
                    <button>선택</button>
                    </>
                )}

            </Link>
    </div>
    );

}

export default StoreInfo;