import React from "react";
import R from "../styles/Reviews.module.css";
import ReviewCard from "../components/ReviewCard";

export default function Reviews() {
  const reviews = [
    {
      profilePic: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVuLDgkPGHh_tQ6VHyxmEpIA81Q0qMwdCUvQ&usqp=CAU",
      ],
      name: "Usuario 1",
      review: "A really good product!",
    },
    {
      profilePic: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVuLDgkPGHh_tQ6VHyxmEpIA81Q0qMwdCUvQ&usqp=CAU",
      ],
      name: "Usuario 2",
      review: "Can't wait to try it out!",
    },
    {
      profilePic: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVuLDgkPGHh_tQ6VHyxmEpIA81Q0qMwdCUvQ&usqp=CAU",
      ],
      name: "Usuario 3",
      review: "A really good product!",
    },
    {
      profilePic: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVuLDgkPGHh_tQ6VHyxmEpIA81Q0qMwdCUvQ&usqp=CAU",
      ],
      name: "Usuario 4",
      review: "Can't wait to try it out!",
    },
    {
      profilePic: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVuLDgkPGHh_tQ6VHyxmEpIA81Q0qMwdCUvQ&usqp=CAU",
      ],
      name: "Usuario 5",
      review: "A really good product!",
    },
    {
      profilePic: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVuLDgkPGHh_tQ6VHyxmEpIA81Q0qMwdCUvQ&usqp=CAU",
      ],
      name: "Usuario 6",
      review: "Can't wait to try it out!",
    },
  ];
  return (
    <>
      <div className={R.reviews}>
        <h6>Reviews</h6>
        <div className={R.container}>
          {reviews.length > 0 &&
            reviews.map((el, i) => (
              <ReviewCard
                key={i}
                name={reviews[i].name}
                profilePic={reviews[i].profilePic}
                review={reviews[i].review}
              />
            ))}
        </div>
      </div>
    </>
  );
}
