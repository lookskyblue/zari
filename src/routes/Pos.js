import React from "react";
import {Link} from "react-router-dom";

class Pos extends React.Component { 
    // props: storeObj, isOwner


    componentDidMount() {
        const { location, history } = this.props;
        //console.log(location.state.storeObj);
        //if(storeObj === undefined) {
            //isOwner.push("/");            
       // }
       if(location.state === undefined){ 
        history.push('/');
        }
    }

    /*
    componentWillUnmount(){
        const contacData = localStorage.contacData;

        if(contacData){
            this.setState({
                contacData: JSON.parse(contacData)
            })
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(JSON.stringify(prevState.contacData)!=JSON.stringify(this.state.contacData)){
            localStorage.contacData =JSON.stringify(this.state.contacData);
        }
    }*/

    render() {
        
        const { location, history } = this.props;  
        // console.log(this.props);
        // console.log(location.state);
         //console.log(location.state.storeObj);
         if(location.state === undefined){ 
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
                <Link to="/PosEdit">
                    <button>가게 정보 수정</button>
                    </Link>
            </ul>
           
        </div>
        );
    }
}

export default Pos;