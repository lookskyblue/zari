import React, { useEffect, useState } from "react";
import { authService, dbService } from "fbase"
import Reviews from "components/Reviews"


const ReviewPage = ({storeObj}) => {
    const [myComment, setMyComment] = useState("");
    const myEmail = authService.currentUser.email;

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("review").add({
            UserEmail: myEmail,
            UserComment: myComment,
            ThisStoreId: storeObj.location.state.storeObj.id
        });
        setMyComment("");
    };

    const [reviewList, setReviewList] = useState([]);

    
    useEffect(() => { //컴포넌트가 마운트 되면 매장 정보를 가져 오겠다 2ㄱ

        dbService.collection("review").onSnapshot(snapshot => {
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

    return (
        <div className="review">
            <div className="review__container">
                {reviewList.map((obj) => (
                    <Reviews key={obj.id} reviews={obj} isStore={obj.ThisStoreId === storeObj.location.state.storeObj.id} />
                ))}
                <form className="review__form" onSubmit={onSubmit}>
                    <input value={myComment} onChange={onChange} type="text" placeholder="리뷰를 남겨보세요." maxLength={50} />
                    <input type="submit" value="댓글 달기" />
                </form>
            </div>
        </div>
    );
}

export default ReviewPage