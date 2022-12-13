import React from "react";
import Form from "../components/Form";
import F from "../styles/formContainer.module.css";
export default function formContainer() {
  return (
    <div className={F.container}>
      <div className={F.formCont}>
        <Form />
      </div>
      <img
        className={F.formBackground}
        src="https://res.cloudinary.com/dbtekd33p/image/upload/v1670957759/cqws5x8n/background_ikm3zc.jpg"
        alt=""
      />
    </div>
  );
}
