import React from "react";
import { Link } from "react-router-dom";
import { dbService, storageService } from "fbase";
import { useHistory } from "react-router-dom";

const Pos = (storeObj) => {
    //const location = storeObj.location;
    const history = useHistory();
    if (!localStorage.getItem("userInfo")) {
        localStorage.setItem(
            "userInfo",
            JSON.stringify({
                location: storeObj.location,
            })
        );
    }

    if (localStorage.getItem("userInfo")) {
        storeObj = JSON.parse(localStorage.getItem("userInfo"));
    }//새로고침시 로컬호스트에 저장된 정보가 있다면 받아온다.


    const onDeleteClick = async () => { // DB에서 문서 삭제하는 function
        const ok = window.confirm("매장을 삭제하시겠습니까?");
        if (ok) {
            await dbService.doc(`storeinfo/${storeObj.location.state.storeObj.id}`).delete();
            if(storeObj.location.state.storeObj.attachmentUrl!==""){
            await storageService.refFromURL(storeObj.location.state.storeObj.attachmentUrl).delete();}
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
                        storageService.refFromURL(doc.data().attachmentUrl).delete();
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
        history.push("/");
    }

    const onDeleteTodaySales = async () => { // 매출 정산
        const ok = window.confirm("금일 매출을 초기화 하시겠습니까?");
        if (ok) {
            dbService.collection("storeinfo").doc(storeObj.location.state.storeObj.id).set({
                TodaySales: 0
                }, {merge : true })
        }
        history.push("/");
        window.confirm("초기화 되었습니다.");
    }

    return (
        <div>
            <ul className="Pos">
                <li className="Pos__Name">
                    매장 이름: {storeObj.location.state.storeObj.storeName}
                </li>
                <li className="Pos__TableCnt">
                    테이블 수  : {storeObj.location.state.storeObj.tableN}
                </li>
                <li className="Pos__Sales">
                    금일 매출 : {storeObj.location.state.storeObj.TodaySales}원
                </li>
            </ul>
            <div className="Pos__Btn">
                <Link to={
                    {
                        pathname: "/EditTable",
                        state: {
                            storeObj: storeObj.location.state.storeObj.id
                        }
                    }
                }>
                    <button className="tableManage">테이블 관리</button>
                </Link>
                <button className="storeDelete" onClick={onDeleteClick}>매장 삭제</button>
                <button className="settleMoney" onClick={onDeleteTodaySales} >매출 정산</button>
                <Link to={
                    {
                        pathname: "/Menu",
                        state: {
                            storeObj: storeObj.location.state.storeObj.id
                        }
                    }
                }>
                    <button>가게 메뉴</button>
                </Link>
            </div>
        </div>
    );
}

export default Pos;