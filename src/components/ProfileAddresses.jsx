import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector, useDispatch } from "react-redux";
import S from "../styles/Addresses.module.css";

export default function ProfileAddresses() {
  const { user } = useAuth0();
  const dispatch = useDispatch();

  return <div></div>;
}
