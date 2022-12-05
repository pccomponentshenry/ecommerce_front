import React from "react";
import F from "../styles/Form.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrands, getCategories, postProduct } from "../redux/actions/index";

export default function Form() {
  const initialState = {
    name: "",
    brand: "",
    stock: null,
    price: null,
    description: "",
    img: [],
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
  }, []);

  const brands = useSelector(state => state.brands);
  const cat = useSelector(state => state.categories);
  const [image, setImage] = useState([]);
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
    category: "",
  });

  function clearForm() {
    setInput({ ...initialState });
  }
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
    if (!input.category || input.category === "Category") {
      errors.category = "*Choose a category";
    }
    if (!input.brand || input.brand === "Brand") {
      errors.brand = "*Choose a brand";
    }
    if (!input.description || input.description === "") {
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
      !error.category &&
      !error.brand &&
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
    data.append("file", image);

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
        setInput({ ...input, img: data.url }); //ACÁ ESTÁ LA RESPONSE PÚBLICA Y STOREADA EN CLOUDINARY!!!
      })
      .catch(err => console.log(err));
    console.log(input);
  };

  const handleChange = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
    console.log(input);
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(postProduct(input));
    clearForm();
    setError({});
  };

  return (
    <>
      <form onSubmit={e => handleSubmit(e)} autoComplete="off">
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
              setImage(e.target.files[0]);
            }}
          />
          <button
            className={F.loadBtn}
            onClick={e => {
              handleChangeImg(e);
              errorImgSetting(e);
            }}
          >
            Load image
          </button>
          {!input.img.length ? (
            <label className={F.inputCont} htmlFor="img">
              +
            </label>
          ) : (
            <div className={F.imgCont}>
              <img src={input.img} alt="" />
            </div>
          )}
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
              <select
                name="brand"
                defaultValue={"DEFAULT"}
                id="Brand"
                onBlur={e => {
                  handleChange(e);
                  errorSetting(e);
                }}
                onChange={e => {
                  handleChange(e);
                  errorSetting(e);
                }}
              >
                <option defaultValue={"DEFAULT"}>Brand</option>
                {brands.map((el, i) => (
                  <option key={i}>{el.name}</option>
                ))}
              </select>
              {error.brand && <span>{error.brand}</span>}
            </div>
          </div>

          <div className={F.stock}>
            <select
              name="category"
              defaultValue={"DEFAULT"}
              id="Category"
              onBlur={e => {
                handleChange(e);
                errorSetting(e);
              }}
              onChange={e => {
                handleChange(e);
                errorSetting(e);
              }}
            >
              <option defaultValue={"DEFAULT"}>Category</option>
              {cat.map((el, i) => (
                <option key={i}>{el.name}</option>
              ))}
            </select>
            <div className={F.errorStock}>
              {error.category && <span>{error.category}</span>}
            </div>
          </div>

          <div className={F.category}>
            <label>Stock: </label>
            <input
              type="number"
              name="stock"
              min="0"
              onBlur={e => errorSetting(e)}
              onChange={e => handleChange(e)}
            />
            <div>{error.stock && <span>{error.stock}</span>}</div>
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
                onBlur={e => {
                  errorSetting(e);
                  console.log(error);
                }}
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
