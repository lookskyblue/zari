import { Link } from "react-router-dom";
import React, { Component } from "react";


const MenuLoad = ({ menus, isStore }) => {
    return (
        <div>
            {isStore && (
                <div>
                    <h3>
                        메뉴 이미지: {menus.Image}
                    </h3>
                    <h3>
                        메뉴 이름: {menus.Name}
                    </h3>
                    <h3>
                        메뉴 가격: {menus.Price}
                    </h3>
                </div>
            )}
        </div>
    );

}

export default MenuLoad;