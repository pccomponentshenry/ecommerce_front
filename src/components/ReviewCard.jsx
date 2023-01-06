import React from "react";
import R from "../styles/ReviewCard.module.css";

export default function ReviewCard(props) {
  return (
    <div className={R.Container}>
      <div className={R.ProfilePicCont}>
        <img src={props.profilePic} className={R.profilePic} alt="" />
      </div>
      <div className={R.reviewCont}>
        <p className={R.name}>{props.user}</p>
        <span className={R.title}>{props.name}</span>
        <p className={R.review}>{props.review}</p>
      </div>
      <div className={R.rating}>
        <label className={R.ratingTitle}>Rating: </label>
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;
          return (
            <label
              className={props.score >= ratingValue ? R.fullStar : R.emptyStar}
            >
              ★
            </label>
          );
        })}
      </div>
    </div>
  );
}
