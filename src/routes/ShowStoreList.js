import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import { authService } from "fbase";

const ShowStoreList = () => {
    const [storeList, setStoreList] = useState([]);

    useEffect(() => { //컴포넌트가 마운트 되면 매장 정보를 가져 오겠다 2ㄱ
        
        dbService.collection("storeinfo").onSnapshot(snapshot => {
            const storeArray = snapshot.docs.map(doc => ({
                id:doc.id, 
                ...doc.data(),
            }));
            setStoreList(storeArray);
        });
    }, []);
    
    
    
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