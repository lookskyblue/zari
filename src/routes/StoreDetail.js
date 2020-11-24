/* 
    사용자가 StoreName.js에서 매장의 이름을 클릭시 이 페이지로 넘어옴 
    매장의 세부 정보를 볼 수 있는 페이지
    StoreName.js에서 storObj, isOwner 받아옴.
*/
import React from "react";
import ReviewPage from "./ReviewPage";
import {Link} from "react-router-dom";

class StoreDetail extends React.Component { 
    state = {
        isLoading: false
    };

    SpreadReview = () => {
        this.setState(current => ({isLoading: !current.isLoading}))
    };
    
    render() {
        const { isLoading } = this.state;
        const { location }  = this.props;
        const ownerId       = location.state.storeObj.id;
        const storeName     = location.state.storeObj.storeName;
        const storeIntro    = location.state.storeObj.storeIntro;
        const storeTime    = location.state.storeObj.Time;
        const isOwner       = location.state.isOwner;
        console.log(location.state.storeObj);
        return ( // 가게 정보 필요한거 있으면 추가로 넣어줄 것
        <div> 
            <h1>매장의 정보를 보는 페이지. </h1>

            <ul>
                <li> 
                    매장 이름: {storeName} 
                </li>
                <li>
                    매장 소개 : {storeIntro}
                </li>
                <li>
                    매장 영업시간 : {storeTime}
                </li>
                <li>
                    네 매장이냐? : {isOwner ? "yes" : "no"}
                </li>
            </ul>
            
            <button onClick={this.SpreadReview} >리뷰보기</button>
            <div>
                {isLoading ? <ReviewPage storeName={storeName} ownerId={ownerId}/> : "" }
            </div>

        </div>
       
        );
    }
}

export default StoreDetail;