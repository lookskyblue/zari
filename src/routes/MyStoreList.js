import React, { useState } from "react";
import { Link } from "react-router-dom";
import { uObj } from "../components/App";

const MyStoreList = ({storeObj}) => {
    const [isOwner, setIsOwner] = useState(false);

    const ownerChk = () => {
        if (uObj.uid === storeObj.UID) setIsOwner(true);
        else setIsOwner(false);
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
                                {storeObj.storeName}
                            </h3>
                            {
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
                            }
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
}

export default MyStoreList;