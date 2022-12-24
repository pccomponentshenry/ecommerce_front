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
      rating: 3,
    },
    {
      profilePic: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVuLDgkPGHh_tQ6VHyxmEpIA81Q0qMwdCUvQ&usqp=CAU",
      ],
      name: "Usuario 2",
      review: "Can't wait to try it out!",
      rating: 5,
    },
    {
      profilePic: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVuLDgkPGHh_tQ6VHyxmEpIA81Q0qMwdCUvQ&usqp=CAU",
      ],
      name: "Usuario 3",
      review: "A really good product!",
      rating: 1,
    },
    {
      profilePic: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVuLDgkPGHh_tQ6VHyxmEpIA81Q0qMwdCUvQ&usqp=CAU",
      ],
      name: "Usuario 4",
      review: "Can't wait to try it out!",
      rating: 2,
    },
    {
      profilePic: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVuLDgkPGHh_tQ6VHyxmEpIA81Q0qMwdCUvQ&usqp=CAU",
      ],
      name: "Usuario 5",
      review: "A really good product!",
      rating: 3,
    },
    {
      profilePic: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVuLDgkPGHh_tQ6VHyxmEpIA81Q0qMwdCUvQ&usqp=CAU",
      ],
      name: "Usuario 6",
      review: "Can't wait to try it out!",
      rating: 4,
    },
  ];
  return (
    <>
      <div className={R.reviews}>
        <div className={R.container}>
          {reviews.length > 0 &&
            reviews.map((el, i) => (
              <ReviewCard
                key={i}
                name={reviews[i].name}
                profilePic={reviews[i].profilePic}
                review={reviews[i].review}
                rating={reviews[i].rating}
              />
            ))}
        </div>
      </div>
    </>
  );
}
