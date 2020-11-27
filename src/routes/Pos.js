import React from "react";
import { Link } from "react-router-dom";
import { dbService } from "fbase";

const Pos = (storeObj) => {
    const location = storeObj.location;

    if (location.state !== undefined) {
        localStorage.setItem(
            "userInfo",
            JSON.stringify({
                location: storeObj.location,
                history: storeObj.history
            })
        );
    }

    if (localStorage.getItem("userInfo")) {
        storeObj = JSON.parse(localStorage.getItem("userInfo"));
    }//새로고침시 로컬호스트에 저장된 정보가 있다면 받아온다.

    const onDeleteClick = async () => { // DB에서 문서 삭제하는 function
        const ok = window.confirm("매장을 삭제하시겠습니까?");
        if (ok) {
            //await dbService.doc(`storeinfo/${storeObj.location.state.storeObj.id}`).delete();
            await dbService.collection("review").where("ThisStoreId", "==", storeObj.location.state.storeObj.id)
                .get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        dbService.doc(`review/${doc.id}`).delete(); // 매장 id와 일치하는 리뷰들 모두 삭제
                    });
                })
                .catch(function (error) {
                });
            await dbService.collection("menu").where("StoreID", "==", storeObj.location.state.storeObj.id)
                .get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        dbService.doc(`menu/${doc.id}`).delete(); // 매장 id와 일치하는 메뉴들 모두 삭제
                    });
                })
                .catch(function (error) {
                });
            await dbService.collection("Tables").where("UniqueStoreId", "==", storeObj.location.state.storeObj.id)
                .get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        dbService.doc(`Tables/${doc.id}`).delete(); // 매장 id와 일치하는 테이블들 모두 삭제
                    });
                })
                .catch(function (error) {
                });
            // 매장 고유 번호와 일치하는 리뷰, 메뉴, 테이블, 등등 다 삭제 할 것
        }
    }

    return (
        <div>
            <ul>
                <li>
                    가게 이름: {location.state.storeObj.storeName}
                </li>
                <li>
                    테이블 수  :
                </li>
                <li>
                    정산할 돈 :
                </li>
                <Link to={
                    {
                        pathname: "/PosEdit",
                        state: {
                            storeObj: location
                        }
                    }
                }>
                    <button>테이블 관리</button>
                </Link>
                <button onClick={onDeleteClick}>매장 삭제</button>
            </ul>
        </div>
    );
}

export default Pos;