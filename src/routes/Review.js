import React from "react";

class Review extends React.Component { 
    // props: storeObj, isOwner


    componentDidMount() {
        const { location, history } = this.props;
        //console.log(location.state.storeObj);
        //if(storeObj === undefined) {
            //isOwner.push("/");            
       // }
    }

    render() {
        const { location, history } = this.props;
        // console.log(this.props);
        // console.log(location.state);
        console.log(location.state.storeObj);
        
        return (
        <div> 
            <ul>
                <li> 
                    가게 이름: {location.state.storeObj.storeName} 
                </li>
                    가게 소개 : {location.state.storeObj.storeIntro}
                <li>
                    사용자 고유 id : {location.state.storeObj.id}
                </li>
            </ul>
           
        </div>
        );
    }
}

export default Review;