import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import { authService } from "fbase";
import StoreName from "components/StoreName";
import userEvent from "@testing-library/user-event";
import SimpleMap from "../components/googlemap"

var test;   // 매장 객체 배열

const ShowStoreList = ({userObj}) => {
    const [storeList, setStoreList] = useState([]);
    

    useEffect(() => { //컴포넌트가 마운트 되면 매장 정보를 가져 오겠다 2ㄱ

        dbService.collection("storeinfo").onSnapshot(snapshot => {
            const storeArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setStoreList(storeArray);
        });
    }, []);

    test = storeList;

    return (

        <div>
            <SimpleMap />
            {storeList.map((obj) => (
                <StoreName key={obj.id} storeObj={obj} isOwner={obj.storeOnwer === userObj.email}/>
            ))}
        </div>
    );//여기서 css수정
};

export default ShowStoreList;
export var test;