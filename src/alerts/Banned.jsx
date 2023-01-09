import React from "react";
import S from "../styles/NotFound.module.css";
import { Link } from "react-router-dom";
import { LogoutButton } from "../components/Logout";

const Banned = () => {
  return (
    <>
      <div className={S.backgroundBanned}>
        {/* <div className={S.imageBackground}>
          <div className={S.homeBtn}> */}
        {/* <Link to="/" style={{ textDecoration: "none" }}>
              <span>Usted Esta banneado porque nos cae mal, jajaa</span>
            </Link> */}
        {/* <LogoutButton /> */}
        <img
          src="https://res.cloudinary.com/dbtekd33p/image/upload/v1673282560/cqws5x8n/banned_xtzrxq.jpg"
          alt=""
        />
      </div>

      {/* </div>
      </div> */}
    </>
  );
};

export default Banned;
