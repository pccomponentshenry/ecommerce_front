import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import L from "../styles/LoginContainer.module.css";
import { useDispatch } from "react-redux";
import { postUser } from "../redux/actions";
import { Link } from "react-router-dom";

export const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const dispatch = useDispatch();

  const dbUser = {
    username: user.nickname,
    email: user.email,
    image: user.picture,
  };

  useEffect(() => {
    dispatch(postUser(dbUser));
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    isAuthenticated && (
      <div className={L.container}>
        <Link to="/profile" style={{ textDecoration: "none", color: "#fff" }}>
          <h2>{user.name}</h2>{" "}
        </Link>
        <Link to="/profile" style={{ textDecoration: "none", color: "#fff" }}>
          <img src={user.picture} alt={user.name} />
        </Link>
      </div>
    )
  );
};
