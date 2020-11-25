import React from "react";
import { Link } from "react-router-dom";

class Pos extends React.Component {
    // props: storeObj, isOwner


    componentDidMount() {
        const { location, history } = this.props;
        //로컬 스토리지에 저장해서 새로고침해도 상관없도록!
       if(location.state !== undefined){ 
        localStorage.setItem(
            "userInfo",
            JSON.stringify({
              location: this.props.location,
              history: this.props.history
            })
          );
          console.log(JSON.parse(localStorage.getItem("userInfo")));
        }
    }

    render() {

        if(localStorage.getItem("userInfo")){
            this.props= JSON.parse(localStorage.getItem("userInfo"));
            }//새로고침시 로컬호스트에 저장된 정보가 있다면 받아온다.
            const { location, history } = this.props;  

        return (
            <div>
                <ul>
                    <li>
                        가게 이름: {location.state.storeObj.storeName}
                    </li>
                    테이블 수  :
                <li>
                        정산할 돈 :
                </li>
                    <Link to={
                        {
                            pathname:"/PosEdit",
                            state: {
                                storeObj: location
                            }
                        }
                    }>
                        <button>가게 정보 수정</button>
                    </Link>
                </ul>

            </div>
        );
    }
}

export default Pos;