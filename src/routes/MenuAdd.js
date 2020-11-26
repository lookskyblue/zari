import React, { useState } from "react";
import { authService, dbService, storageService } from "fbase"
import { v4 as uuidv4 } from "uuid";

const MenuAdd = ({ storeObj }) => {
    const [MenuName, setMenuName] = useState("");
    const [MenuPrice, setMenuPrice] = useState("");
    const [attachment, setAttachment] = useState();

    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = "";
        if (attachment != "") {
            const attachmentfileRef = storageService.ref().child(`${storeObj}/${uuidv4()}`);
            const response = await attachmentfileRef.putString(attachment, "data_url");
            attachmentUrl = await response.ref.getDownloadURL();
        }
        const menuObj = {
            attachmentUrl,
            Name: MenuName,
            Price: MenuPrice,
            StoreID: storeObj
        }

        await dbService.collection("menu").add(menuObj);
        setAttachment("");
        setMenuName("");
        setMenuPrice("");
    };

    const onChange2 = (event) => {
        const { target: { value } } = event;
        setMenuName(value);
    }

    const onChange3 = (event) => {
        const { target: { value } } = event;
        setMenuPrice(value);
    }

    const onFileChange = (event) => {
        const { target: { files } } = event;
        const theFile = files[0];
        if (theFile) {  // 파일 선택을 누르고 취소했을 때를 대비한 if문
            const reader = new FileReader();
            reader.onloadend = (finishedEvent) => {
                const { currentTarget: { result } } = finishedEvent;
                setAttachment(result);
            }
            reader.readAsDataURL(theFile);
        }
    }

    const onClearAttachment = () => setAttachment(null);

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="file" accept="image/*" onChange={onFileChange} required />
                {attachment && (
                    <div>
                        <img src={attachment} />
                        <button onClick={onClearAttachment}>취소</button>
                    </div>)
                }
                <input value={MenuName} onChange={onChange2} type="text" placeholder="메뉴 이름" maxLength={50} required />
                <input value={MenuPrice} onChange={onChange3} type="text" placeholder="메뉴 가격" maxLength={50} required />
                <input type="submit" value="메뉴 추가" />
            </form>
        </div>
    )
}

export default MenuAdd;