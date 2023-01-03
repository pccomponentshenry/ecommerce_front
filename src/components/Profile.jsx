import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {
  getUserCartItem,
  postCartItem,
  postUser,
  getUser,
  getAddresses,
} from "../redux/actions";
import L from "../styles/LoginContainer.module.css";

export const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const loggedUser = useSelector(state => state.user);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const shouldUpdate = useRef(true);

  const dbUser = {
    username: user.nickname,
    email: user.email,
    image: user.picture,
  };

  const postUserWithCartToDB = () => {
    dispatch(postUser(dbUser)).then(postCartToDB);
  };

  const postCartToDB = () => {
    if (cart.length && isAuthenticated) {
      for (let i = 0; i < cart.length; i++) {
        const post = {
          id: cart[i].id,
          quantity: cart[i].quantity,
          email: user.email,
          add: true,
        };
        dispatch(postCartItem(post));
      }
    }
    dispatch(getUserCartItem(user.email));
    localStorage.clear();
  };

  useEffect(() => {
    if (shouldUpdate.current) {
      shouldUpdate.current = false;
      postUserWithCartToDB();
    }
  }, [user]);

  useEffect(() => {
    dispatch(getUser(user.email));
    if (isAuthenticated) {
      dispatch(getUserCartItem(user.email));
    }
  }, [dispatch]);

  useEffect(() => {
    if (loggedUser.id) {
      dispatch(getAddresses(loggedUser.id));
    }
  }, [loggedUser]);

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
