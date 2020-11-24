import React from "react";
import {Link} from "react-router-dom";


class PosEdit extends React.Component { 
    // props: storeObj, isOwner


    componentDidMount() {
       // const { location, history } = this.props;
        //console.log(location.state.storeObj);
        //if(storeObj === undefined) {
            //isOwner.push("/");            
       // }
    }

    render() {
        const { location, history } = this.props;
        
        
       // const { location, history } = this.props;
        // console.log(this.props);
        // console.log(location.state);
         //console.log(location.state.storeObj);
        //<ReviewPage storeName={storeName} ownerId={ownerId}/>
        return (
        <div> 
            <ul>
                <li> 
                    가게 수정
                </li>
                    <button>테이블 수 수정</button>
                <li>
                    <Link to={
                        {
                            pathname:"/Menu",
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