/* 
    매장의 이름만 리스트로 보여주는 페이지
    사용자는 매장의 이름을 클릭하면 StoreDetail.js로 넘어감
*/
import React, { Component, useState, useEffect } from "react";
import GoogleApiWrapper from "./googlemap";
import Pos from "../routes/Pos";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { authService, dbService } from "fbase";

const StoreName = ({ storeObj, isOwner, isNear }) => {

    const [tableArray, setTableArray] = useState([])

    useEffect(() => {

       dbService.collection("Tables").where
       ("UniqueStoreId", "==", storeObj.id).onSnapshot(snapshot => {
           const tableArray = snapshot.docs.map(doc => ({
               id: doc.id,
               ...doc.data(),
           }));
           setTableArray(tableArray);
       });

   }, []);

   console.log(tableArray)

   const HowManyPeople = () => {
        var TableOn = 0
        var i
        for(i = 0; i < tableArray.length; i++) {
            if(tableArray[i].TotalPrice > 0){
                TableOn += 1
                continue;
            }
        }

        return(
            <div>
                  테이블 현황: {TableOn} / {tableArray.length}
            </div>
        )
   }

    return (
        <div>
            {(
                <>
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
                            <div className="storeInfo__imgContainer">
                                {storeObj.attachmentUrl && <img className="storeInfo__img" src={storeObj.attachmentUrl} />}
                            </div>
                            <h3 className="storeInfo__name">
                                매장이름: {storeObj.storeName}
                            </h3>
                            {isOwner && (
                                <>
                                    <Link to={
                                        {
                                            pathname: "/Pos",
                                            state: {
                                                storeObj,
                                                isOwner
                                            }
                                        }}>
                                        <button className="infoEdit">관리</button>
                                    </Link>
                                </>
                            )}
                        </Link>
                        <div>
                            {HowManyPeople()}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default StoreName;