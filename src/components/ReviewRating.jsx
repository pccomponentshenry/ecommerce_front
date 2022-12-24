import React from "react";

import S from "../styles/reviewRating.module.css";

export default function ReviewRating({ rating }) {
  console.log(rating);
  return (
    <div className={S.ratingCont}>
      <h5>Rating: </h5>
      <div className={S.starsCont}>
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;
          return (
            <span key={i} value={ratingValue}>
              ★ ★
            </span>
            // <h6>holis</h6>
          );
        })}
      </div>
    </div>
  );
}
