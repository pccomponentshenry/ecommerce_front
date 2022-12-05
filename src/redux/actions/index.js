import axios from "axios";

import {
  //   SEARCH_PRODUCT,
  //   ORDER_BY_NAME,
  GET_PRODUCT,
  GET_BRANDS,
  ALL_PRODUCTS,
  GET_CATEGORIES,
  POST_PRODUCT,
  GET_FILTERED,
  SET_ERROR,
  CLEAR_STATE,
  FILTER_CATEGORIES,
  GET_PRODUCTS_BY_NAME

} from "../actions/actionNames";

const URL = "http://localhost:3001";

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

export const getFiltered = payload => {
  return { type: GET_FILTERED, payload };
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

export function getProductsByName(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`${URL}/products?name=${name}`);
      return dispatch({
        type: GET_PRODUCTS_BY_NAME,
        payload: json.data,
      });
    } catch (error) {
      console.log(error.message);
      return alert("Sorry, product not found, try again.");
    }
  };
}

export function filterProducts(category, brand) {
  let urlFilter = '?'
  if (category && brand) {
    urlFilter += `category=${category}&brand=${brand}`;
  }
  else if (!category && brand) {
    urlFilter += `brand=${brand}`;
  }
  else if (!brand && category) {
    urlFilter += `category=${category}`;
  }

  return async function (dispatch) {
    try {
      var json = await axios.get(`${URL}/products/filter/${urlFilter}`);
      return dispatch({ type: GET_FILTERED, payload: json.data });
    } catch (e) {
      return dispatch({ type: SET_ERROR, payload: e });
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