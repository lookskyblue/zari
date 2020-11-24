import React, { useEffect, useState } from "react";
import { authService, dbService } from "fbase"

const ReviewPage = ({storeName, ownerId }) => { 

        const [myComment, setMyComment] = useState("");
        const myEmail = authService.currentUser.email;

        const onSubmit = async (event) => {
            event.preventDefault();
            await dbService.collection("review").add({
                UserEmail: myEmail,
                UserComment: myComment,
                ThisStoreName: storeName,
                ThisStoreOwnerId: ownerId
            });
            setMyComment("");
        };
        
        const onChange = (event) => {
            const { target:{value}} = event;
            setMyComment(value);
        }

        return(
            <div>
                <h1>
                    리뷰 화면
                </h1>

                <div> 
                    <form onSubmit={onSubmit}>
                        <input value={myComment} onChange={onChange} type="text" placeholder="리뷰를 남겨보세요." maxLength={50} />
                        <input type="submit" value="댓글 달기" /> 
                    </form>
                </div>

            </div>
        );
    
}

export default ReviewPage
