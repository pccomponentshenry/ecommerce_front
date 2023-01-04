import React from "react";
import F from "../styles/Form.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrands, getCategories, putProduct } from "../redux/actions/index";
import { Link, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { getProductDetail } from "../redux/actions";

export default function Form() {
  const { user } = useAuth0();
  const creator = user.nickname;
  const params = useParams();
  const dispatch = useDispatch();
  const product = useSelector(state => state.product);
  
  useEffect(() => {
    dispatch(getProductDetail(params.id));
  }, [dispatch]);
//console.log(input)

  const initialState = {
    name: product.title,
    brand: product.brand,
    stock: product.stock,
    price: product.price,
    description: product.description,
    img: product.img,
    category: product.category,
    creator: creator,
  };
  //console.log(initialState)
  //console.log(user.email)
  
  /* useEffect(() => {
    dispatch(getProductDetail(params.id));
  }, [dispatch]); */
  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
  }, []);

  const brands = useSelector(state => state.brands);
  const cat = useSelector(state => state.categories);
  const [image, setImage] = useState([]);
  const [url, setUrl] = useState("");
  const [active, setActive] = useState(false);
  const [event, setEvent] = useState({});
  const [disable, setDisable] = useState(true);
  const [error, setError] = useState({});
  const [input, setInput] = useState({
    name: "",
    brand: "",
    stock: "",
    price: null,
    description: "",
    img: [],
    category: "",
    creator: creator,
  });
//console.log(input, "en el estado")
  function clearForm() {
    setInput({ ...initialState });
  }
  const handleValidate = input => {
    const errors = {};
   
     if (Number(input.stock) < 0) {
      errors.stock = "*Stock must be a positive number";
    } else if (input.stock && Number(input.stock) !== parseInt(input.stock, 10)) {
      errors.stock = "*Stock must be an integer number";
    }
    if (Number(input.price) < 0) {
      errors.price = "*Price must be a positive number";
    }
    if (
      !error.price &&
      !error.stock 
    ) {
      setDisable(false);
    } else {
      console.log(error);
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
    setInput({ ...initialState, [e.target.name]: e.target.value });
    console.log(input)
  };
  const loadImage = e => {
    if (image.name) {
      handleChangeImg(e);
      errorImgSetting(e);
    }
  };

  React.useEffect(() => {
    loadImage(event);
  }, [image]);

  const handleSubmit = e => {
    console.log("entré");
    if (
      !error.price &&
      !error.stock
    ) {
      e.preventDefault();
      setActive(true);
      console.log(input)
      dispatch(putProduct(product.id, input));
      setDisable(true);
      clearForm();
      setError({});
    } else {
      console.log(error);
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

      <form onSubmit={e => handleSubmit(e)} autoComplete="off">
        <div className={F.titleCont}>
          <h5>Update your product</h5>
          <h6>Add images of your product</h6>
        </div>

        <div 
        className={F.container}
        style={{backgroundImage: `url(${product.img})`}}>
          <h5>Upload an image</h5>
          <input
            type="file"
            name="uploadfile"
            multiple="multiple"
            placeholder={product.img}
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
          {error.img && <span>{error.img}</span>}
        </div>

        <div className={F.formContainer}>
          <div>
            <div className={F.name}>
              <label>Name of the product: </label>
              <input
                value={input.name || ""}
                type="text"
                name="name"
                placeholder={product.title}
                onBlur={e => errorSetting(e)}
                onChange={e => handleChange(e)}
              />
              <div>{error.name && <span>{error.name}</span>}</div>
            </div>
          </div>
          <div className={F.brandAndCatContainer}>
            <div>
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
                placeholder={product.description}
                onBlur={e => {
                  errorSetting(e);
                }}
                onChange={e => {
                  handleChange(e);
                  errorSetting(e);
                }}
              ></textarea>
            </div>
            {error.brand && <span>{error.description}</span>}
          </div>
          <div className={F.stockAndPrice}>
            <div className={F.stock}>
              <label>Stock: </label>
              <input
                value={input.stock || ""}
                type="number"
                name="stock"
                min="0"
                placeholder={product.stock}
                onBlur={e => errorSetting(e)}
                onChange={e => handleChange(e)}
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
                placeholder={product.price}
                onBlur={e => {
                  errorSetting(e);
                  handleValidate(input);
                }}
                onChange={e => handleChange(e)}
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
              Update product
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
