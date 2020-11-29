import React, { useEffect, useState } from "react";
import { authService, dbService } from "fbase"
import Reviews from "components/Reviews"

const ReviewPage = ({ storeObj }) => {
    const [myComment, setMyComment] = useState("");
    const [attachment, setAttachment] = useState();
    const [reviewList, setReviewList] = useState([]);
    const myEmail = authService.currentUser.email;
    const date = new Date().toLocaleString();

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("review").add({
            UserEmail: myEmail,
            UserComment: myComment,
            ThisStoreId: storeObj.location.state.storeObj.id,
            ReviewTime: date
        });
        setMyComment("");
    };

    useEffect(() => { //컴포넌트가 마운트 되면 매장 정보를 가져 오겠다
        dbService.collection("review").where("ThisStoreId", "==", storeObj.location.state.storeObj.id).onSnapshot(snapshot => {
            const reviewArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setReviewList(reviewArray);
        });
    }, []);

    const onChange = (event) => {
        const { target: { value } } = event;
        setMyComment(value);
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
        <div className="review">
            <div className="review__container">
                
                <form className="review__form" onSubmit={onSubmit}>
                    <div>첨부할 사진을 선택하세요.</div>
                    <input type="file" accept="image/*" onChange={onFileChange} />
                    {attachment && (
                        <div>
                            <img className="review__img" src={attachment} />
                            <button onClick={onClearAttachment}>취소</button>
                        </div>)
                    }
                    <input value={myComment} onChange={onChange} type="text" placeholder="리뷰를 남겨보세요." maxLength={50} />
                    <input type="submit" value="리뷰 남기기" />
                </form>
                {reviewList.map((obj) => (
                    <Reviews key={obj.id} reviews={obj} isStore={obj.ThisStoreId === storeObj.location.state.storeObj.id} />
                ))}
            </div>
        </div>
    );
}

export default ReviewPage