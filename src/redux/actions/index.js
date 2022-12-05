import axios from "axios";

import {
  GET_PRODUCT,
  ALL_PRODUCTS,
  GET_CATEGORIES,
  POST_PRODUCT,
  SET_ERROR,
  GET_BRANDS,
  FILTER_CATEGORIES,
  FILTER_BRANDS,
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

export function getProductDetail(id) {
  return async dispatch => {
    const res = await axios.get(`${URL}/products/${id}`);
    return dispatch({ type: GET_PRODUCT, payload: res.data });
  };
}

export async function populateDB() {
  await axios.get(`${URL}/populateDB`);
}

export function filterCategories(filter) {
  return {
    type: FILTER_CATEGORIES,
    payload: filter,
  };
}

export function filterBrands(filter) {
  return {
    type: FILTER_BRANDS,
    payload: filter,
  };
}

export function getProductsByName(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/products?name=${name}`);
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

export const postProduct = payload => async dispatch => {
  try {
    const res = await axios.post(`${URL}/products`, payload);
    return dispatch({ type: POST_PRODUCT, payload: res.data });
  } catch (e) {
    return dispatch({ type: SET_ERROR, payload: e });
  }
};

// export function getProductsByName(name) {
//   return async function (dispatch) {
//     try {
//       var json = await axios.get(`http://localhost:3001/products?name=${name}`);
//       return dispatch({
//         type: GET_PRODUCTS_BY_NAME,
//         payload: json.data,
//       });
//     } catch (error) {
//       console.log(error.message);
//       return alert("Sorry, product not found, try again.");
// }
