import React from "react";
import { Link } from "react-router-dom";

class Pos extends React.Component {
    // props: storeObj, isOwner


    componentDidMount() {
        const { location, history } = this.props;

        if (location.state === undefined) {
            history.push('/');
        }
    }

    render() {

        const { location, history } = this.props;
        

        if (location.state === undefined) {
            history.push('/');
        }
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
                                storeObj: location.state.storeObj
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