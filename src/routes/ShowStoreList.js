import React, { useEffect, useState } from "react";
import { dbService } from "fbase";

const ShowStoreList = () => {
    const [storeList, setStoreList] = useState([]);

    const getStoreList = async () => { // 매장 컬렉션 가져오기
        const dbStoreInfo = await dbService.collection("storeinfo").get();
        dbStoreInfo.forEach((document) => {
            const storeListObject = { // 객체임
                ...document.data(),
                id: document.id,
            };
            setStoreList((prev) => [storeListObject, ...prev]);
        });
    };

    useEffect(() => { //컴포넌트가 마운트 되면 매장 정보를 가져 오겠다 2ㄱ
        getStoreList();
    }, []);

    //console.log(storeList);
    return(
        <div>
            {storeList.map((obj) => (
                <div key={obj.id}>
                    <h3>
                        매장이름: {obj.storeName}
                    </h3>
                    <h4>매장정보: {obj.storeIntro}</h4>
                </div>
            ))}
        </div>
    );//여기서 css수정
};

export default ShowStoreList;