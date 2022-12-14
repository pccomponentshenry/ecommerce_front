import axios from "axios";

import {
  GET_PRODUCT,
  GET_BRANDS,
  ALL_PRODUCTS,
  GET_CATEGORIES,
  POST_PRODUCT,
  SET_FILTERED,
  SET_ERROR,
  CLEAR_STATE,
  ADD_TO_CART,
  REMOVE_ONE_FROM_CART,
  REMOVE_ALL_FROM_CART,
  CLEAR_CART,
  CLEAR_ERROR,
} from "../actions/actionNames";

const URL = "http://localhost:3001";
// const URL = "https://pfbackend-production.up.railway.app";

export function allProducts() {
  return function (dispatch) {
    axios
      .get(`${URL}/products`)
      .then(resp => {
        dispatch({
          type: ALL_PRODUCTS,
          payload: resp.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function getBrands() {
  return async dispatch => {
    const res = await axios.get(`${URL}/brands`);
    return dispatch({ type: GET_BRANDS, payload: res.data });
  };
}

export function getCategories() {
  return async dispatch => {
    const res = await axios.get(`${URL}/categories`);
    return dispatch({ type: GET_CATEGORIES, payload: res.data });
  };
}
export function clearState() {
  return { type: CLEAR_STATE };
}

export const setFiltered = payload => {
  return { type: SET_FILTERED, payload };
};

export function getProductDetail(id) {
  return async dispatch => {
    const res = await axios.get(`${URL}/products/${id}`);
    return dispatch({ type: GET_PRODUCT, payload: res.data });
  };
}

export async function populateDB() {
  await axios.get(`${URL}/populateDB`);
}

export function filterProducts(category, brand, price, name) {
  let urlFilter = `?category=${category}&brand=${brand}&min_price=${price.min}&max_price=${price.max}&name=${name}`;

  return async function (dispatch) {
    try {
      const json = await axios.get(`${URL}/products/filter/${urlFilter}`);
      dispatch(setFiltered(json.data));
    } catch (e) {
      dispatch({ type: SET_ERROR, payload: e });
      dispatch(setFiltered([]));
    }
  };
}

export const postProduct = payload => async dispatch => {
  try {
    const res = await axios.post(`${URL}/products`, payload);
    return dispatch({ type: POST_PRODUCT, payload: res.data });
  } catch (e) {
    return dispatch({ type: SET_ERROR, payload: e });
  }
};

export const addToCartAction = payload => async dispatch => {
  const cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
  const id = payload.id;
  const price = payload.price;
  const duplicates = cart.filter(c => c.id === payload.id);
  localStorage.setItem(id, JSON.stringify(1));
  localStorage.setItem("price " + id, JSON.stringify(price));
  if (duplicates.length === 0) {
    cart.push(payload);
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: ADD_TO_CART,
      payload,
    });
  }
};

export const remove_one_from_cart = payload => {
  return {
    type: REMOVE_ONE_FROM_CART,
    payload,
  };
};

export const clear_cart = () => {
  return {
    type: CLEAR_CART,
  };
};

export const clearError = () => {
  return {
    type: CLEAR_ERROR,
  };
};
