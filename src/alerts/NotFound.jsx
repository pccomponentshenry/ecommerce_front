import React from "react";
import S from "../styles/NotFound.module.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div className={S.background}>
        <div className={S.imageBackground}>
          <div className={S.homeBtn}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <span>Return home</span>
            </Link>
          </div>
          <img
            src="https://res.cloudinary.com/dbtekd33p/image/upload/v1670818135/cqws5x8n/404_mdvk0z.png"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default NotFound;
