import { Link } from "react-router-dom";
import React, { Component } from "react";


const Reviews = ({ reviews, isStore }) => {

    return (
        <div className="review__obj">
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
                        {reviews.UserEmail}
                        <br></br>
                        {reviews.UserComment}
                    </h3>
                )}

            </Link>
        </div>
    );
}

export default Reviews;