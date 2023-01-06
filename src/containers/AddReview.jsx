import React from "react";
import R from "../styles/AddReview.module.css";
import { useState } from "react";

export default function AddReview() {
  //   const [rating, setRating] = useState(null);
  const [input, setInput] = useState({
    title: "",
    message: "",
    rating: null,
  });
  const [hover, setHover] = useState(null);
  return (
    <div className={R.container}>
      <div className={R.formContainer}>
        <h1>Leave a review</h1>
        <form action="">
          <input type="text" placeholder="Title" />
          <textarea name="" id="" cols="30" rows="10" placeholder="Message" />
          <div className={R.ratingCont}>
            <span>Rating: </span>

            {[...Array(5)].map((star, i) => {
              const ratingValue = i + 1;
              return (
                <label
                  onClick={() => setInput({ ...input, rating: ratingValue })}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                  className={
                    ratingValue <= (hover || input.rating)
                      ? R.fullStar
                      : R.emptyStar
                  }
                >
                  <input type="radio" name="rating" value={ratingValue} />★
                </label>
              );
            })}
            <button type="submit">Post review</button>
          </div>
        </form>
      </div>

      <div className={R.imgCont}>
        <img
          src="https://res.cloudinary.com/dbtekd33p/image/upload/v1672169560/cqws5x8n/shutterstock_1487069789-scaled_dvred6.jpg"
          alt=""
        />
      </div>
    </div>
  );
}
