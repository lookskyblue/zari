/* 
    사용자가 StoreName.js에서 매장의 이름을 클릭시 이 페이지로 넘어옴 
    매장의 세부 정보를 볼 수 있는 페이지
    StoreName.js에서 storObj, isOwner 받아옴.
*/
import React, { useEffect, useState } from "react";
import { authService, dbService } from "fbase";
import ReviewPage from "./ReviewPage";
import { Link } from "react-router-dom";
import MenuLoad from "./MenuLoad";
import Menu from "./Menu";

const StoreDetail = (storeObj, isNear) => {

    /*
    const refesh = () => {
        const [location, setLocation] = storeObj.location;
        //로컬 스토리지에 저장해서 새로고침해도 상관없도록!
        if (location.state !== undefined) {
            localStorage.setItem(
                "userInfo",
                JSON.stringify({
                    location: location,
                    history: storeObj.history
                })
            );
        }
    }

    refesh();
    */

    const [loadLocalStorage, setLoadLocalStorage] = useState("");

    const setting = () => {
        setLoadLocalStorage(JSON.parse(localStorage.getItem("userInfo")));
        setOwnerId(loadLocalStorage.location.state.storeObj.id)
        setStoreName(loadLocalStorage.location.state.storeObj.storeName)
        setStoreIntro(loadLocalStorage.location.state.storeObj.storeIntro)
        setStoreTime(loadLocalStorage.location.state.storeObj.storeTime)
    }

    if (localStorage.getItem("userInfo")) {
        setting();
    }//새로고침시 로컬호스트에 저장된 정보가 있다면 받아온다.

    console.log("StoreDetail : " + storeObj.location.state.storeObj.id); // 내가 선택한 매장 id
    const [isLoading, setIsLoading] = useState(false);
    const [ownerId, setOwnerId] = useState(storeObj.location.state.storeObj.id);
    const [storeName, setStoreName] = useState(storeObj.location.state.storeObj.storeName);
    const [storeIntro, setStoreIntro] = useState(storeObj.location.state.storeObj.storeIntro);
    const [storeTime, setStoreTime] = useState(storeObj.location.state.storeObj.storeTime);

    const SpreadReview = () => {  // 토글
        setIsLoading(!isLoading);
    };

    const [menuList, setMenuList] = useState([]);

    useEffect(() => {
        dbService.collection("menu").onSnapshot(snapshot => {
            const menuArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setMenuList(menuArray);
        });
    }, []);

    return (
        <div>
            <ul className="storeDetail">
                <li className="storeDetail__Logo">
                    매장 로고 : 로고 이미지
                </li>
                <li className="storeDetail__Name">
                    {storeName}
                </li>
                <li className="storeDetail__Intro">
                    매장 소개 : {storeIntro}
                </li>
                <li className="storeDetail__Time">
                    매장 영업시간 : {storeTime}
                </li>
            </ul>
            <div className="storeDetail__menu">
                <p>Menu</p>
                {menuList.map((obj) => (    //obj 는 menu 컬렉션의 하나하나의 문서들
                    <MenuLoad key={obj.id} menus={obj} isStore={obj.StoreID === ownerId} />
                ))}
            </div>
            <div className="storeDetail__Btn">
                <button onClick={SpreadReview} >리뷰</button>
            </div>
            <div>
                {isLoading ? <ReviewPage storeName={storeName} ownerId={ownerId} /> : ""}
            </div>
        </div>
    )
}

/*
class StoreDetail extends React.Component {
    state = {
        isLoading: false
    };

    componentDidMount() {
        const { location, history } = this.props;
        //로컬 스토리지에 저장해서 새로고침해도 상관없도록!
        if (location.state !== undefined) {
            localStorage.setItem(
                "userInfo",
                JSON.stringify({
                    location: this.props.location,
                    history: this.props.history
                })
            );
        }
    }

    SpreadReview = () => {  // 토글
        this.setState(current => ({ isLoading: !current.isLoading }))
    };


    render() {


        if (localStorage.getItem("userInfo")) {
            this.props = JSON.parse(localStorage.getItem("userInfo"));
        }//새로고침시 로컬호스트에 저장된 정보가 있다면 받아온다.


        const { isLoading } = this.state;
        const { location } = this.props;
        const ownerId = location.state.storeObj.id;
        const storeName = location.state.storeObj.storeName;
        const storeIntro = location.state.storeObj.storeIntro;
        const storeTime = location.state.storeObj.Time;

        console.log("StoreDetail : "+this.props.location.state.storeObj.id);
        
        return ( // 가게 정보 필요한거 있으면 추가로 넣어줄 것
            <div>
                
                <ul className="storeDetail">
                    <li className="storeDetail__Logo">
                        매장 로고 : 로고 이미지
                </li>
                    <li className="storeDetail__Name">
                        {storeName}
                    </li>
                    <li className="storeDetail__Intro">
                        매장 소개 : {storeIntro}
                    </li>
                    <li className="storeDetail__Time">
                        매장 영업시간 : {storeTime}
                    </li>
                </ul>
                <div className="storeDetail__Btn">
                    <button onClick={this.SpreadReview} >리뷰</button>
                </div>
                <div>
                    {isLoading ? <ReviewPage storeName={storeName} ownerId={ownerId} /> : ""}
                </div>

            </div>

        );
    }
}
*/

export default StoreDetail;