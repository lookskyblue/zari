import { Link } from "react-router-dom";
import React, { Component } from "react";
import { dbService, storageService } from "fbase";

const MenuLoad = ({ menus, isStore }) => {

    const onDeleteClick = async () => { // DB에서 문서 삭제하는 function
        const ok = window.confirm("메뉴를 삭제하시겠습니까?");
        if (ok) {
            await dbService.doc(`menu/${menus.id}`).delete();
            await storageService.refFromURL(menus.attachmentUrl).delete();
        }
    }

    return (
        <div className="menu__container">
            {isStore && (
                <div className="menu__obj">
                    <div className="menu__imgContainer">
                        {menus.attachmentUrl && <img className="menu__img" src={menus.attachmentUrl} />}
                    </div>
                    <div className="menu__info">
                        <h3>
                            메뉴 이름: {menus.Name}
                        </h3>
                        <h3>
                            메뉴 가격: {menus.Price} 원
                        </h3>
                    </div>
                    <button className="menu__delBtn" onClick={onDeleteClick}>메뉴 삭제</button>
                </div>
            )}
        </div>
    );
}

export default MenuLoad;