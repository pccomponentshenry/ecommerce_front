import React from "react";
import F from "../styles/Form.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrands, getCategories, postProduct } from "../redux/actions/index";
import { Link } from "react-router-dom";

export default function Form() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const brands = useSelector(state => state.brands);
  const cat = useSelector(state => state.categories);
  const [image, setImage] = useState([]);
  const [url, setUrl] = useState("");
  const [active, setActive] = useState(false);
  const [event, setEvent] = useState({});
  const [disable, setDisable] = useState(true);
  const [error, setError] = useState({});
  const [input, setInput] = useState({
    title: "",
    brand: "",
    stock: 0,
    price: null,
    description: "",
    img: [],
    category: "",
    userId: "",
  });

  const initialState = {
    title: "",
    brand: "",
    stock: "",
    price: "",
    description: "",
    img: [],
    category: "",
    userId: "",
  };

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    setInput(prev => ({ ...prev, userId: user.id }));
  }, [user]);

  function clearForm() {
    setInput({ ...initialState });
  }

  const handleValidate = input => {
    const errors = {};
    if (!input.title) {
      errors.title = "*Name is required";
    }
    if (!input.brand) {
      errors.brand = "*Brand is required";
    }
    if (!input.stock) {
      errors.stock = "*Stock is required";
    } else if (Number(input.stock) <= 0) {
      errors.stock = "*Stock must be a positive number";
    } else if (Number(input.stock) !== parseInt(input.stock, 10)) {
      errors.stock = "*Stock must be an integer number";
    }

    if (!input.price) {
      errors.price = "*Price is required";
    } else if (Math.floor(input.price) < 0) {
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
    if (!input.img) {
      errors.img = "*You must upload at least one image ";
    }

    if (
      !error.title &&
      !error.brand &&
      !error.price &&
      !error.stock &&
      !error.description &&
      !error.img &&
      !error.category &&
      !error.brand &&
      input.description.length > 0 &&
      input.img.length > 0
    ) {
      setDisable(false);
    } else {
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
  };

  const handleChange = e => {
    setInput(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const loadImage = e => {
    if (image.name) {
      handleChangeImg(e);
      errorImgSetting(e);
    }
  };

  useEffect(() => {
    loadImage(event);
  }, [image]);

  useEffect(() => {
    handleValidate(input);
  }, [input]);

  const handleSubmit = e => {
    if (
      !error.title &&
      !error.brand &&
      !error.price &&
      !error.stock &&
      !error.description &&
      !error.img &&
      !error.category &&
      !error.brand &&
      input.description.length > 0
    ) {
      e.preventDefault();
      setActive(true);
      dispatch(postProduct(input));
      setDisable(true);
      clearForm();
      setError({});
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
                Load another product
              </button>
            </div>
          </div>
          <div className={F.darkBg}></div>
        </>
      )}
      <div className={F.form}>
        <form onSubmit={e => handleSubmit(e)} autoComplete="off">
          <div className={F.titleCont}>
            <h3>New product</h3>
            <h6>Upload an image</h6>
          </div>

          <div className={F.container}>
            {/* <h6>Upload an image</h6> */}
            <input
              type="file"
              name="uploadfile"
              multiple="multiple"
              id="img"
              style={{ display: "none" }}
              onChange={e => {
                setImage(e.target.files[0]);
                setEvent(e);
              }}
            />

            {!input.img.length ? (
              <label className={F.inputCont} htmlFor="img">
                +
              </label>
            ) : (
              <div className={F.imgCont}>
                <img src={input.img} alt="" />
              </div>
            )}
            {error.img && <span className={F.imgError}>{error.img}</span>}
          </div>

          <div className={F.formContainer}>
            <div>
              <div className={F.name}>
                <label>Name of the product: </label>
                <input
                  value={input.title || ""}
                  type="text"
                  name="title"
                  placeholder=""
                  onBlur={e => errorSetting(e)}
                  onChange={e => {
                    handleChange(e);
                    errorSetting(e);
                  }}
                />
                <div>{error.title && <span>{error.title}</span>}</div>
              </div>
            </div>
            <div className={F.brandAndCatContainer}>
              <div className={F.brand}>
                <select
                  name="brand"
                  value={input.brand}
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

              <div className={F.category}>
                <select
                  name="category"
                  id="Category"
                  value={input.category}
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
            </div>
            <div className={F.descriptionCont}>
              <div className={F.description}>
                <label>Description: </label>
                <textarea
                  name="description"
                  value={input.description}
                  id="description"
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
                {error.brand && <span>{error.description}</span>}
              </div>
            </div>
            <div className={F.stockAndPrice}>
              <div className={F.stock}>
                <label>Stock: </label>
                <input
                  value={input.stock || ""}
                  type="number"
                  name="stock"
                  min="0"
                  onBlur={e => errorSetting(e)}
                  onChange={e => {
                    handleChange(e);
                    errorSetting(e);
                  }}
                />
                <div>{error.stock && <span>{error.stock}</span>}</div>
              </div>

              <div className={F.price}>
                <label>Price: </label>
                <input
                  value={input.price || ""}
                  type="float"
                  name="price"
                  min="0"
                  onBlur={e => {
                    errorSetting(e);
                    handleValidate(input);
                  }}
                  onChange={e => {
                    handleChange(e);
                    errorSetting(e);
                  }}
                />
                <div className={F.errorPrice}>
                  {error.price && <span>{error.price}</span>}
                </div>
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
                Publish product
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
