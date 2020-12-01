import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import AddOrder from "./AddOrder";
import { Link } from "react-router-dom";

const EditTable = (storeObj) => {
    const [orderArray, setOrderArray] = useState([])
    const [tableNumber, setTableNumber] = useState("0");

    localStorage.removeItem("AddOrder");

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
    const [selectedStoreID, setselectedStoreI] = useState(JSON.parse(localStorage.getItem("EditTable")).location.state.storeObj);
    const [idList, setIdList] = useState([]); // Tables 컬렉션의 모든 문서 값들

    useEffect(() => {

        dbService.collection("menu").where
            ("StoreID", "==", selectedStoreID).onSnapshot(snapshot => {
                const orderArray = snapshot.docs.map(doc => {
                    return (
                        {
                            menuName: doc.data().Name,
                            orderQuantity: 0,
                            singlePrice: (doc.data().Price * 1), // 문자->숫자 형변환
                            totalPrice: 0 // orderQuantity * singlePrice
                        }
                    );
                })
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

    const AddTable = async (event) => {
        event.preventDefault();
        dbService.collection("Tables").add({
            UniqueStoreId: selectedStoreID,
            TotalPrice: 0,
            OrderArray: orderArray,
            TableNo: tableNumber
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

    const onChange = (event) => {
        const { target: { value } } = event;
        setTableNumber(value);
    }

    return (
        <div className="table">
            <div className="table__container">
                {tableArray.map((obj) => (
                    <div className="table__obj">
                        <Link to={{
                            pathname: "/AddOrder",
                            state: {
                                selectedStoreID,
                                tableObj: obj
                            }
                        }
                        }>
                            <button className="table__objBtn">테이블 번호 = {obj.TableNo}</button>
                        </Link>
                        <div className="table__delBtn__container">
                            <button className="table__delBtn" onClick={DeleteTable} value={obj.id}> 삭제 </button>
                            {
                                obj.TotalPrice > 0 ?
                                    <div className="O">
                                        O
                            </div> :
                                    <div className="X">
                                        X
                            </div>
                            }
                        </div>
                    </div>
                ))}
            </div>
            <div className="table__addBtn">
                <form>
                    <input type="number" placeholder="테이블 번호" onChange={onChange} min='1' />
                    <button onClick={AddTable}>테이블 추가</button>
                </form>
            </div>
        </div>
    )
}

export default EditTable;