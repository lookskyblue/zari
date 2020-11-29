import { Link } from "react-router-dom";
import React, { useState } from "react";
import { uObj } from "./App";
import { dbService } from "fbase"

const Reviews = ({ reviews, isStore }) => {
    const onDeleteClick = async () => { // DB에서 문서 삭제하는 function
        const ok = window.confirm("해당 리뷰를 삭제하시겠습니까?");
        if (ok) {
            await dbService.doc(`review/${reviews.id}`).delete();
        }
    }

    return (
        <div className="review__obj">
            {isStore && (
                <div>
                    <div className="review__info">
                        <div className="review__writer">
                            {reviews.UserEmail}
                        </div>
                        <div className="review__time">
                            {reviews.ReviewTime}
                        </div>
                    </div>
                    <div className="review__comment">
                        {reviews.UserComment}
                    </div>
                </div>
            )}
            {isStore && uObj.email === reviews.UserEmail && (
                <button onClick={onDeleteClick}>삭제</button>
            )}
        </div>
    );
}

export default Reviews;