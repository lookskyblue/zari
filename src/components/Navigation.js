import React, {Component} from "react";
import {Link} from "react-router-dom";
import logo from "../imgs/logo.png";

const Navigation = () => 
<nav className="nav__container">
    <div className="nav__logo">
        <Link to="/">
        <img src={logo} title="ZARI" name="ZARI"/>
        </Link>
    </div>
    
    <ul className="nav__menu">
        <li>
            <Link to="/Home">매장등록</Link>
        </li>

        <li>
            <Link to="/Profile">My profile</Link>
        </li>

        <li>
            <Link to="/">매장 목록 보기</Link>
        </li>
    </ul>
</nav>

export default Navigation;