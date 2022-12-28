import React from "react";
import R from "../styles/Reviews.module.css";
import ReviewCard from "../components/ReviewCard";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getReviews } from "../redux/actions";

export default function Reviews({ id }) {
  // const reviews = [
  //   {
  //     profilePic: [
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVuLDgkPGHh_tQ6VHyxmEpIA81Q0qMwdCUvQ&usqp=CAU",
  //     ],
  //     name: "Usuario 1",
  //     review: "A really good product!",
  //     rating: 3,
  //   },
  //   {
  //     profilePic: [
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVuLDgkPGHh_tQ6VHyxmEpIA81Q0qMwdCUvQ&usqp=CAU",
  //     ],
  //     name: "Usuario 2",
  //     review: "Can't wait to try it out!",
  //     rating: 5,
  //   },
  //   {
  //     profilePic: [
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVuLDgkPGHh_tQ6VHyxmEpIA81Q0qMwdCUvQ&usqp=CAU",
  //     ],
  //     name: "Usuario 3",
  //     review: "A really good product!",
  //     rating: 1,
  //   },
  //   {
  //     profilePic: [
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVuLDgkPGHh_tQ6VHyxmEpIA81Q0qMwdCUvQ&usqp=CAU",
  //     ],
  //     name: "Usuario 4",
  //     review: "Can't wait to try it out!",
  //     rating: 2,
  //   },
  //   {
  //     profilePic: [
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVuLDgkPGHh_tQ6VHyxmEpIA81Q0qMwdCUvQ&usqp=CAU",
  //     ],
  //     name: "Usuario 5",
  //     review: "A really good product!",
  //     rating: 3,
  //   },
  //   {
  //     profilePic: [
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVuLDgkPGHh_tQ6VHyxmEpIA81Q0qMwdCUvQ&usqp=CAU",
  //     ],
  //     name: "Usuario 6",
  //     review: "Can't wait to try it out!",
  //     rating: 4,
  //   },
  // ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReviews());
  }, [dispatch]);

  const reviewsFromReducer = useSelector(state => state.reviews);
  const reviewsFiltered = reviewsFromReducer.filter(
    el => el.productId === parseInt(id)
  );
  console.log("estas son las filtradas", reviewsFiltered);
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
                profilePic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVuLDgkPGHh_tQ6VHyxmEpIA81Q0qMwdCUvQ&usqp=CAU"
              />
            ))}
          </div>
        </div>
      ) : (
        <div className={R.container}>
          <h6>Reviews no disponibles para este producto</h6>
        </div>
      )}
    </>
  );
}
