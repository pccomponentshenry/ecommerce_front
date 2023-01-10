import React from "react";
import s from "../styles/Banned.module.css"
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";

const Banned = () => {
  const { logout } = useAuth0();
  const dispatch = useDispatch();

  return (
    <>


      {/* <div className={S.backgroundBanned}>
        {/* <div className={S.imageBackground}>
          <div className={S.homeBtn}> */}
        {/* <Link to="/" style={{ textDecoration: "none" }}>
              
            </Link> 
         <LogoutButton /> 
        <img
          src="https://res.cloudinary.com/dbtekd33p/image/upload/v1673282560/cqws5x8n/banned_xtzrxq.jpg"
          alt=""
        />
      </div> */}

       <div className={s.all} >
       <div className= {s.containerBorder} >
      <div className= {s.container} >
            <div className={s.border}> 

            </div>
            <div className={s.content}> 
              <h1> Warning </h1>
              <p>Your user has been banned </p>
              <p> Please contact us at pcconmponentshenry@gmail.com</p>
        <button
          onClick={() => {
            dispatch(logoutUser());
            logout({ returnTo: window.location.origin });
          }}
        >
          Logout
        </button>
            </div>
      
      </div>
      </div>
      </div>
    </>
  );
};

export default Banned;
