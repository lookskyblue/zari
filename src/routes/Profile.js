import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { uObj } from "../components/App";
import MyStoreList from "./MyStoreList";

export default () => {
    const history = useHistory();
    const onLogoutClick = () => {
        const ok = window.confirm("로그아웃 하시겠습니까?");
        if (ok) {
            authService.signOut();
            history.push("/");
        }
    }

    const [myStoreList, setMyStoreList] = useState([]);

    useEffect(() => { //컴포넌트가 마운트 되면 매장 정보를 가져 오겠다
        dbService.collection("storeinfo").where("UID", "==", uObj.uid).onSnapshot(snapshot => {
            const reviewArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setMyStoreList(reviewArray);
        });
    }, []);

    return (
        <div className="pf">
            <div className="profile__container">
                <div className="profile">
                    <div className="profile__myStoreList">나의 매장 목록</div>
                    {myStoreList.map((obj) => (
                        <MyStoreList key={obj.id} storeObj={obj} />
                    ))}
                </div>
            </div>
            <button onClick={onLogoutClick}>Log Out</button>
        </div>
    );
};
