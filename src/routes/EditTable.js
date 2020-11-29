import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import AddOrder from "./AddOrder";
import { Link } from "react-router-dom";

const EditTable = (storeObj) => {

    const [orderArray, setOrderArray] = useState([])

    if (!localStorage.getItem("EditTable")) {
        localStorage.setItem(
            "EditTable",
            JSON.stringify({
                location: storeObj.location,
                history: storeObj.history,
                storeObj
            })
        );
    }
    storeObj=JSON.parse(localStorage.getItem("EditTable")).storeObj;
    const [tableArray, setTableArray] = useState([]);
    const [selectedStoreID,setselectedStoreI] = useState(JSON.parse(localStorage.getItem("EditTable")).location.state.storeObj);
    const [idList, setIdList] = useState([]); // Tables 컬렉션의 모든 문서 값들

    useEffect(() => {

        dbService.collection("menu").where
        ("StoreID", "==", selectedStoreID).onSnapshot(snapshot => {
            const orderArray = snapshot.docs.map(doc => {
                return(
                    {
                        menuName: doc.data().Name,
                        orderQuantity: 0,
                        singlePrice: (doc.data().Price*1), // 문자->숫자 형변환
                        totalPrice: 0 // orderQuantity * singlePrice
                    }
                );
            })
            console.log("테이블 애드 함수")
            console.log(orderArray)
            setOrderArray(orderArray)
        })

        dbService.collection("Tables").where
            ("UniqueStoreId", "==", selectedStoreID).onSnapshot(snapshot => {
                const tableArray = snapshot.docs.map(doc => ({// Tables값 전체 가져오기

                    id: doc.id,
                    ...doc.data(),
                }));
                setTableArray(tableArray);

            });
    }, []);

    const checkLength = (event) => {
        event.preventDefault();
        console.log(idList.length)
        console.log(idList)
    }

    const AddTable = async (event) => {
        event.preventDefault();

        console.log("메뉴 객체배열 나와야함..")
        console.log(orderArray)

        dbService.collection("Tables").add({
            UniqueStoreId: selectedStoreID,
            TotalPrice: 0,
            OrderArray: orderArray,
            //TodaySales: 0
        });

    }

    const DeleteTable = async (event) => {
        event.preventDefault();
        const ok = window.confirm("해당 테이블을 삭제하시겠습니까?");
        if (ok) {
            const { target: { value } } = event;
            dbService.collection("Tables").doc(value).delete();
        }
    }

    return (
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
                        {console.log(obj)}
                        <div>
                            <Link to={{
                                pathname: "/AddOrder",
                                state: {
                                    selectedStoreID,
                                    tableObj: obj
                                }
                            }
                            }>
                                <button >테이블 고유 번호 = {obj.id}</button>
                            </Link>
                            <button onClick={DeleteTable} value={obj.id}> 테이블 삭제 </button>
                            {
                                obj.TotalPrice > 0 ? "만석":"빈자리"
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default EditTable;