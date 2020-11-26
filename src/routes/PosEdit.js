import { dbService } from "fbase";
import React from "react";
import { Link } from "react-router-dom";
import firebase from "firebase/app";

class PosEdit extends React.Component {
    // props: storeObj, isOwner
    state = {
        count: 0,
        location: ""
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
        this.setState({
            count: location.state.storeObj.tableN,
            location: location
        });
    }

    modify = n => {
        this.setState({
            count: n
        });

        dbService.collection("storeinfo").doc(this.state.location.state.storeObj.id).update({
            tableN: n
        });
    };

    render() {
        if (localStorage.getItem("userInfo")) {
            this.props = JSON.parse(localStorage.getItem("userInfo"));
        }//새로고침시 로컬호스트에 저장된 정보가 있다면 받아온다.
        const { location, history } = this.props;
        const { count } = this.state;
        return (
            <div>
                <ul>
                    <li>
                        테이블 관리
                </li>
                    테이블 수: {count}
                    <button onClick={() => this.modify(count + 1)}>증가</button>
                    <button onClick={() => this.modify(count - 1)}>감소</button>
                    <li>
                        <Link to={
                            {
                                pathname: "/Menu",
                                state: {
                                    storeObj: location.state.storeObj.id
                                }
                            }
                        }>
                            <button>가게 메뉴</button>
                        </Link>
                    </li>
                </ul>

            </div>
        );
    }
}

export default PosEdit;