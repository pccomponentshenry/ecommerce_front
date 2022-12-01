import React from "react";
import R from "../styles/ReviewCard.module.css";

export default function ReviewCard(props) {
  return (
    <div className={R.Container}>
      <div className={R.ProfilePicCont}>
        <img src={props.profilePic} className={R.profilePic} alt="" />
      </div>
      <div className={R.reviewCont}>
        <span className={R.name}>{props.name}</span>
        <p className={R.review}>{props.review}</p>
      </div>
    </div>
  );
}
