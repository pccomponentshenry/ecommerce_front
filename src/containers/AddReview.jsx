import React from "react";
import R from "../styles/AddReview.module.css";
import { useState } from "react";
import { postReview } from "../redux/actions/";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";

export default function AddReview() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { user } = useAuth0();

  const [input, setInput] = useState({
    id: params.id,
    title: "",
    message: "",
    score: null,
    picprofile: user
      ? user.picture
      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVuLDgkPGHh_tQ6VHyxmEpIA81Q0qMwdCUvQ&usqp=CAU",
    username: user ? user.nickname : "Anónimo",
  });
  const [error, setError] = useState({});
  const [disable, setDisable] = useState(true);

  const handleValidate = input => {
    let errors = {};
    if (!input.title) {
      errors.title = "*Title is required";
    }
    if (!input.message) {
      errors.message = "*Message is required";
    }
    if (!input.score || input.score === 0) {
      errors.score = "*Rating is required";
    }
    if (!error.title && !error.message && !error.score) {
      setDisable(false);
    } else {
      setDisable(true);
    }
    return errors;
  };

  const errorSetting = e => {
    setError(
      handleValidate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };
  const handleChange = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const successAlert = () => {
    Swal.fire({
      title: "Review succesfully posted!",
      icon: "success",
      background: "#272727",
      color: "#fff",
    });
  };

  const handleSubmit = () => {
    dispatch(postReview(input));
    successAlert();
    navigate("/profile");
  };

  const [hover, setHover] = useState(null);
  return (
    <div className={R.container}>
      <div className={R.formContainer}>
        <h1>Leave a review</h1>
        <form action="" onSubmit={() => handleSubmit()}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            onBlur={e => errorSetting(e)}
            onChange={e => handleChange(e)}
          />
          {error.title && <span className={R.errorSpan}>{error.title}</span>}
          <textarea
            name="message"
            id=""
            cols="30"
            rows="10"
            onBlur={e => errorSetting(e)}
            placeholder="Message"
            onChange={e => handleChange(e)}
          />
          {error.message && (
            <span className={R.errorSpan}>{error.message}</span>
          )}
          <div className={R.ratingCont}>
            <span>Score: </span>

            {[...Array(5)].map((star, i) => {
              const ratingValue = i + 1;
              return (
                <label
                  onClick={e => {
                    setInput({ ...input, score: ratingValue });
                    errorSetting(e);
                  }}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                  className={
                    ratingValue <= (hover || input.score)
                      ? R.fullStar
                      : R.emptyStar
                  }
                >
                  <input type="radio" name="rating" value={ratingValue} />★
                </label>
              );
            })}
            <button type="submit" className={disable ? R.disabled : R.active}>
              Post review
            </button>
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
