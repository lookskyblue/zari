import {Link} from "react-router-dom";
import React, { Component } from "react";


const Reviews = ({reviews,isStore})=> {
    console.log(reviews)
    return (
    <div>
        <Link 
            to={{
                pathname: "/",
                state: {
                    reviews,
                }
            }}
        >
                
            
                {isStore && (
                    <h3>
                    리뷰: {reviews.UserComment}
                    </h3>
                )}

            </Link>
    </div>
    );

}

export default Reviews;