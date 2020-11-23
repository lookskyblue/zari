import React from "react";
import {Link} from "react-router-dom";


const Navigation = () => <nav>
    <ul>
        <li>
            <Link to="/Home">매장등록</Link>
        </li>

        <li>
            <Link to="/profile">My profile</Link>
        </li>

        <li>
            <Link to="/">매장 목록 보기</Link>
        </li>
    </ul>

</nav>

export default Navigation;