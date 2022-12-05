import React from "react";
import F from "../styles/Form.module.css";
import { useState } from "react";

export default function Form() {
  // const initialState = {
  //   name: "",
  //   brand: "",
  //   stock: null,
  //   price: null,
  //   description: "",
  //   img: [],
  // };
  const [image, setImage] = useState({});
  const [url, setUrl] = useState("");
  const [disable, setDisable] = useState(true);
  const [error, setError] = useState({});
  const [input, setInput] = useState({
    name: "",
    brand: "",
    stock: 0,
    price: null,
    description: "",
    img: [],
  });

  const handleValidate = input => {
    const errors = {};
    if (!input.name) {
      errors.name = "*Name is required";
    }
    if (!input.brand) {
      errors.brand = "*Brand is required";
    }
    if (!input.stock) {
      errors.stock = "*Stock is required";
    } else if (Number(input.stock) < 0) {
      errors.stock = "*Stock must be a positive number";
    } else if (Number(input.stock) !== parseInt(input.stock, 10)) {
      errors.stock = "*Stock must be an integer number";
    }

    if (!input.price) {
      errors.price = "*Price is required";
    } else if (Number(input.price) < 0) {
      errors.price = "*Price must be a positive number";
    }

    if (!input.description) {
      errors.description = "*A description is required";
    }
    if (!input.img[0]) {
      errors.img = "*You must upload at least one image ";
    }
    if (
      !error.name &&
      !error.brand &&
      !error.price &&
      !error.stock &&
      !error.description &&
      !error.img &&
      input.description.length > 0
    ) {
      setDisable(false);
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

  const handleChangeImg = e => {
    e.preventDefault();
    const data = new FormData();
    let img = [];
    console.log(image);
    image.forEach(el => {
      data.append("file", el);

      data.append("upload_preset", "cqws5x8n"); // presets de cloudinary. Si querés entrar a ver la web, se accede desde el gmail del PF, con google.
      data.append("cloud_name", "dbtekd33p"); // presets de Cloudinary
      data.append("api_key", "226142111813437"); // idem
      fetch("  https://api.cloudinary.com/v1_1/cqws5x8n/image/upload", {
        //post a la ruta de cloud. cqws5x8n es el nombre de la nube de la cuenta nuestra
        method: "post",
        body: data,
      })
        .then(resp => resp.json())
        .then(data => {
          setUrl(data.url); //Revisar por qué no se agregan más de una. En algúna llamada de función Onchange en el html habré puesto (e.target.files[0] y por ahí es eso)
          setInput({ ...input, img: input.img.push(data.url) }); //ACÁ ESTÁ LA RESPONSE PÚBLICA Y STOREADA EN CLOUDINARY!!!
          //Todos los estados locales, entre ellos img. Hay delay para que aparezca, haciendo onchange en cualquier otro input se consologuea y aparece. Medio rebuscado,perdón!
          console.log(input);
        })
        .catch(err => console.log(err));
    });
  };
  const handleChange = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
    console.log(input); // console auxiliar para ver la imagen en el input, porque hay delay. Sacar si molesta.
  };

  const handleSubmit = () => {};
  return (
    <>
      <form onSubmit={() => handleSubmit()}>
        <div className={F.titleCont}>
          <h5>New product</h5>
        </div>

        <div className={F.container}>
          <h6>Add images of your product</h6>

          <input
            type="file"
            name="uploadfile"
            multiple="multiple"
            id="img"
            style={{ display: "none" }}
            onChange={e => {
              setImage({ ...e.target.files });

              // acá puede estar la razón por la que se carga una sola imagen. Pero no llego con el tiempo y capaz rompo algo. Es un useState que después utiliza handleChangeImg.
              errorImgSetting(e); //no tiene nada que ver con cloudinary. Es para validar que se cargue una imagen.
            }}
          />
          <button
            onClick={e => {
              handleChangeImg(e);
            }}
          >
            click
          </button>
          {/* //Carga la imagen en Cloudinary. No se carga si no es clickeando después de seleccionar la imagen. Estaría bueno mejorar la UI para que no quede tan raro. */}

          <label className={F.inputCont} htmlFor="img">
            +
          </label>
          {error.img && <span>{error.img}</span>}
        </div>

        <div className={F.formContainer}>
          <div>
            <div className={F.name}>
              <label>Name of the product: </label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                onBlur={e => errorSetting(e)}
                onChange={e => handleChange(e)}
              />
              {error.name && <span>{error.name}</span>}
            </div>
          </div>

          <div className={F.fullWidth}>
            <div className={F.brand}>
              <label>Brand: </label>
              <input
                type="text"
                name="brand"
                placeholder="Brand"
                onBlur={e => errorSetting(e)}
                onChange={e => handleChange(e)}
              />
              {error.brand && <span>{error.brand}</span>}
            </div>
          </div>

          <div className={F.stock}>
            <label>Stock: </label>
            <input
              type="number"
              name="stock"
              min="0"
              onBlur={e => errorSetting(e)}
              onChange={e => handleChange(e)}
            />
            <div className={F.errorStock}>
              {error.stock && <span>{error.stock}</span>}
            </div>
          </div>
          <div className={F.price}>
            <label>Price: </label>
            <input
              type="number"
              name="price"
              min="0"
              onBlur={e => errorSetting(e)}
              onChange={e => handleChange(e)}
            />
            <div className={F.errorPrice}>
              {error.price && <span>{error.price}</span>}
            </div>
          </div>

          <div className={F.descriptionCont}>
            <div className={F.description}>
              <label>Description: </label>
              <textarea
                name="description"
                id="description"
                cols="30"
                rows="10"
                // onBlur={e => errorSetting(e)}
                onChange={e => {
                  handleChange(e);
                  errorSetting(e);
                }}
              ></textarea>
            </div>
            {error.brand && <span>{error.description}</span>}
          </div>
          <div className={F.formBtn}>
            <div className={disable ? F.disabledBtn : F.activeBtn}>
              Publish product
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
