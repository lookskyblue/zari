import React from "react";
import {Link} from "react-router-dom";

const Pos = ({ test }) => { 
    // props: storeObj, isOwner
        
    
        const username = test;
        console.log(username);


        return (
        <div> 
            <ul>
                <li> 
                    가게 이름:   
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

export default Pos;