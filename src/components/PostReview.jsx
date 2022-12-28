import React from "react";
import F from "../styles/Form.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postReviews } from "../redux/actions/index";
import { Link } from "react-router-dom";

export default function PostReview() {
  const initialState = {
    title: "",
    message: "",
    score: "",
    id: "",
  };
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const [disable, setDisable] = useState(true);
  const [error, setError] = useState({});
  const [input, setInput] = useState({
    title: "",
    message: "",
    score: "",
    id: "2", //hardcodeado el id del producto.. deberia de venir por props
  });

  function clearForm() {
    setInput({ ...initialState });
  }
  const handleValidate = input => {
    const errors = {};
    if (!input.title) {
      errors.title = "*title is required";
    }
    if (!input.message) {
      errors.message = "*message is required";
    }
    if (!input.score) {
      errors.score = "*score is required";
    } else if (Number(input.score) < 0) {
      errors.score = "*score must be a positive number";
    } else if (Number(input.score) !== parseInt(input.score, 10)) {
      errors.score = "*score must be an integer number";
    }
    if (
      !error.title &&
      !error.message &&
      !error.score
    ) {
      setDisable(false);
    } else {
      console.log(error);
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

  const errorImgSetting = e => {
    setError(
      handleValidate({
        ...input,
        img: e.target.files,
      })
    );
  };

  const handleChange = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const loadImage = e => {
    if (image.name) {
      handleChangeImg(e);
      errorImgSetting(e);
    }
  };

  const handleSubmit = e => {
    console.log("entré");
    if (
      !error.title &&
      !error.message &&
      !error.score 
    ) {
      e.preventDefault();
      setActive(true);
      console.log(input);
      dispatch(postReviews(input));
      setDisable(true);
      clearForm();
      setError({});
    } else {
      console.log(error);
    }
  };

  return (
    <>
      {active && (
        <>
          <div className={F.successPic}>
            <span onClick={() => setActive(false)}>╳</span>
            <img
              src="https://res.cloudinary.com/dbtekd33p/image/upload/v1670821085/cqws5x8n/success_lzoshi.png"
              alt=""
            />
            <div className={F.btnCont}>
              <Link to="/">
                <button className={F.btn}>Back to Home</button>
              </Link>
              <button
                className={F.btn}
                onClick={() => {
                  clearForm();
                  setActive(false);
                }}
              >
                Load another review
              </button>
            </div>
          </div>
          <div className={F.darkBg}></div>
        </>
      )}

      <form onSubmit={e => handleSubmit(e)} autoComplete="off">
        <div className={F.titleCont}>
          <h5>New Review</h5>
        </div>

        <div className={F.formContainer}>
          <div>
            <div className={F.name}>
              <label>Title: </label>
              <input
                value={input.title || ""}
                type="text"
                name="title"
                placeholder=""
                onBlur={e => errorSetting(e)}
                onChange={e => handleChange(e)}
              />
              <div>{error.title && <span>{error.title}</span>}</div>
            </div>
          </div>
          <div className={F.descriptionCont}>
            <div className={F.description}>
              <label>Message: </label>
              <textarea
                name="message"
                value={input.message}
                id="message"
                cols="30"
                rows="10"
                onBlur={e => {
                  errorSetting(e);
                }}
                onChange={e => {
                  handleChange(e);
                  errorSetting(e);
                }}
              ></textarea>
            </div>
            {/* {error.brand && <span>{error.description}</span>} */}
          </div>
          <div className={F.stockAndPrice}>
            <div className={F.stock}>
              <label>Score: </label>
              <input
                value={input.score || ""}
                type="number"
                name="score"
                min="0"
                onBlur={e => errorSetting(e)}
                onChange={e => handleChange(e)}
              />
              <div>{error.score && <span>{error.score}</span>}</div>
            </div>
          </div>
          <div className={F.formBtn}>
            <button
              type="submit"
              className={disable === false ? F.activeBtn : F.disabledBtn}
              onClick={e => {
                disable && e.preventDefault();
              }}
            >
              Create your Review
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
