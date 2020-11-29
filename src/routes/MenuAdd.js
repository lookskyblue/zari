import React, { useState, useEffect } from "react";
import { authService, dbService, storageService } from "fbase"
import { v4 as uuidv4 } from "uuid";

const MenuAdd = ({ storeObj }) => {
    const [MenuName, setMenuName] = useState("");
    const [MenuPrice, setMenuPrice] = useState("");
    const [attachment, setAttachment] = useState();
    const [menuArray, setMenuArray] = useState([]);
    const [tableArray, setTableArray] = useState([]);

    useEffect(() => {
        dbService.collection("menu").where
        ("StoreID", "==", storeObj).onSnapshot(snapshot => {
            const MenuArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setMenuArray(MenuArray);
        });

        dbService.collection("Tables")
        .where("UniqueStoreId", "==", storeObj).onSnapshot(snapshot => {
            const TablesArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setTableArray(TablesArray)
        })
    }, []);

    const onSubmit = async (event) => {

        for(var i = 0; i < menuArray.length; i++) {
            if(menuArray[i].Name==MenuName) {
                alert("이미 똑같은 이름의 메뉴가 있습니다.")
                return
            }
        }

        event.preventDefault();
        let attachmentUrl = "";
        if (attachment !== "") {
            const attachmentfileRef = storageService.ref().child(`${storeObj}/${uuidv4()}`);
            // 메뉴 추가에 사용한 이미지는 Storage에 store id 이름의 폴더에 랜덤 이름으로 저장됨.
            const response = await attachmentfileRef.putString(attachment, "data_url");
            attachmentUrl = await response.ref.getDownloadURL();
        }
        const menuObj = {
            attachmentUrl,
            Name: MenuName,
            Price: MenuPrice,
            StoreID: storeObj
        }

        const addMenuOnTable = {    //현재 개설된 테이블에 메뉴 정보 반영을 위한 변수
            menuName: MenuName,
            orderQuantity: 0,
            singlePrice: MenuPrice*1,
            totalPrice: 0
        }

        for(var i = 0; i < tableArray.length; i++) {    //테이블 돌면서 메뉴 추가 반영
            tableArray[i].OrderArray.push(addMenuOnTable)
            dbService.collection("Tables").doc(tableArray[i].id).set({
                OrderArray: tableArray[i].OrderArray
            }, {merge: true})
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
        <div className="menuAdd__container">
            <form className="menuAdd_form" onSubmit={onSubmit}>
                <div>메뉴 사진을 선택하세요.</div>
                <input type="file" accept="image/*" onChange={onFileChange} required />
                {attachment && (
                    <div>
                        <img className="menuAdd_img" src={attachment} />
                        <button onClick={onClearAttachment}>취소</button>
                    </div>)
                }
                <input value={MenuName} onChange={onChange2} type="text" placeholder="메뉴 이름" maxLength={50} required />
                <input value={MenuPrice} onChange={onChange3} type="number" placeholder="메뉴 가격" maxLength={50}  min='0' max='1000000' required />
                <input type="submit" value="메뉴 추가" />
            </form>
        </div>
    )
}

export default MenuAdd;