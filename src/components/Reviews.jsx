import React from "react";
import R from "../styles/Reviews.module.css";
import ReviewCard from "../components/ReviewCard";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getReviews } from "../redux/actions";
// import { useAuth0 } from "@auth0/auth0-react";

export default function Reviews({ id }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReviews());
  }, [dispatch]);

  const reviewsFromReducer = useSelector(state => state.reviews);
  const reviewsFiltered = reviewsFromReducer.filter(
    el => el.productId === parseInt(id)
  );
  // const { user} = useAuth0();
  return (
    <>
      {reviewsFiltered.length > 0 ? (
        <div className={R.reviews}>
          <div className={R.container}>
            {reviewsFiltered.map(el => (
              <ReviewCard
                key={el.id}
                name={el.title}
                review={el.message}
                score={el.score}
                profilePic={el.picprofile}
                user={el.username}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className={R.noReviews}>
          <h6>This product doesn't have any reviews yet!</h6>
        </div>
      )}
    </>
  );
}
