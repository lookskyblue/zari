import React, {useState} from "react";
import { authService, dbService } from "fbase"

const MenuAdd = ({storeObj}) => {
    const [MenuImage, setMenuImage] = useState("");
    const [MenuName, setMenuName] = useState("");
    const [MenuPrice, setMenuPrice] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("menu").add({
            Image: MenuImage,
            Name: MenuName,
            Price: MenuPrice,
            StoreID: storeObj
        });
        setMenuImage("");
        setMenuName("");
        setMenuPrice("");
    };

    const onChange1 = (event) => {
        const { target:{value}} = event;
        setMenuImage(value);
    }

    const onChange2 = (event) => {
        const { target:{value}} = event;
        setMenuName(value);
    }

    const onChange3 = (event) => {
        const { target:{value}} = event;
        setMenuPrice(value);
    }


    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={MenuImage} onChange={onChange1} type="text" placeholder="메뉴 이미지" maxLength={50} required />
                <input value={MenuName} onChange={onChange2} type="text" placeholder="메뉴 이름" maxLength={50} required/>
                <input value={MenuPrice} onChange={onChange3} type="text" placeholder="메뉴 가격" maxLength={50} required/>
                <input type="submit" value="메뉴 추가" />
            </form>
        </div>
    )
}

export default MenuAdd;