import React from "react";
import {Link} from "react-router-dom";
import { authService, dbService } from "fbase";
import Reviews from "../components/Reviews"
import {test} from "./ShowStoreList";
import { xx } from "./StoreDetail"

 class PosEdit extends React.Component { 
    // props: storeObj, isOwner

    render() {
        console.log("ee")
        console.log(test);
        console.log(xx)

        return (
            
        <div>
            <ul>
                <li> 
                    
                    가게 수정
                </li>
                    <button>테이블 수 수정</button>
                <li>
                    <button>가게 메뉴</button>
                </li>
            </ul>
           
        </div>
        );
    }
}

export default PosEdit;