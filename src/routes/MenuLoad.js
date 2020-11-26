import { Link } from "react-router-dom";
import React, { Component } from "react";


const MenuLoad = ({ menus, isStore }) => {
    return (
        <div className="menu__container">
            {isStore && (
                <div className="menu__obj">
                    <div className="menu__img">
                        메뉴 이미지: {menus.Image}
                    </div>
                    <div className="menu__info">
                        <h3>
                            메뉴 이름: {menus.Name}
                        </h3>
                        <h3>
                            메뉴 가격: {menus.Price} 원
                        </h3>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MenuLoad;