import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import AddOrder from "./AddOrder";
import {Link} from "react-router-dom";

const EditTable = (storeObj) => {
    const [tableArray, setTableArray]  = useState([]);
    const selectedStoreID = storeObj.location.state.storeObj;
    const [idList, setIdList] = useState([]); // Tables 컬렉션의 모든 문서 값들
    const hello = "HELLO"

    useEffect(() => {
        dbService.collection("Tables").where
        ("UniqueStoreId", "==", selectedStoreID).onSnapshot(snapshot => {
            
            const id = snapshot.docs.map(doc => (   // 테이블 문서값을 필드에 셋
                dbService.collection("Tables").doc(doc.id).set({
                    UniqueTableNo: doc.id
                }, {merge : true }),

                { // Tables 컬렉션의 문서 값만 추출
                id: doc.id
            }));
            setIdList(id);

            const tableArray = snapshot.docs.map(doc => ({// Tables값 전체 가져오기
                
                id: doc.id,
                ...doc.data(),
            }));
            setTableArray(tableArray);
            
        });
        }, []
    );

    const checkLength = (event) => {
        event.preventDefault();
        console.log(idList.length)
        console.log(idList)
        
    }

    const AddTable = async (event) => {
        event.preventDefault();
        await dbService.collection("Tables").add({
            UniqueStoreId: selectedStoreID,
        });
        
    }

    const DeleteTable = async (event) => {
        event.preventDefault();
        const { target: { value } } = event;
        dbService.collection("Tables").doc(value).delete()
    }
    console.log(selectedStoreID);
    return(
        <div>
            <div>
                <button onClick={checkLength}>idList 길이 확인</button>
            </div>
            <div>
                <button onClick={AddTable}>테이블 추가</button>
            </div>

            <div>
                {tableArray.map((obj) => (
                        <div> 
                            <div>
                                {console.log(obj)}
                                <Link to = {{
                                    pathname:"/AddOrder",
                                    state: {
                                        selectedStoreID,
                                        obj
                                    }}
                                }>
                                <button >테이블 고유 번호 = {obj.id}</button>
                                </Link>
                                <button onClick={DeleteTable} value={obj.id}> 테이블 삭제 </button>
                            </div>
                        </div>
                    ))}
            </div>   
        </div>
    )
}

export default EditTable;